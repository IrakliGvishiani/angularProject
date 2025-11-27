import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userAvatar: string | null = null;
  cartCount: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartCount();
    this.cartService.cartUpdated$.subscribe(() => this.loadCartCount());
  }

  loadCartCount() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartCount = res?.total?.quantity || 0;
      },
      error: () => (this.cartCount = 0),
    });
  }

  goHome() { this.router.navigate(['/home']); }
  login() { this.router.navigate(['/login']); }
  goToRegister() { this.router.navigate(['/register']); }
  goToProfile() { this.router.navigate(['/profile']); }
  goToCart() { this.router.navigate(['/cart']); }

  setUserAvatar(url: string) { this.userAvatar = url; }
}
