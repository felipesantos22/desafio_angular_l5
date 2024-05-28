import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../interfaces/Character';


@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  @Input() character: Character[] = [];
}
