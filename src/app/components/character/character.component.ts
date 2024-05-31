import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../interfaces/Character';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, RouterLink, InfiniteScrollModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  @Input() character: Character[] = [];
  allCharacter: Character[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  currentFilter: string = 'all';

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
}
