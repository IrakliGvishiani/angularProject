import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ApiService } from '../services/api.service';
import { UserInfo } from '../models/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {
    firstName: '',
    lastName: '',
    age: null,
    email: '',
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: ''
  };

  editing = false;
  changingPassword = false;
  message = '';

  editForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder,private api : ApiService) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phone: [''],
      zipcode: [''],
      avatar: [''],
      gender: ['MALE', Validators.required],
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    
    this.getUser()

  }


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
    

  editInfo() {
    this.editing = true;
    this.changingPassword = false;
  }


  data! : UserInfo

  cancelEdit() {
    this.editing = false;
  }

  submitEdit() {
    if (this.editForm.invalid) return;
    this.http.post('https://api.everrest.educata.dev/auth/update', this.editForm.value)
      .subscribe({
        next: res => {
          this.user = {...this.user, ...this.editForm.value};
          this.editing = false;
          this.message = 'Info updated successfully';
        },
        error: err => this.message = 'Failed to update info'
      });
  }

  recoverPassword() {
    this.http.post('https://api.everrest.educata.dev/auth/recovery', { email: this.user.email })
      .subscribe({
        next: res => this.message = 'Recovery email sent if account exists',
        error: err => this.message = 'Failed to send recovery email'
      });
  }

  changePassword() {
    this.changingPassword = true;
    this.editing = false;
  }

  cancelPassword() {
    this.changingPassword = false;
    this.passwordForm.reset();
  }

  submitPassword() {
    if (this.passwordForm.invalid) return;
  this.http.post('https://api.everrest.educata.dev/auth/change_password', this.passwordForm.value)
    .subscribe({
      next: res => {
        this.changingPassword = false;
        this.passwordForm.reset(); 
        this.message = 'Password changed successfully';
      },
      error: err => this.message = 'Failed to change password'
    });
  }
}
