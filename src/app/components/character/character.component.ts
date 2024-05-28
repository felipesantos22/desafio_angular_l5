import { Component, Input } from '@angular/core';
import Character from '../../interfaces/character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  @Input() data: Character[] = [];
}
