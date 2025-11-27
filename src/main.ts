import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientJsonpModule, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(FormsModule, ReactiveFormsModule, HttpClientJsonpModule), // ✅ ReactiveFormsModule დამატებულია
    provideRouter(routes)
  ]
}).catch(err => console.error(err));




