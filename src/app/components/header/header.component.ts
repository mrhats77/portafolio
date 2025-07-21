import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="header">
      <nav class="header-nav">
        <!-- Desktop Navigation -->
        <div class="header-desktop">
          <div class="header-logo">
            {{ (dataService.personalInfo$ | async)?.name }}
          </div>
          <div>
            <ul class="header-nav-links">
              <li *ngFor="let item of navItems">
                <a [href]="item.href" class="header-nav-link">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="header-mobile">
          <div class="header-mobile-logo">
            {{ (dataService.personalInfo$ | async)?.name }}
          </div>
          <button
            (click)="toggleMenu()"
            class="header-menu-button"
          >
            <lucide-icon [img]="isMenuOpen ? X : Menu" size="24"></lucide-icon>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="isMenuOpen" class="header-mobile-menu">
          <ul class="header-mobile-nav">
            <li *ngFor="let item of navItems" class="header-mobile-nav-item">
              <a
                [href]="item.href"
                class="header-mobile-nav-link"
                (click)="closeMenu()"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  readonly Menu = Menu;
  readonly X = X;
  
  isMenuOpen = false;

  navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  constructor(public dataService: DataService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}