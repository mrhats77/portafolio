import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { PersonalInfo, Project, Skill, ContactInfo } from '../models';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private personalInfoSubject = new BehaviorSubject<PersonalInfo>(this.initialPersonalInfo);
  private projectsSubject = new BehaviorSubject<Project[]>(this.initialProjects);
  private frontendSkillsSubject = new BehaviorSubject<Skill[]>(this.initialFrontendSkills);
  private backendSkillsSubject = new BehaviorSubject<Skill[]>(this.initialBackendSkills);
  private contactInfoSubject = new BehaviorSubject<ContactInfo>(this.initialContactInfo);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public personalInfo$ = this.personalInfoSubject.asObservable();
  public projects$ = this.projectsSubject.asObservable();
  public frontendSkills$ = this.frontendSkillsSubject.asObservable();
  public backendSkills$ = this.backendSkillsSubject.asObservable();
  public contactInfo$ = this.contactInfoSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  private get initialPersonalInfo(): PersonalInfo {
    return {
      name: 'John Doe',
      title: 'Frontend Developer',
      bio: 'I am a passionate frontend developer with experience in creating responsive and user-friendly web applications. I enjoy working with modern technologies and frameworks to build engaging digital experiences.',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      aboutImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    };
  }

  private get initialProjects(): Project[] {
    return [
      {
        id: '1',
        title: 'E-Commerce Platform',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'A modern e-commerce platform built with Angular and Node.js featuring user authentication, payment integration, and admin dashboard.',
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: '2',
        title: 'Task Management App',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        technologies: ['Angular', 'TypeScript', 'Firebase', 'CSS3'],
        liveUrl: '#',
        githubUrl: '#',
      },
      {
        id: '3',
        title: 'Weather Dashboard',
        image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful visualizations.',
        technologies: ['Angular', 'Chart.js', 'OpenWeather API', 'CSS3'],
        liveUrl: '#',
        githubUrl: '#',
      },
    ];
  }

  private get initialFrontendSkills(): Skill[] {
    return [
      { name: 'HTML', level: 'Experienced' },
      { name: 'CSS', level: 'Experienced' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Angular', level: 'Intermediate' },
      { name: 'RxJS', level: 'Intermediate' },
    ];
  }

  private get initialBackendSkills(): Skill[] {
    return [
      { name: 'Node.js', level: 'Basic' },
      { name: 'Express.js', level: 'Basic' },
      { name: 'MongoDB', level: 'Basic' },
      { name: 'PostgreSQL', level: 'Basic' },
      { name: 'Git', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Intermediate' },
    ];
  }

  private get initialContactInfo(): ContactInfo {
    return {
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
    };
  }

  fetchAllData(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    // Try to fetch data from API, fallback to demo data if API is not available
    forkJoin({
      personalInfo: this.apiService.getPersonalInfo(),
      projects: this.apiService.getProjects(),
      skills: this.apiService.getSkills(),
      contactInfo: this.apiService.getContactInfo()
    }).subscribe({
      next: (responses) => {
        if (responses.personalInfo.success && responses.personalInfo.data) {
          this.personalInfoSubject.next(responses.personalInfo.data);
        }

        if (responses.projects.success && responses.projects.data) {
          this.projectsSubject.next(responses.projects.data);
        }

        if (responses.skills.success && responses.skills.data) {
          this.frontendSkillsSubject.next(responses.skills.data.frontend || this.initialFrontendSkills);
          this.backendSkillsSubject.next(responses.skills.data.backend || this.initialBackendSkills);
        }

        if (responses.contactInfo.success && responses.contactInfo.data) {
          this.contactInfoSubject.next(responses.contactInfo.data);
        }

        this.loadingSubject.next(false);
      },
      error: (error) => {
        console.log('Backend API not available, using demo data');
        this.loadingSubject.next(false);
      }
    });
  }

  // Getters for current values
  get personalInfo(): PersonalInfo {
    return this.personalInfoSubject.value;
  }

  get projects(): Project[] {
    return this.projectsSubject.value;
  }

  get frontendSkills(): Skill[] {
    return this.frontendSkillsSubject.value;
  }

  get backendSkills(): Skill[] {
    return this.backendSkillsSubject.value;
  }

  get contactInfo(): ContactInfo {
    return this.contactInfoSubject.value;
  }

  // Update methods
  async updatePersonalInfo(info: PersonalInfo): Promise<boolean> {
    const token = this.authService.currentToken;
    if (!token) return false;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const response = await this.apiService.updatePersonalInfo(info, token).toPromise();
      
      if (response?.success) {
        this.personalInfoSubject.next(info);
        return true;
      } else {
        this.errorSubject.next(response?.error || 'Failed to update personal info');
        return false;
      }
    } catch (error) {
      console.error('Error updating personal info:', error);
      this.errorSubject.next('Failed to update personal info');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async addProject(project: Omit<Project, 'id'>): Promise<boolean> {
    const token = this.authService.currentToken;
    if (!token) return false;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const response = await this.apiService.createProject(project, token).toPromise();
      
      if (response?.success && response.data) {
        const currentProjects = this.projectsSubject.value;
        this.projectsSubject.next([...currentProjects, response.data]);
        return true;
      } else {
        this.errorSubject.next(response?.error || 'Failed to create project');
        return false;
      }
    } catch (error) {
      console.error('Error creating project:', error);
      this.errorSubject.next('Failed to create project');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async updateProject(id: string, project: Omit<Project, 'id'>): Promise<boolean> {
    const token = this.authService.currentToken;
    if (!token) return false;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const response = await this.apiService.updateProject(id, project, token).toPromise();
      
      if (response?.success) {
        const currentProjects = this.projectsSubject.value;
        const updatedProjects = currentProjects.map(p => p.id === id ? { ...project, id } : p);
        this.projectsSubject.next(updatedProjects);
        return true;
      } else {
        this.errorSubject.next(response?.error || 'Failed to update project');
        return false;
      }
    } catch (error) {
      console.error('Error updating project:', error);
      this.errorSubject.next('Failed to update project');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    const token = this.authService.currentToken;
    if (!token) return false;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const response = await this.apiService.deleteProject(id, token).toPromise();
      
      if (response?.success) {
        const currentProjects = this.projectsSubject.value;
        const filteredProjects = currentProjects.filter(p => p.id !== id);
        this.projectsSubject.next(filteredProjects);
        return true;
      } else {
        this.errorSubject.next(response?.error || 'Failed to delete project');
        return false;
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      this.errorSubject.next('Failed to delete project');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async updateSkills(frontend: Skill[], backend: Skill[]): Promise<boolean> {
    const token = this.authService.currentToken;
    if (!token) return false;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const response = await this.apiService.updateSkills({ frontend, backend }, token).toPromise();
      
      if (response?.success) {
        this.frontendSkillsSubject.next(frontend);
        this.backendSkillsSubject.next(backend);
        return true;
      } else {
        this.errorSubject.next(response?.error || 'Failed to update skills');
        return false;
      }
    } catch (error) {
      console.error('Error updating skills:', error);
      this.errorSubject.next('Failed to update skills');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async updateContactInfo(info: ContactInfo): Promise<boolean> {
    const token = this.authService.currentToken;
    if (!token) return false;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const response = await this.apiService.updateContactInfo(info, token).toPromise();
      
      if (response?.success) {
        this.contactInfoSubject.next(info);
        return true;
      } else {
        this.errorSubject.next(response?.error || 'Failed to update contact info');
        return false;
      }
    } catch (error) {
      console.error('Error updating contact info:', error);
      this.errorSubject.next('Failed to update contact info');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async submitContactForm(data: { name: string; email: string; message: string }): Promise<boolean> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const response = await this.apiService.submitContactForm(data).toPromise();
      
      if (response?.success) {
        return true;
      } else {
        this.errorSubject.next(response?.error || 'Failed to send message');
        return false;
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.errorSubject.next('Failed to send message');
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }
}