import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  
  product: any = null;
  loading: boolean = true;
  error: string = '';

  currentImageIndex: number = 0;   
  isZoomOpen: boolean = false;     
  zoomedImage: string | null = null; 
  zoomScale: number = 1;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.api.getProductById(id).subscribe({
        next: (res: any) => {
          this.product = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load product details.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No product ID provided.';
      this.loading = false;
    }
  }


  

nextImage() {
  if (!this.product?.images) return;
  this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
  this.zoomedImage = this.product.images[this.currentImageIndex];
}

prevImage() {
  if (!this.product?.images) return;
  this.currentImageIndex =
    (this.currentImageIndex - 1 + this.product.images.length) %
    this.product.images.length;
  this.zoomedImage = this.product.images[this.currentImageIndex];
}


  openZoom(img: string) {
  this.zoomedImage = img;
  this.currentImageIndex = this.product.images.indexOf(img);
  this.isZoomOpen = true;
}


  onZoomWheel(event: WheelEvent) {
  event.preventDefault();
  if (event.deltaY < 0) {
    this.zoomScale = Math.min(this.zoomScale + 0.1, 3); 
  } else {
    this.zoomScale = Math.max(this.zoomScale - 0.1, 1); 
  }
  const imgEl = event.target as HTMLImageElement;
  imgEl.style.transform = `scale(${this.zoomScale})`;
}

closeZoom() {
  this.isZoomOpen = false;
  this.zoomedImage = null;
  this.zoomScale = 1;
}

  
}
