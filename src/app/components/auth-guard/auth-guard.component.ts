import { Component } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-auth-guard',
  standalone: true,
  imports: [],
  templateUrl: './auth-guard.component.html',
  styleUrl: './auth-guard.component.css',
})
export class AuthGuardComponent {
 
}
