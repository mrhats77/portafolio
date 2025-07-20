export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  aboutImage: string;
}