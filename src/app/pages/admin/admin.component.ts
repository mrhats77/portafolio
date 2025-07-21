import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../shared/services/portfolio.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatBadgeModule
  ],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <h1>Portfolio Admin Dashboard</h1>
        <button mat-raised-button routerLink="/" color="primary">
          <mat-icon>home</mat-icon>
          Back to Portfolio
        </button>
      </header>

      <mat-tab-group class="admin-tabs">
        <mat-tab label="Overview">
          <div class="tab-content">
            <div class="stats-grid">
              <mat-card class="stat-card">
                <mat-card-content>
                  <div class="stat-content">
                    <mat-icon class="stat-icon">work</mat-icon>
                    <div>
                      <h3>{{ projects().length }}</h3>
                      <p>Projects</p>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-content>
                  <div class="stat-content">
                    <mat-icon class="stat-icon">business</mat-icon>
                    <div>
                      <h3>{{ experiences().length }}</h3>
                      <p>Experiences</p>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-content>
                  <div class="stat-content">
                    <mat-icon class="stat-icon">build</mat-icon>
                    <div>
                      <h3>{{ skills().length }}</h3>
                      <p>Skills</p>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card class="stat-card">
                <mat-card-content>
                  <div class="stat-content">
                    <mat-icon class="stat-icon" [matBadge]="unreadMessages()" matBadgeColor="warn">mail</mat-icon>
                    <div>
                      <h3>{{ messages().length }}</h3>
                      <p>Messages</p>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Projects">
          <div class="tab-content">
            <div class="section-header">
              <h2>Manage Projects</h2>
              <button mat-raised-button color="primary">
                <mat-icon>add</mat-icon>
                Add Project
              </button>
            </div>
            
            <div class="projects-list">
              @for (project of projects(); track project.id) {
                <mat-card class="project-item">
                  <mat-card-content>
                    <div class="project-info">
                      <h3>{{ project.title }}</h3>
                      <p>{{ project.description }}</p>
                      <div class="project-meta">
                        <span class="featured-badge" *ngIf="project.featured">Featured</span>
                        <span class="tech-count">{{ project.technologies.length }} technologies</span>
                      </div>
                    </div>
                    <div class="project-actions">
                      <button mat-icon-button color="primary">
                        <mat-icon>edit</mat-icon>
                      </button>
                      <button mat-icon-button color="warn">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </mat-card-content>
                </mat-card>
              }
            </div>
          </div>
        </mat-tab>

        <mat-tab [label]="'Messages (' + unreadMessages() + ')'">
          <div class="tab-content">
            <h2>Contact Messages</h2>
            
            @if (messages().length === 0) {
              <mat-card class="empty-state">
                <mat-card-content>
                  <mat-icon>mail_outline</mat-icon>
                  <h3>No messages yet</h3>
                  <p>Messages from your contact form will appear here.</p>
                </mat-card-content>
              </mat-card>
            } @else {
              <div class="messages-list">
                @for (message of messages(); track message.id) {
                  <mat-card class="message-item" [class.unread]="!message.read">
                    <mat-card-content>
                      <div class="message-header">
                        <div class="message-info">
                          <h4>{{ message.subject }}</h4>
                          <p class="message-meta">
                            From: {{ message.name }} ({{ message.email }}) • 
                            {{ formatDate(message.createdAt) }}
                          </p>
                        </div>
                        <div class="message-actions">
                          @if (!message.read) {
                            <button mat-button color="primary" (click)="markAsRead(message.id)">
                              Mark as Read
                            </button>
                          }
                          <button mat-icon-button color="warn">
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>
                      </div>
                      <p class="message-content">{{ message.message }}</p>
                    </mat-card-content>
                  </mat-card>
                }
              </div>
            }
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private portfolioService = inject(PortfolioService);
  
  projects = this.portfolioService.getProjects();
  experiences = this.portfolioService.getExperiences();
  skills = this.portfolioService.getSkills();
  messages = this.portfolioService.getMessages();

  unreadMessages() {
    return this.messages().filter(message => !message.read).length;
  }

  markAsRead(messageId: string) {
    this.portfolioService.markMessageAsRead(messageId);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}