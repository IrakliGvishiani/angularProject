import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { UserInfo } from '../models/profile';

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

  constructor(private router: Router, private cartService: CartService,private api : ApiService) {}

  ngOnInit(): void {
    this.loadCartCount();
    this.cartService.cartUpdated$.subscribe(() => this.loadCartCount());


    this.getUser()
  }

  loadCartCount() {
    this.cartService.gets('https://api.everrest.educata.dev/shop/cart').subscribe({
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

   getUser(){
       this.api.getAuth()
       .subscribe({
         next: (resp : UserInfo)  => {
           // console.log(resp);
             this.data = resp
             console.log(this.data);
 
             
         },
         error: err => {
           console.log(err);
           
         }
       })
     }

     data! : UserInfo
}
