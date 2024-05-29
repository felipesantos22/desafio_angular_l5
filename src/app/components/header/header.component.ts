import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  searchValue: string = '';

  ngOnInit(): void {}

  onSearch(value: string) {
    console.log(value);
    if (value && value.length > 3) {
      this.router.navigate(['/'], {
        queryParams: { q: value },
      });
    }
    
  }
}
