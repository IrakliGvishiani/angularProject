import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 8;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadProducts(this.currentPage);
  }

  loadProducts(pageIndex: number) {
    this.api.getProducts(pageIndex, this.pageSize).subscribe((res: any) => {
      this.products = res.products;
      this.currentPage = pageIndex;
      this.totalPages = Math.ceil(res.total / this.pageSize);
    });
  }

  goToPage(pageIndex: number) {
    if (pageIndex >= 1 && pageIndex <= this.totalPages) {
      this.loadProducts(pageIndex);
    }
  }

  prevPage() {
    if (this.currentPage > 1) this.loadProducts(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.loadProducts(this.currentPage + 1);
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
}
