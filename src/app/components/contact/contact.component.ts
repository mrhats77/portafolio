import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, Phone, MapPin, Send } from 'lucide-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <section id="contact" class="contact">
      <div class="contact-container">
        <div class="contact-header">
          <p class="contact-subtitle">Get In Touch</p>
          <h2 class="contact-title">Contact Me</h2>
        </div>

        <div class="contact-content">
          <!-- Contact Information -->
          <div class="contact-info">
            <h3 class="contact-info-title">
              Let's work together
            </h3>
            <p class="contact-info-description">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div class="contact-info-items">
              <a
                *ngFor="let info of contactInfoItems"
                [href]="info.href"
                class="contact-info-item"
              >
                <div class="contact-info-icon">
                  <lucide-icon [img]="info.icon" class="w-6 h-6"></lucide-icon>
                </div>
                <div class="contact-info-details">
                  <h4>{{ info.title }}</h4>
                  <p>{{ info.value }}</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-container">
            <div class="contact-form">
              <div *ngIf="submitStatus === 'success'" class="alert alert-success">
                <p>{{ submitMessage }}</p>
              </div>
              
              <div *ngIf="submitStatus === 'error'" class="alert alert-error">
                <p>{{ submitMessage }}</p>
              </div>
              
              <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
                <div class="contact-form-group">
                  <label for="name" class="contact-form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    [(ngModel)]="formData.name"
                    required
                    [disabled]="isSubmitting"
                    class="contact-form-input"
                    placeholder="Your name"
                  />
                </div>

                <div class="contact-form-group">
                  <label for="email" class="contact-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    [(ngModel)]="formData.email"
                    required
                    [disabled]="isSubmitting"
                    class="contact-form-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div class="contact-form-group">
                  <label for="message" class="contact-form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    [(ngModel)]="formData.message"
                    required
                    [disabled]="isSubmitting"
                    rows="5"
                    class="contact-form-textarea"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  [disabled]="isSubmitting || !contactForm.form.valid"
                  class="contact-form-button"
                >
                  <lucide-icon [img]="Send" class="w-5 h-5 mr-2"></lucide-icon>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Send = Send;

  formData = {
    name: '',
    email: '',
    message: '',
  };

  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  submitMessage = '';

  contactInfoItems: any[] = [];

  constructor(public dataService: DataService) {
    this.dataService.contactInfo$.subscribe(contactInfo => {
      this.contactInfoItems = [
        {
          icon: this.Mail,
          title: 'Email',
          value: contactInfo.email,
          href: `mailto:${contactInfo.email}`,
        },
        {
          icon: this.Phone,
          title: 'Phone',
          value: contactInfo.phone,
          href: `tel:${contactInfo.phone.replace(/\D/g, '')}`,
        },
        {
          icon: this.MapPin,
          title: 'Location',
          value: contactInfo.location,
          href: '#',
        },
      ];
    });
  }

  onFormChange() {
    if (this.submitStatus !== 'idle') {
      this.submitStatus = 'idle';
      this.submitMessage = '';
    }
  }

  async onSubmit() {
    this.isSubmitting = true;
    this.submitStatus = 'idle';
    this.submitMessage = '';

    try {
      const success = await this.dataService.submitContactForm(this.formData);
      
      if (success) {
        this.submitStatus = 'success';
        this.submitMessage = "Thank you for your message! I'll get back to you soon.";
        this.formData = { name: '', email: '', message: '' };
      } else {
        this.submitStatus = 'error';
        this.submitMessage = 'Failed to send message. Please try again.';
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.submitStatus = 'error';
      this.submitMessage = 'Failed to send message. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}