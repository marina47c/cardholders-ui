import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
  this.error = '';
  this.loading = true;
  this.auth.login(this.username, this.password).subscribe({
    next: _ => {
      this.loading = false;
      this.router.navigateByUrl('/cardholders');
    },
    error: _ => {
      this.loading = false;
      this.error = 'Invalid username or password.';
    }
  });
  }
}
