import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar class="header-toolbar">
      <div class="header-container">
        <a routerLink="/" class="logo">
          <mat-icon>code</mat-icon>
          <span>Portfolio</span>
        </a>
        
        <nav class="desktop-nav">
          <a href="#about" mat-button>About</a>
          <a href="#experience" mat-button>Experience</a>
          <a href="#projects" mat-button>Projects</a>
          <a href="#contact" mat-button>Contact</a>
        </nav>

        <button mat-icon-button [matMenuTriggerFor]="menu" class="mobile-menu">
          <mat-icon>menu</mat-icon>
        </button>
        
        <mat-menu #menu="matMenu">
          <a href="#about" mat-menu-item>About</a>
          <a href="#experience" mat-menu-item>Experience</a>
          <a href="#projects" mat-menu-item>Projects</a>
          <a href="#contact" mat-menu-item>Contact</a>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
}