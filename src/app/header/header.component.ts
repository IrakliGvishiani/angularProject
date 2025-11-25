import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private router: Router) {}

  login() {
    this.isLoggedIn = true;
    console.log('Logged in');
    this.router.navigate(['/login']); // Login page-ზე გადამისამართება
  }

  logout() {
    this.isLoggedIn = false;
    console.log('Logged out');
    this.router.navigate(['/']); // მთავარი გვერდზე დაბრუნება
  }

  goToRegister() {
    this.router.navigate(['/register']); // Register page-ზე გადამისამართება
  }
}
  
  


