import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Award, Users } from 'lucide-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="about" class="about">
      <div class="about-container">
        <div class="about-header">
          <p class="about-subtitle">Get To Know More</p>
          <h2 class="about-title">About Me</h2>
        </div>

        <div class="about-content">
          <!-- Image -->
          <div class="about-image-container">
            <div class="about-image-wrapper">
              <img
                [src]="(dataService.personalInfo$ | async)?.aboutImage"
                alt="About"
                class="about-image"
              />
            </div>
          </div>

          <!-- Content -->
          <div class="about-details">
            <!-- Stats Cards -->
            <div class="about-stats">
              <div *ngFor="let stat of stats" class="about-stat-card">
                <div class="about-stat-icon">
                  <lucide-icon [img]="stat.icon" class="w-8 h-8"></lucide-icon>
                </div>
                <h3 class="about-stat-title">
                  {{ stat.title }}
                </h3>
                <p class="about-stat-description">{{ stat.description }}</p>
              </div>
            </div>

            <!-- Description -->
            <div class="about-description">
              <p>{{ (dataService.personalInfo$ | async)?.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  readonly Award = Award;
  readonly Users = Users;

  stats = [
    {
      icon: this.Award,
      title: 'Experience',
      description: '2+ Years Frontend Development',
    },
    {
      icon: this.Users,
      title: 'Education',
      description: 'B.Sc. Computer Science',
    },
  ];

  constructor(public dataService: DataService) {}
}