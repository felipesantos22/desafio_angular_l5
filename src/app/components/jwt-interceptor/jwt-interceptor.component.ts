import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jwt-interceptor',
  standalone: true,
  imports: [],
  templateUrl: './jwt-interceptor.component.html',
  styleUrl: './jwt-interceptor.component.css',
})
export class JwtInterceptorComponent {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
