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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    // this.loading = true;
    this.apiService.getCharacters(this.currentPage).subscribe((data: Character[]) => {
      this.character = [...this.character, ...data];
      this.allCharacter = [...this.character];
      this.loading = false;
    });
  }

  onScroll(): void {
    if (!this.loading) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  filterAlive(): void {
    this.character = this.allCharacter.filter((l) => l.status === 'Alive');
  }

  filterDead(): void {
    this.character = this.allCharacter.filter((l) => l.status === 'Dead');
  }

  filterUnknown(): void {
    this.character = this.allCharacter.filter((l) => l.status === 'unknown');
  }

  resetFilter(): void {
    this.character = [...this.allCharacter];
  }
}
