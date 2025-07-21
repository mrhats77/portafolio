import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, LogOut, User, Briefcase, Code, Mail, Home, Settings, BarChart3 } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="admin-layout">
      <!-- Header -->
      <header class="admin-header">
        <div class="admin-header-container">
          <div class="admin-header-content">
            <div class="admin-header-brand">
              <lucide-icon [img]="Settings"></lucide-icon>
              <h1 class="admin-header-title">Portfolio Admin</h1>
            </div>
            <div class="admin-header-actions">
              <a routerLink="/" class="admin-header-link">
                <lucide-icon [img]="Home"></lucide-icon>
                View Site
              </a>
              <div class="admin-header-user">
                <lucide-icon [img]="User"></lucide-icon>
                {{ (authService.user$ | async)?.name }}
              </div>
              <button (click)="logout()" class="admin-logout-btn">
                <lucide-icon [img]="LogOut"></lucide-icon>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="admin-main">
        <div class="admin-content">
          <!-- Sidebar -->
          <div class="admin-sidebar">
            <nav class="admin-sidebar-nav">
              <ul>
                <li *ngFor="let tab of tabs">
                  <button
                    (click)="setActiveTab(tab.id)"
                    [class]="'admin-nav-button ' + (activeTab === tab.id ? 'active' : '')"
                  >
                    <lucide-icon [img]="tab.icon"></lucide-icon>
                    <span>{{ tab.label }}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Main Content -->
          <div class="admin-main-content">
            <div class="admin-content-card">
              <div class="space-y-6">
                <h2 class="admin-section-title">Dashboard Overview</h2>
                <div class="admin-overview-stats">
                  <div class="admin-stat-card blue">
                    <div class="admin-stat-content">
                      <lucide-icon [img]="User" class="admin-stat-icon"></lucide-icon>
                      <div>
                        <p class="admin-stat-label">Profile</p>
                        <p class="admin-stat-value">Active</p>
                      </div>
                    </div>
                  </div>
                  <div class="admin-stat-card green">
                    <div class="admin-stat-content">
                      <lucide-icon [img]="Briefcase" class="admin-stat-icon"></lucide-icon>
                      <div>
                        <p class="admin-stat-label">Projects</p>
                        <p class="admin-stat-value">3</p>
                      </div>
                    </div>
                  </div>
                  <div class="admin-stat-card purple">
                    <div class="admin-stat-content">
                      <lucide-icon [img]="Code" class="admin-stat-icon"></lucide-icon>
                      <div>
                        <p class="admin-stat-label">Skills</p>
                        <p class="admin-stat-value">12</p>
                      </div>
                    </div>
                  </div>
                  <div class="admin-stat-card orange">
                    <div class="admin-stat-content">
                      <lucide-icon [img]="Mail" class="admin-stat-icon"></lucide-icon>
                      <div>
                        <p class="admin-stat-label">Contact</p>
                        <p class="admin-stat-value">Ready</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="admin-quick-actions">
                  <h3>Quick Actions</h3>
                  <div class="admin-actions-grid">
                    <button (click)="setActiveTab('personal')" class="admin-action-button">
                      <lucide-icon [img]="User" class="admin-action-icon blue"></lucide-icon>
                      <div>
                        <p class="admin-action-title">Update Profile</p>
                        <p class="admin-action-description">Edit personal information and bio</p>
                      </div>
                    </button>
                    <button (click)="setActiveTab('projects')" class="admin-action-button">
                      <lucide-icon [img]="Briefcase" class="admin-action-icon green"></lucide-icon>
                      <div>
                        <p class="admin-action-title">Manage Projects</p>
                        <p class="admin-action-description">Add, edit, or remove projects</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  readonly LogOut = LogOut;
  readonly User = User;
  readonly Briefcase = Briefcase;
  readonly Code = Code;
  readonly Mail = Mail;
  readonly Home = Home;
  readonly Settings = Settings;
  readonly BarChart3 = BarChart3;

  activeTab: string = 'overview';

  tabs = [
    { id: 'overview', label: 'Overview', icon: this.BarChart3 },
    { id: 'personal', label: 'Personal Info', icon: this.User },
    { id: 'projects', label: 'Projects', icon: this.Briefcase },
    { id: 'skills', label: 'Skills', icon: this.Code },
    { id: 'contact', label: 'Contact', icon: this.Mail },
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}