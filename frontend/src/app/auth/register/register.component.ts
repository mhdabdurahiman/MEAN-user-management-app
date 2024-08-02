import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    },{
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('cpassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    return passwordControl.value === confirmPasswordControl.value ? null : { mismatch: true };
  }

  onSubmit(){
    if (this.registerForm.valid){
      this.authService.registerUser(this.registerForm.value).subscribe(
        (response) => {
          this.toastr.success('Resistration successful! Please log in.', 'Success');
          this.router.navigate(['/login'])
        },
        error => {
          console.log(error.message || error.error.error);
          const errorMessage = error.error?.error || 'Registration failed. Please try again.';
          this.toastr.error(errorMessage, 'Error')
        }
      );
    }
  }
}
