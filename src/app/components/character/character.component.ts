import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../interfaces/Character';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, RouterLink, InfiniteScrollModule, FormsModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  @Input() character: Character[] = [];
  allCharacter: Character[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  currentFilter: string = 'all';

  //Filtro por nome
  nameFilter: string = '';
  filteredCharacters: Character[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.apiService
      .getCharacters(this.currentPage)
      .subscribe((data: Character[]) => {
        this.allCharacter = [...this.allCharacter, ...data];
        this.applyFilter();
        this.loading = false;
      });
  }

  onScroll(): void {
    if (!this.loading) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  applyFilter(): void {
    switch (this.currentFilter) {
      case 'alive':
        this.character = this.allCharacter.filter((l) => l.status === 'Alive');
        break;
      case 'dead':
        this.character = this.allCharacter.filter((l) => l.status === 'Dead');
        break;
      case 'unknown':
        this.character = this.allCharacter.filter(
          (l) => l.status === 'unknown'
        );
        break;
      default:
        this.character = [...this.allCharacter];
        break;
    }
    // Posso apagar aqui, não vai interferir no filtros acima 31/05.
    this.filterCharacters();
  }

  filterAlive(): void {
    this.currentFilter = 'alive';
    this.applyFilter();
  }

  filterDead(): void {
    this.currentFilter = 'dead';
    this.applyFilter();
  }

  filterUnknown(): void {
    this.currentFilter = 'unknown';
    this.applyFilter();
  }

  resetFilter(): void {
    this.currentFilter = 'all';
    this.applyFilter();
  }

  filterCharacters(): void {
    if (this.nameFilter.length >= 3) {
      this.filteredCharacters = this.allCharacter.filter((l) =>
        l.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      );
      console.log('Filtered characters:', this.filteredCharacters);
    } else {
      this.filteredCharacters = this.character;
      console.log(
        'Filter reset, displaying all characters:',
        this.filteredCharacters
      );
    }
  }
}
