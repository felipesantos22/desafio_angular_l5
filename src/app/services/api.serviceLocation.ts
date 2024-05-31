import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Location } from '../interfaces/Location';

@Injectable({
  providedIn: 'root',
})
export class ApiLocationService {
  private apiUrl = 'https://rickandmortyapi.com/api/location/';

  constructor(private http: HttpClient) {}

  searchLocation(query = '', page = 1): Observable<Location[]> {
    const url = `${this.apiUrl}?name=${query}&page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }

  getDetails(id: number): Observable<Location> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Location>(url);
  }

  getLocation(page: number = 1): Observable<Location[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }
}
