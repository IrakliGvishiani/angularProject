import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  age: [null, [Validators.required, Validators.min(1)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  address: ['', Validators.required],
  phone: [''],      
  zipcode: [''],  
  avatar: [''],     
  gender: ['', Validators.required],
});
  }

  submit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;
  const data = { ...this.registerForm.value, age: +this.registerForm.value.age };

  this.http.post('https://api.everrest.educata.dev/auth/sign_up', data)
    .subscribe({
      next: () => {
        alert('Registration successful! Check your email for verification.');
        this.router.navigate(['/login']); 
      },
      error: (err: any) => {
        console.error('Sign up error', err);
        this.errorMessage = err.error?.message || 'Registration failed';
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false
    });
}





  
}



