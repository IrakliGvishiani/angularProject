import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'https://api.everrest.educata.dev/shop/cart';
  private token = localStorage.getItem('access_token');

  private cartUpdated = new BehaviorSubject<boolean>(false);
  cartUpdated$ = this.cartUpdated.asObservable();

  constructor(private http: HttpClient) {}

  private authHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

//   addToCart(productId: string, quantity: number = 1) {
//   return this.http.post(`${this.baseUrl}/product`, { id: productId, quantity }, this.authHeaders());
// }


  gets<T = any>(url : string): Observable<T>{
    const token = localStorage.getItem('access_token');

    return this.http.get<T>(url, {
      headers: new HttpHeaders({
         Authorization: `Bearer ${token}`
      })
    })
  }


  
patch(url : string, obj: any){

  let token = localStorage.getItem(`access_token`)

  return this.http.patch(url,obj, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  })
}


postO(url: string, obj: any) {
  const token = localStorage.getItem('access_token');

  return this.http.post(url, obj, {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  });
}


updateCartItem(productId: string, quantity: number) {
  return this.http.patch(`${this.baseUrl}/product`, { id: productId, quantity }, this.authHeaders());
}


removeCartItem(productId: string) {
  return this.http.request('delete', `${this.baseUrl}/product`, { 
    headers: new HttpHeaders({ Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' }),
    body: { id: productId }
  });
}

  // getCart(): Observable<any> {
  //   return this.http.get(this.baseUrl, this.authHeaders());
  // }

  notifyCartUpdate() {
    this.cartUpdated.next(true);
  }
  
}
