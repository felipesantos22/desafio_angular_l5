import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../interfaces/Character';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  @Input() character: Character[] = [];

  allCharacter: Character[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe((data: Character[]) => {
      this.character = data;
      this.allCharacter = [...this.character];
    });
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
