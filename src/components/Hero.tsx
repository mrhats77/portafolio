import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useData } from '../context/DataContext';
import '../styles/hero.css';

const Hero: React.FC = () => {
  const { personalInfo, contactInfo } = useData();

  return (
    <section id="profile" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          {/* Profile Image */}
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <div className="hero-image-inner">
                <img
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="hero-image"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">
              {personalInfo.name}
            </h1>
            <p className="hero-title">
              {personalInfo.title}
            </p>
            
            {/* Buttons */}
            <div className="hero-buttons">
              <a href="#" className="hero-btn hero-btn-secondary">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </a>
              <a href="#contact" className="hero-btn hero-btn-primary">
                <Mail className="w-5 h-5 mr-2" />
                Contact Info
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-socials">
              <a
                href="#"
                className="hero-social-link"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hero-social-link"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;