import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PortfolioService } from '../../shared/services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <section id="contact" class="contact">
      <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        
        <div class="contact-content">
          <div class="contact-info">
            <h3>Let's work together</h3>
            <p>
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div class="contact-methods">
              <div class="contact-method">
                <mat-icon>email</mat-icon>
                <span>john.doe@example.com</span>
              </div>
              <div class="contact-method">
                <mat-icon>phone</mat-icon>
                <span>+1 (555) 123-4567</span>
              </div>
              <div class="contact-method">
                <mat-icon>location_on</mat-icon>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
          
          <mat-card class="contact-form-card">
            <mat-card-content>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Name</mat-label>
                  <input matInput formControlName="name" required>
                  <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                    Name is required
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" required>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Subject</mat-label>
                  <input matInput formControlName="subject" required>
                  <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                    Subject is required
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Message</mat-label>
                  <textarea matInput rows="5" formControlName="message" required></textarea>
                  <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                    Message is required
                  </mat-error>
                </mat-form-field>
                
                <button 
                  mat-raised-button 
                  color="primary" 
                  type="submit" 
                  [disabled]="contactForm.invalid"
                  class="submit-button">
                  <mat-icon>send</mat-icon>
                  Send Message
                </button>
              </form>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private portfolioService = inject(PortfolioService);
  private snackBar = inject(MatSnackBar);

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.portfolioService.addMessage(this.contactForm.value);
      this.snackBar.open('Message sent successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.contactForm.reset();
    }
  }
}