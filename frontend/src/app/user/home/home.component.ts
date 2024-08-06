import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(){
    this.authService.logout().subscribe(
      (response) => {
        this.router.navigate(['/login'])
      },
      error => {
        console.log(error);

      }
    )
  }
}
