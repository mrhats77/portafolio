import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle } from 'lucide-angular';
import { DataService } from '../../services/data.service';
import { Skill } from '../../models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="experience" class="experience">
      <div class="experience-container">
        <div class="experience-header">
          <p class="experience-subtitle">Explore My</p>
          <h2 class="experience-title">Experience</h2>
        </div>

        <div class="experience-content">
          <app-skill-card 
            title="Frontend Development" 
            [skills]="dataService.frontendSkills$ | async">
          </app-skill-card>
          <app-skill-card 
            title="Backend Development" 
            [skills]="dataService.backendSkills$ | async">
          </app-skill-card>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  constructor(public dataService: DataService) {}
}

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="experience-card">
      <h3 class="experience-card-title">
        {{ title }}
      </h3>
      <div class="experience-skills">
        <div *ngFor="let skill of skills" class="experience-skill">
          <div class="experience-skill-icon">
            <lucide-icon [img]="CheckCircle"></lucide-icon>
          </div>
          <div class="experience-skill-info">
            <p class="experience-skill-name">{{ skill.name }}</p>
            <p class="experience-skill-level">{{ skill.level }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SkillCardComponent {
  readonly CheckCircle = CheckCircle;
  
  title!: string;
  skills: Skill[] = [];
}