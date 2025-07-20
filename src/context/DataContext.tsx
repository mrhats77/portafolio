import React, { createContext, useContext, useState } from 'react';
import { Project, Skill, ContactInfo, PersonalInfo } from '../types';

interface DataContextType {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: PersonalInfo) => void;
  projects: Project[];
  updateProjects: (projects: Project[]) => void;
  frontendSkills: Skill[];
  backendSkills: Skill[];
  updateSkills: (frontend: Skill[], backend: Skill[]) => void;
  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => void;
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
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [frontendSkills, setFrontendSkills] = useState<Skill[]>(initialFrontendSkills);
  const [backendSkills, setBackendSkills] = useState<Skill[]>(initialBackendSkills);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
  };

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const updateSkills = (frontend: Skill[], backend: Skill[]) => {
    setFrontendSkills(frontend);
    setBackendSkills(backend);
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
  };

  const value = {
    personalInfo,
    updatePersonalInfo,
    projects,
    updateProjects,
    frontendSkills,
    backendSkills,
    updateSkills,
    contactInfo,
    updateContactInfo,
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