import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../interfaces/Character';
import { RouterLink } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { ApiServiceCharacter } from '../../services/api.service.character';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, RouterLink, InfiniteScrollModule, FormsModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  // @Input() character: Character[] = [];
  allCharacter: Character[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  currentFilter: string = 'all';

  //Filtro por nome
  nameFilter: string = '';
  filteredCharacters: Character[] = [];

  constructor(private apiServiceCharacter: ApiServiceCharacter) {}

  ngOnInit(): void {
    this.loadCharacters();
    //Buscar dados no local storage
    if (typeof localStorage !== 'undefined') {
      const savedNameFilter = localStorage.getItem('characterSearchQuery');
      if (savedNameFilter) {
        this.nameFilter = savedNameFilter;
        this.filterCharacters();
      }
    }
  }

  loadCharacters(): void {
    this.loading = true;
    this.apiServiceCharacter
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
    let filtered = [...this.allCharacter];

    // Aplica o filtro de status
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(
        (character) =>
          character.status.toLowerCase() === this.currentFilter.toLowerCase()
      );
    }

    // Aplica o filtro de nome
    if (this.nameFilter.length >= 1) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      );
    }

    // Atualiza a lista de personagens filtrados
    this.filteredCharacters = filtered;
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
    // Salvando no local storage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('characterSearchQuery', this.nameFilter);
    }

    if (this.nameFilter.length >= 1) {
      this.filteredCharacters = this.allCharacter.filter((l) =>
        l.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      );
    } else {
      this.filteredCharacters = this.allCharacter;
    }
  }

  onStatusChange(event: any): void {
    const status = event.target.value;
    this.currentFilter = status;
    this.applyFilter();
  }
  
}
