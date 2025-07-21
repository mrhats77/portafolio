import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>John Doe</h3>
            <p>Full Stack Developer passionate about creating amazing web experiences.</p>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Connect</h4>
            <div class="social-links">
              <button mat-icon-button (click)="openLink('https://github.com')">
                <mat-icon>code</mat-icon>
              </button>
              <button mat-icon-button (click)="openLink('https://linkedin.com')">
                <mat-icon>business</mat-icon>
              </button>
              <button mat-icon-button (click)="openLink('https://twitter.com')">
                <mat-icon>alternate_email</mat-icon>
              </button>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} John Doe. All rights reserved.</p>
          <p>Built with Angular {{ angularVersion }}</p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  angularVersion = '20';

  openLink(url: string) {
    window.open(url, '_blank');
  }
}