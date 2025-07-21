import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <!-- Brand -->
          <div class="footer-brand">
            <h3 class="text-2xl font-bold mb-4">{{ (dataService.personalInfo$ | async)?.name }}</h3>
            <p class="text-gray-400 mb-4">
              {{ (dataService.personalInfo$ | async)?.title }} passionate about creating beautiful and functional web experiences.
            </p>
            <div class="footer-socials">
              <a
                *ngFor="let link of socialLinks"
                [href]="link.href"
                [attr.aria-label]="link.label"
                class="footer-social-link"
              >
                <lucide-icon [img]="link.icon"></lucide-icon>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-links">
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li *ngFor="let link of navLinks">
                <a
                  [href]="link.href"
                  class="footer-link"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-contact">
            <h4 class="text-lg font-semibold mb-4">Get In Touch</h4>
            <div class="footer-contact-info">
              <p>{{ (dataService.contactInfo$ | async)?.email }}</p>
              <p>{{ (dataService.contactInfo$ | async)?.phone }}</p>
              <p>{{ (dataService.contactInfo$ | async)?.location }}</p>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>
            © {{ currentYear }} {{ (dataService.personalInfo$ | async)?.name }}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  readonly Github = Github;
  readonly Linkedin = Linkedin;
  readonly Mail = Mail;
  
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      icon: this.Github,
      href: '#',
      label: 'GitHub',
    },
    {
      icon: this.Linkedin,
      href: '#',
      label: 'LinkedIn',
    },
    {
      icon: this.Mail,
      href: '#',
      label: 'Email',
    },
  ];

  navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  constructor(public dataService: DataService) {
    this.dataService.contactInfo$.subscribe(contactInfo => {
      this.socialLinks[2].href = `mailto:${contactInfo.email}`;
    });
  }
}