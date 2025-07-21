import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PortfolioService } from '../../shared/services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule],
  template: `
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">About Me</h2>
        
        <div class="about-content">
          <div class="about-text">
            <p>
              I'm a passionate full-stack developer with over 5 years of experience
              creating web applications that solve real-world problems. I specialize
              in Angular, TypeScript, and modern web technologies.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with the
              developer community through blog posts and talks.
            </p>
          </div>
          
          <div class="skills-section">
            <h3>Skills</h3>
            <div class="skills-grid">
              @for (skill of skills(); track skill.id) {
                <mat-card class="skill-card">
                  <mat-card-content>
                    <div class="skill-header">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-percentage">{{ skill.level }}%</span>
                    </div>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="skill.level"
                      [color]="getSkillColor(skill.category)">
                    </mat-progress-bar>
                  </mat-card-content>
                </mat-card>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  private portfolioService = inject(PortfolioService);
  skills = this.portfolioService.getSkills();

  getSkillColor(category: string): 'primary' | 'accent' | 'warn' {
    switch (category) {
      case 'frontend': return 'primary';
      case 'backend': return 'accent';
      default: return 'warn';
    }
  }
}