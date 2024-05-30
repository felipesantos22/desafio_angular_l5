import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Character } from '../interfaces/Character';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {}

  searchCharacters(query = '', page = 1): Observable<Character[]> {
    const url = `${this.apiUrl}?name=${query}&page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }

  getDetails(id: number): Observable<Character> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Character>(url);
  }

  getCharacters(page: number = 1): Observable<Character[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.results));
  }
}
