import React, { createContext, useContext, useState } from 'react';
import { personalInfoApi, projectsApi, skillsApi, contactInfoApi } from '../services/api';
import { useAuth } from './AuthContext';
import { Project, Skill, ContactInfo, PersonalInfo } from '../types';

interface DataContextType {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: PersonalInfo) => Promise<boolean>;
  projects: Project[];
  updateProjects: (projects: Project[]) => Promise<boolean>;
  addProject: (project: Omit<Project, 'id'>) => Promise<boolean>;
  updateProject: (id: string, project: Omit<Project, 'id'>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  frontendSkills: Skill[];
  backendSkills: Skill[];
  updateSkills: (frontend: Skill[], backend: Skill[]) => Promise<boolean>;
  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  fetchAllData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialPersonalInfo: PersonalInfo = {
  name: 'John Doe',
  title: 'Frontend Developer',
  bio: 'I am a passionate frontend developer with experience in creating responsive and user-friendly web applications. I enjoy working with modern technologies and frameworks to build engaging digital experiences.',
  profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  aboutImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
};

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A modern e-commerce platform built with React and Node.js featuring user authentication, payment integration, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '2',
    title: 'Task Management App',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful visualizations.',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS3'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const initialFrontendSkills: Skill[] = [
  { name: 'HTML', level: 'Experienced' },
  { name: 'CSS', level: 'Experienced' },
  { name: 'JavaScript', level: 'Intermediate' },
  { name: 'TypeScript', level: 'Intermediate' },
  { name: 'React', level: 'Intermediate' },
  { name: 'Tailwind CSS', level: 'Intermediate' },
];

const initialBackendSkills: Skill[] = [
  { name: 'Node.js', level: 'Basic' },
  { name: 'Express.js', level: 'Basic' },
  { name: 'MongoDB', level: 'Basic' },
  { name: 'PostgreSQL', level: 'Basic' },
  { name: 'Git', level: 'Intermediate' },
  { name: 'REST APIs', level: 'Intermediate' },
];

const initialContactInfo: ContactInfo = {
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [frontendSkills, setFrontendSkills] = useState<Skill[]>(initialFrontendSkills);
  const [backendSkills, setBackendSkills] = useState<Skill[]>(initialBackendSkills);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all data from API
      const [personalResponse, projectsResponse, skillsResponse, contactResponse] = await Promise.all([
        personalInfoApi.get(),
        projectsApi.getAll(),
        skillsApi.getAll(),
        contactInfoApi.get(),
      ]);

      // Update state with fetched data or keep defaults if API fails
      if (personalResponse.success && personalResponse.data) {
        setPersonalInfo(personalResponse.data);
      }

      if (projectsResponse.success && projectsResponse.data) {
        setProjects(projectsResponse.data);
      }

      if (skillsResponse.success && skillsResponse.data) {
        setFrontendSkills(skillsResponse.data.frontend || initialFrontendSkills);
        setBackendSkills(skillsResponse.data.backend || initialBackendSkills);
      }

      if (contactResponse.success && contactResponse.data) {
        setContactInfo(contactResponse.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from server');
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalInfo = async (info: PersonalInfo): Promise<boolean> => {
    if (!token) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await personalInfoApi.update(info, token);
      
      if (response.success) {
        setPersonalInfo(info);
        return true;
      } else {
        setError(response.error || 'Failed to update personal info');
        return false;
      }
    } catch (err) {
      console.error('Error updating personal info:', err);
      setError('Failed to update personal info');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProjects = async (newProjects: Project[]): Promise<boolean> => {
    // This is mainly for bulk updates - individual operations use specific methods
    setProjects(newProjects);
    return true;
  };

  const addProject = async (project: Omit<Project, 'id'>): Promise<boolean> => {
    if (!token) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await projectsApi.create(project, token);
      
      if (response.success && response.data) {
        setProjects(prev => [...prev, response.data]);
        return true;
      } else {
        setError(response.error || 'Failed to create project');
        return false;
      }
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, project: Omit<Project, 'id'>): Promise<boolean> => {
    if (!token) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await projectsApi.update(id, project, token);
      
      if (response.success) {
        setProjects(prev => prev.map(p => p.id === id ? { ...project, id } : p));
        return true;
      } else {
        setError(response.error || 'Failed to update project');
        return false;
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    if (!token) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await projectsApi.delete(id, token);
      
      if (response.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        return true;
      } else {
        setError(response.error || 'Failed to delete project');
        return false;
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateSkills = async (frontend: Skill[], backend: Skill[]): Promise<boolean> => {
    if (!token) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await skillsApi.update({ frontend, backend }, token);
      
      if (response.success) {
        setFrontendSkills(frontend);
        setBackendSkills(backend);
        return true;
      } else {
        setError(response.error || 'Failed to update skills');
        return false;
      }
    } catch (err) {
      console.error('Error updating skills:', err);
      setError('Failed to update skills');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateContactInfo = async (info: ContactInfo): Promise<boolean> => {
    if (!token) return false;

    setLoading(true);
    setError(null);

    try {
      const response = await contactInfoApi.update(info, token);
      
      if (response.success) {
        setContactInfo(info);
        return true;
      } else {
        setError(response.error || 'Failed to update contact info');
        return false;
      }
    } catch (err) {
      console.error('Error updating contact info:', err);
      setError('Failed to update contact info');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    personalInfo,
    updatePersonalInfo,
    projects,
    updateProjects,
    addProject,
    updateProject,
    deleteProject,
    frontendSkills,
    backendSkills,
    updateSkills,
    contactInfo,
    updateContactInfo,
    loading,
    error,
    fetchAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};