import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LocationComponent } from './pages/location/location.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'location', component: LocationComponent },
  { path: 'episode', component: EpisodeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
];
