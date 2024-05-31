import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Episode } from '../interfaces/Episode';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceEpisode {
  private apiUrl = 'https://rickandmortyapi.com/api/episode/';

  constructor(private http: HttpClient) {}

  searchLocation(query = '', page = 1): Observable<Episode[]> {
    const url = `${this.apiUrl}?name=${query}&page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }

  getDetails(id: number): Observable<Episode> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Episode>(url);
  }

  getLocation(page: number = 1): Observable<Episode[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }
}
