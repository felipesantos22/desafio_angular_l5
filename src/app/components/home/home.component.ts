import { Component, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { ApiService } from '../../services/api.service';
import Character from '../../interfaces/character';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharacterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  data: Character[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe((data: Character[]) => {
      this.data = data;
    });
  }
}
