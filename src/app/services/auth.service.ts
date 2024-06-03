import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : {}
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`http://127.0.0.1:8000/api/auth/login`, { username, password })
      .pipe(
        map((user) => {
          // Login bem-sucedido se houver um token JWT na resposta
          if (user && user.token) {
            // Armazenar detalhes do usuário e o token no local storage
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
            this.currentUserSubject.next(user);
            console.log(user);
          }
          return user;
        })
      );
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
