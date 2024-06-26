import { Component, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { Character } from '../../interfaces/Character';
import { ApiServiceCharacter } from '../../services/api.service.character';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharacterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  character: Character[] = [];

  constructor(private apiServiceCharacter: ApiServiceCharacter ) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.apiServiceCharacter.getCharacters().subscribe((data: Character[]) => {
      this.character = data;
    });
  }
}
