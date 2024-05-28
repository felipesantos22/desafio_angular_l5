import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Character from '../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {}

  searchCharacters(query = '', page = 1) {
    const url = `${this.apiUrl}/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(url);
  }

  getDetails(id: Number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Character>(url);
  }

  getCharacters(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }
}
