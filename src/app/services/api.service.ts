import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://api.everrest.educata.dev';

  constructor(private http: HttpClient) {}


  search(filters: any) {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get('https://api.everrest.educata.dev/shop/products/search', { params });
  }

  getAllProducts() {
    return this.http.get('https://api.everrest.educata.dev/shop/products/all');
  }

  getProducts(pageIndex: number, pageSize: number = 8): Observable<any> {
    let params = new HttpParams()
      .set('page_index', pageIndex)
      .set('page_size', pageSize);
    return this.http.get('https://api.everrest.educata.dev/shop/products/all', { params });
  }

  getCategories() {
    return this.http.get('https://api.everrest.educata.dev/shop/products/categories');
  }

  getProductById(id: string) {
    return this.http.get<any>(`https://api.everrest.educata.dev/shop/products/id/${id}`);
  }

    getAuth<T = any>(): Observable<T> {
  const token = localStorage.getItem('access_token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<T>('https://api.everrest.educata.dev/auth', { headers });
}

  
}
