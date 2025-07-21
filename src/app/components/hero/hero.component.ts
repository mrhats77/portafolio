import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            Hi, I'm <span class="highlight">John Doe</span>
          </h1>
          <h2 class="hero-subtitle">Full Stack Developer</h2>
          <p class="hero-description">
            I create beautiful, responsive web applications using modern technologies
            like Angular, TypeScript, and Node.js. Let's build something amazing together.
          </p>
          <div class="hero-actions">
            <button mat-raised-button color="primary" (click)="scrollToContact()">
              <mat-icon>mail</mat-icon>
              Get In Touch
            </button>
            <button mat-stroked-button (click)="scrollToProjects()">
              <mat-icon>work</mat-icon>
              View My Work
            </button>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-placeholder">
            <mat-icon>person</mat-icon>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}