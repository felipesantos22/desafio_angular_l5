import { Component, OnInit } from '@angular/core';
import { Location } from '../../interfaces/Location';

import { CommonModule } from '@angular/common';
import { ApiServiceLocation } from '../../services/api.service.location';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements OnInit {
  location: Location[] = [];
  filteredLocations: Location[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  searchQuery: string = '';

  constructor(private apiServiceLocation: ApiServiceLocation) {}

  ngOnInit(): void {
    this.loadLocations();

    if (typeof localStorage !== 'undefined') {
      const savedSearchQuery = localStorage.getItem('locationSearchQuery');
      if (savedSearchQuery) {
        this.searchQuery = savedSearchQuery;
      }
    }
  }

  loadLocations(): void {
    this.loading = true;
    this.apiServiceLocation
      .getLocation(this.currentPage)
      .subscribe((data: Location[]) => {
        this.location = [...this.location, ...data];
        this.applyFilter();
        this.loading = false;
      });
  }

  onScroll(): void {
    if (!this.loading) {
      this.currentPage++;
      this.loadLocations();
    }
  }

  onSearch(event: KeyboardEvent): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilter();
    // Save to local storage 02/05
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('locationSearchQuery', this.searchQuery);
    }
  }

  applyFilter(): void {
    if (this.searchQuery.length >= 1) {
      this.filteredLocations = this.location.filter((loc) =>
        loc.name.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.filteredLocations = this.location;
    }
  }
}
