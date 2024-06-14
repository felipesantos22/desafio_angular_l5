import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceEpisode } from '../../services/api.service.episode';
import { Episode } from '../../interfaces/Episode';

@Component({
  selector: 'app-episode-details',
  standalone: true,
  imports: [],
  templateUrl: './episode-details.component.html',
  styleUrl: './episode-details.component.css',
})
export class EpisodeDetailsComponent {
  episode!: Episode;

  constructor(
    private route: ActivatedRoute,
    private apiServiceEpisode: ApiServiceEpisode
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.apiServiceEpisode.getDetails(id).subscribe((data: Episode) => {
        this.episode = data;
      });
    });
  }
}
