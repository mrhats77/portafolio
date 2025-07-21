import { Injectable, signal } from '@angular/core';
import { Project, Experience, Skill, ContactMessage } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private projects = signal<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution built with Angular 20 and Node.js',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
      imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      githubUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      technologies: ['Angular', 'Firebase', 'RxJS', 'Angular Material'],
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      githubUrl: 'https://github.com/example/task-manager',
      liveUrl: 'https://taskmanager-demo.com',
      featured: true
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts',
      technologies: ['Angular', 'OpenWeather API', 'Chart.js', 'PWA'],
      imageUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      githubUrl: 'https://github.com/example/weather-dashboard',
      featured: false
    }
  ]);

  private experiences = signal<Experience[]>([
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      description: 'Led the development of multiple Angular applications, mentored junior developers, and implemented best practices for code quality and performance.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Jest']
    },
    {
      id: '2',
      company: 'Digital Agency Co.',
      position: 'Full Stack Developer',
      startDate: '2020-06',
      endDate: '2021-12',
      description: 'Developed and maintained web applications using Angular and Node.js, collaborated with design teams to implement responsive UI/UX.',
      technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'AWS']
    }
  ]);

  private skills = signal<Skill[]>([
    { id: '1', name: 'Angular', level: 95, category: 'frontend' },
    { id: '2', name: 'TypeScript', level: 90, category: 'frontend' },
    { id: '3', name: 'RxJS', level: 85, category: 'frontend' },
    { id: '4', name: 'Node.js', level: 80, category: 'backend' },
    { id: '5', name: 'MongoDB', level: 75, category: 'backend' },
    { id: '6', name: 'Git', level: 90, category: 'tools' },
    { id: '7', name: 'Docker', level: 70, category: 'tools' }
  ]);

  private messages = signal<ContactMessage[]>([]);

  // Getters
  getProjects = () => this.projects.asReadonly();
  getExperiences = () => this.experiences.asReadonly();
  getSkills = () => this.skills.asReadonly();
  getMessages = () => this.messages.asReadonly();

  // Methods
  addProject(project: Omit<Project, 'id'>) {
    const newProject = { ...project, id: Date.now().toString() };
    this.projects.update(projects => [...projects, newProject]);
  }

  updateProject(id: string, updates: Partial<Project>) {
    this.projects.update(projects =>
      projects.map(project => project.id === id ? { ...project, ...updates } : project)
    );
  }

  deleteProject(id: string) {
    this.projects.update(projects => projects.filter(project => project.id !== id));
  }

  addMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    this.messages.update(messages => [...messages, newMessage]);
  }

  markMessageAsRead(id: string) {
    this.messages.update(messages =>
      messages.map(message => message.id === id ? { ...message, read: true } : message)
    );
  }
}