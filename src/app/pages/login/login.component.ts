import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Lock, Mail, Eye, EyeOff } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-icon">
            <lucide-icon [img]="Lock"></lucide-icon>
          </div>
          <h1 class="login-title">Admin Login</h1>
          <p class="login-subtitle">Sign in to manage your portfolio</p>
        </div>

        <div class="login-demo-info">
          <p>
            <strong>Demo Credentials:</strong><br />
            Email: admin@portfolio.com<br />
            Password: admin123
          </p>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">
              Email Address
            </label>
            <div class="login-form-group">
              <lucide-icon [img]="Mail"></lucide-icon>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="email"
                required
                class="login-form-input"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              Password
            </label>
            <div class="login-form-group">
              <lucide-icon [img]="Lock"></lucide-icon>
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                [(ngModel)]="password"
                required
                class="login-form-input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                (click)="togglePassword()"
                class="login-password-toggle"
              >
                <lucide-icon [img]="showPassword ? EyeOff : Eye"></lucide-icon>
              </button>
            </div>
          </div>

          <div *ngIf="error" class="alert alert-error">
            <p>{{ error }}</p>
          </div>

          <button
            type="submit"
            [disabled]="isLoading || !loginForm.form.valid"
            class="login-submit"
          >
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="login-back-link">
          <a routerLink="/">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly Lock = Lock;
  readonly Mail = Mail;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  email = '';
  password = '';
  showPassword = false;
  isLoading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.isLoading = true;
    this.error = '';

    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/admin']);
      } else {
        this.error = 'Invalid email or password';
      }
    } catch (err) {
      this.error = 'An error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}