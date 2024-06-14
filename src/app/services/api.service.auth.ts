import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = this.isBrowser() ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`http://127.0.0.1:8000/api/auth/login`, { email, password })
      .pipe(
        map((response) => {
          if (response && response.token && response.name) {
            const user: User = { email, password, name: response.name, token: response.token };
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return response;
        })
      );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userName');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  get currentUserName(): string | null {
    return this.isBrowser() ? localStorage.getItem('userName') : null;
  }
}
