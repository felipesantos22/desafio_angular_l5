import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServiceEpisode } from '../../services/api.serviceEpisode';
import { Episode } from '../../interfaces/Episode';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css',
})
export class EpisodeComponent implements OnInit {
  episode: Episode[] = [];

  constructor(private apiServiceEpisode: ApiServiceEpisode) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.apiServiceEpisode.getLocation().subscribe((data: Episode[]) => {
      this.episode = data;
    });
  }
}
