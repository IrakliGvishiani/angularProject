// src/app/pages/search/search.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  products: any[] = [];

  constructor(private api: ApiService) {}

  Search(form: NgForm) {

    console.log('Search form submitted', form.value);

    this.api.search({
      page_size: 40,
      keywords: form.value.keywords,
      category_id: form.value.category_id,
      brand: form.value.brand,
      rating: form.value.rating,
      price_min: form.value.price_min,
      price_max: form.value.price_max,
      sort_by: form.value.sort_by,
      sort_direction: form.value.sort_direction
    }).subscribe({
      next: (resp: any) => {
        this.products = resp.products ?? [];
        console.log(this.products);

        console.log('API Response:', resp);
      },
      error: err => console.log(err)
    });
  }
}



