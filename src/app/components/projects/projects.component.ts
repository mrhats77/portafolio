import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipModule } from '@angular/material/chip';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../shared/services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipModule, MatIconModule],
  template: `
    <section id="projects" class="projects">
      <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        
        <div class="projects-grid">
          @for (project of projects(); track project.id) {
            <mat-card class="project-card" [class.featured]="project.featured">
              <div class="project-image">
                <img [src]="project.imageUrl" [alt]="project.title" />
                <div class="project-overlay">
                  <div class="project-actions">
                    @if (project.liveUrl) {
                      <button mat-fab color="primary" (click)="openLink(project.liveUrl!)">
                        <mat-icon>launch</mat-icon>
                      </button>
                    }
                    @if (project.githubUrl) {
                      <button mat-fab color="accent" (click)="openLink(project.githubUrl!)">
                        <mat-icon>code</mat-icon>
                      </button>
                    }
                  </div>
                </div>
              </div>
              
              <mat-card-content>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                
                <div class="project-technologies">
                  @for (tech of project.technologies; track tech) {
                    <mat-chip>{{ tech }}</mat-chip>
                  }
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  private portfolioService = inject(PortfolioService);
  projects = this.portfolioService.getProjects();

  openLink(url: string) {
    window.open(url, '_blank');
  }
}