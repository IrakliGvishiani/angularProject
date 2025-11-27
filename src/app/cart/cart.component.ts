import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any = null;
  loading = false;
  error: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
    this.cartService.cartUpdated$.subscribe(() => this.loadCart());
  }

  loadCart() {
    this.loading = true;
    this.error = null;
    this.cartService.gets('https://api.everrest.educata.dev/shop/cart').subscribe({
      next: (res) => {
        this.cart = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'კალათაში დამატება ვერ მოხერხდა';
        this.loading = false;
      }
    });
  }
}
