import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiServiceCharacter } from '../../services/api.service.character';
import { Character } from '../../interfaces/Character';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  character!: Character;

  constructor(private route: ActivatedRoute, private apiServiceCharacter: ApiServiceCharacter) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.apiServiceCharacter.getDetails(id).subscribe((data: Character) => {
        this.character = data;
      });
    });
  }
}
