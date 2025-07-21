import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Github, Linkedin, Mail, Download } from 'lucide-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="profile" class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <!-- Profile Image -->
          <div class="hero-image-container">
            <div class="hero-image-wrapper">
              <div class="hero-image-inner">
                <img
                  [src]="(dataService.personalInfo$ | async)?.profileImage"
                  alt="Profile"
                  class="hero-image"
                />
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="hero-text">
            <p class="hero-greeting">Hello, I'm</p>
            <h1 class="hero-name">
              {{ (dataService.personalInfo$ | async)?.name }}
            </h1>
            <p class="hero-title">
              {{ (dataService.personalInfo$ | async)?.title }}
            </p>
            
            <!-- Buttons -->
            <div class="hero-buttons">
              <a href="#" class="hero-btn hero-btn-secondary">
                <lucide-icon [img]="Download" class="w-5 h-5 mr-2"></lucide-icon>
                Download CV
              </a>
              <a href="#contact" class="hero-btn hero-btn-primary">
                <lucide-icon [img]="Mail" class="w-5 h-5 mr-2"></lucide-icon>
                Contact Info
              </a>
            </div>

            <!-- Social Links -->
            <div class="hero-socials">
              <a href="#" class="hero-social-link">
                <lucide-icon [img]="Linkedin" class="w-6 h-6"></lucide-icon>
              </a>
              <a href="#" class="hero-social-link">
                <lucide-icon [img]="Github" class="w-6 h-6"></lucide-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  readonly Github = Github;
  readonly Linkedin = Linkedin;
  readonly Mail = Mail;
  readonly Download = Download;

  constructor(public dataService: DataService) {}
}