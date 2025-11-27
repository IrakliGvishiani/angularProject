import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products: any[] = [];         
  filteredProducts: any[] = []; 
  categories: any[] = [];       
  
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 8;

  constructor(private api: ApiService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    
  }

  goToDetail(product: any) {
    this.router.navigate(['/product', product._id]);
  }
  loadProducts(): void {
    this.api.getProducts(1, 40).subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.filteredProducts = [...this.products];
        this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
      },
      error: (err) => console.log(err)
    });
  }

  loadCategories(): void {
    this.api.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err) => console.log(err)
    });
  }

  Search(form: NgForm): void {
    const { keywords, brand, price_min, price_max, rating, sort_by, sort_direction, category_id } = form.value;

    this.filteredProducts = this.products.filter(p => {
      let match = true;
      if (keywords) match = match && p.title.toLowerCase().includes(keywords.toLowerCase());
      if (brand) match = match && p.brand.toLowerCase() === brand.toLowerCase();
      if (price_min) match = match && p.price.current >= price_min;
      if (price_max) match = match && p.price.current <= price_max;
      if (rating) match = match && p.rating >= rating;
      if (category_id) match = match && p.category.id == category_id;
      return match;
    });

    if (sort_by) {
      const getValue = (obj: any, path: string) =>
        path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);

      this.filteredProducts.sort((a, b) => {
        const valA = getValue(a, sort_by);
        const valB = getValue(b, sort_by);
        return sort_direction === 'desc' ? valB - valA : valA - valB;
      });
    }

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) stars.push('full');
    if (halfStar) stars.push('half');
    for (let i = 0; i < emptyStars; i++) stars.push('empty');

    return stars;
  }

  pagedProducts(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  goToPage(pageIndex: number) {
    if (pageIndex >= 1 && pageIndex <= this.totalPages) {
      this.currentPage = pageIndex;
    }
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  resetForm(form: NgForm) {
    
    form.controls['keywords'].setValue('');
    form.controls['brand'].setValue('');
    form.controls['price_min'].setValue(null);
    form.controls['price_max'].setValue(null);
    form.controls['rating'].setValue(null);
    form.controls['sort_by'].setValue('');        
    form.controls['sort_direction'].setValue(''); 
    form.controls['category_id'].setValue(''); 

    this.filteredProducts = [...this.products];
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  access = localStorage.getItem('access_token')
 refresh = localStorage.getItem('refresh_token')

  addToCart(productId : string) {



          this.cartService.gets('https://api.everrest.educata.dev/shop/cart')
      .subscribe({
        next: s => {
          console.log(s);

          this.cartService.patch('https://api.everrest.educata.dev/shop/cart/product',{
            id: productId,
            quantity : 1
          }).subscribe({
            next: res => {
              console.log(`Added to cart!`);
              alert('added to cart!')
            },
            error: err => {
              if(err.status == 400){
                alert('no products in stock!')
              }
              
            }
          })
          
        },
        error: err => {
          console.log(err.status);
          if(err.status == 409){
            this.cartService.postO('https://api.everrest.educata.dev/shop/cart/product', {
              id: productId,
              quantity : 1
            })
            .subscribe({
              next: res => {
                alert('cart created!')
                console.log(res);
                
              },
              error: err => {
                console.log(err);
                
              }
            })
          }
        }
      })

    // if (this.access == null || this.refresh == null) {
    //   alert('გთხოვთ, შეხვიდეთ სისტემაში');
    //   this.router.navigate(['/login']); 
    //   return;
    // }

    // this.cartService.addToCart(productId, 1).subscribe({
    //   next: (res) => {
    //     alert('ნივთი დაემატა კალათაში');
    //     this.cartService.notifyCartUpdate();
    //     console.log(res);
        
    //   },
    //   error: (err) => {
    //     console.error('Add to cart error', err);
    //     console.log(err);
        
        
    //     if (err.status === 401 || err.status === 400) {
    //       alert('გთხოვთ, შეხვიდეთ სისტემაში');
    //       this.router.navigate(['/login']);
    //     } else {
    //       alert('დამატება ვერ მოხერხდა');
    //     }
    //   }
    // });
    
  }


}
