import { Component, OnInit } from '@angular/core';
import { Location } from '../../interfaces/Location';

import { CommonModule } from '@angular/common';
import { ApiServiceLocation } from '../../services/api.service.location';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements OnInit {
  location: Location[] = [];
  filteredLocations: Location[] = [];

  constructor(private apiServiceLocation: ApiServiceLocation) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.apiServiceLocation.getLocation().subscribe((data: Location[]) => {
      this.location = data;
      this.filteredLocations = data;
    });
  }

  onSearch(event: KeyboardEvent): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredLocations = this.location.filter((ep) =>
      ep.name.toLowerCase().includes(query)
    );
  }
}
