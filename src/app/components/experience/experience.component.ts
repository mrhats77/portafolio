import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../shared/services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipModule, MatIconModule],
  template: `
    <section id="experience" class="experience">
      <div class="container">
        <h2 class="section-title">Experience</h2>
        
        <div class="timeline">
          @for (exp of experiences(); track exp.id) {
            <div class="timeline-item">
              <div class="timeline-marker">
                <mat-icon>work</mat-icon>
              </div>
              <mat-card class="experience-card">
                <mat-card-header>
                  <mat-card-title>{{ exp.position }}</mat-card-title>
                  <mat-card-subtitle>{{ exp.company }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="date-range">
                    {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Present' }}
                  </div>
                  <p class="description">{{ exp.description }}</p>
                  <div class="technologies">
                    @for (tech of exp.technologies; track tech) {
                      <mat-chip>{{ tech }}</mat-chip>
                    }
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  private portfolioService = inject(PortfolioService);
  experiences = this.portfolioService.getExperiences();

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}