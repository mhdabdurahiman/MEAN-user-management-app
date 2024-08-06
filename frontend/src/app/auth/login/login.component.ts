import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    if (this.loginForm.valid){
      this.authService.loginUser(this.loginForm.value).subscribe(
        (response) => {
          this.toastr.success('Login successful', 'Success');
          this.router.navigate(['/home'])
        },
        error => {
          console.log(error);
          this.toastr.error(error.message, 'Error')
        }
      )
    }
  }
}
