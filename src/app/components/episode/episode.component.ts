import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Episode } from '../../interfaces/Episode';
import { ApiServiceEpisode } from '../../services/api.service.episode';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.css',
})
export class EpisodeComponent implements OnInit {
  episode: Episode[] = [];
  filteredEpisodes: Episode[] = [];
  currentPage: number = 1;
  loading: boolean = false;

  constructor(private apiServiceEpisode: ApiServiceEpisode) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.loading = true;
    this.apiServiceEpisode
      .getEpisode(this.currentPage)
      .subscribe((data: Episode[]) => {
        this.episode = [...this.episode, ...data];
        this.filteredEpisodes = this.episode;
        this.loading = false;
      });
  }

  onSearch(event: KeyboardEvent): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEpisodes = this.episode.filter((ep) =>
      ep.name.toLowerCase().includes(query)
    );
  }

  onScroll(): void {
    if (!this.loading) {
      this.currentPage++;
      this.get();
    }
  }
}
