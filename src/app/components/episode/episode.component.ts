import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Episode } from '../../interfaces/Episode';
import { ApiServiceEpisode } from '../../services/api.service.episode';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css',
})
export class EpisodeComponent implements OnInit {
  episode: Episode[] = [];
  filteredEpisodes: Episode[] = [];

  constructor(private apiServiceEpisode: ApiServiceEpisode) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.apiServiceEpisode.getEpisode().subscribe((data: Episode[]) => {
      this.episode = data;
      this.filteredEpisodes = data;
    });
  }

  onSearch(event: KeyboardEvent): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEpisodes = this.episode.filter((ep) =>
      ep.name.toLowerCase().includes(query)
    );
    console.log(query);
  }
}
