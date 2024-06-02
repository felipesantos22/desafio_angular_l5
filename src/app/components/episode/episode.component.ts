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
  searchQuery: string = '';

  constructor(private apiServiceEpisode: ApiServiceEpisode) {}

  ngOnInit(): void {
    this.loadEpisodes();
  }

  loadEpisodes(): void {
    this.loading = true;
    this.apiServiceEpisode
      .getEpisode(this.currentPage)
      .subscribe((data: Episode[]) => {
        this.episode = [...this.episode, ...data];
        this.applyFilter();
        this.loading = false;
      });
  }

  onSearch(event: KeyboardEvent): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.searchQuery.length >= 1) {
      this.filteredEpisodes = this.episode.filter((loc) =>
        loc.name.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.filteredEpisodes = this.episode;
    }
  }

  onScroll(): void {
    if (!this.loading) {
      this.currentPage++;
      this.loadEpisodes();
    }
  }
}
