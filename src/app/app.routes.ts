import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'product/:id', 
    loadComponent: () => import('./product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
    {
    path: 'register',
    loadComponent: () => import('./register/register.component')
        .then(m => m.RegisterComponent)
    },
  
    
    { 
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent

    )
  },

   { path: 'profile', 
    component: ProfileComponent
    },


    { 
        path: 'cart', component: CartComponent 
    },
    { 
        path: 'login', component: LoginComponent 
    }
];


