import { Component, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { ApiService } from '../../services/api.service';
import { Character } from '../../interfaces/Character';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharacterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  character: Character[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.apiService.getCharacters().subscribe((data: Character[]) => {
      this.character = data;
      console.log(data);
    });
  }
}
