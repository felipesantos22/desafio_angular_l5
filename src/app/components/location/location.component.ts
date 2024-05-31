import { Component, OnInit } from '@angular/core';
import { Location } from '../../interfaces/Location';
import { ApiServiceLocation } from '../../services/api.serviceLocation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

  location: Location[] = [];

  constructor(private apiServiceLocation: ApiServiceLocation) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.apiServiceLocation.getLocation().subscribe((data: Location[]) => {
      this.location = data;
    });
  }

}
