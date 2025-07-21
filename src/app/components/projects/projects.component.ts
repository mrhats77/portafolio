import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ExternalLink, Github } from 'lucide-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="projects" class="projects">
      <div class="projects-container">
        <div class="projects-header">
          <p class="projects-subtitle">Browse My Recent</p>
          <h2 class="projects-title">Projects</h2>
        </div>

        <div class="projects-grid">
          <div
            *ngFor="let project of dataService.projects$ | async"
            class="project-card"
          >
            <!-- Project Image -->
            <div class="project-image-container">
              <img
                [src]="project.image"
                [alt]="project.title"
                class="project-image"
              />
            </div>

            <!-- Project Content -->
            <div class="project-content">
              <h3 class="project-title">
                {{ project.title }}
              </h3>
              <p class="project-description">
                {{ project.description }}
              </p>

              <!-- Technologies -->
              <div class="project-technologies">
                <span
                  *ngFor="let tech of project.technologies"
                  class="project-tech-tag"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="project-actions">
                <a
                  [href]="project.githubUrl"
                  class="project-btn project-btn-secondary"
                >
                  <lucide-icon [img]="Github" class="w-4 h-4 mr-2"></lucide-icon>
                  Github
                </a>
                <a
                  [href]="project.liveUrl"
                  class="project-btn project-btn-primary"
                >
                  <lucide-icon [img]="ExternalLink" class="w-4 h-4 mr-2"></lucide-icon>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  readonly ExternalLink = ExternalLink;
  readonly Github = Github;

  constructor(public dataService: DataService) {}
}