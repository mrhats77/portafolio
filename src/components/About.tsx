import React from 'react';
import { Award, Users, Coffee } from 'lucide-react';
import { useData } from '../context/DataContext';
import '../styles/about.css';

const About: React.FC = () => {
  const { personalInfo } = useData();

  const stats = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Experience',
      description: '2+ Years Frontend Development',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Education',
      description: 'B.Sc. Computer Science',
    },
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <p className="about-subtitle">Get To Know More</p>
          <h2 className="about-title">About Me</h2>
        </div>

        <div className="about-content">
          {/* Image */}
          <div className="about-image-container">
            <div className="about-image-wrapper">
              <img
                src={personalInfo.aboutImage}
                alt="About"
                className="about-image"
              />
            </div>
          </div>

          {/* Content */}
          <div className="about-details">
            {/* Stats Cards */}
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="about-stat-card"
                >
                  <div className="about-stat-icon">
                    {stat.icon}
                  </div>
                  <h3 className="about-stat-title">
                    {stat.title}
                  </h3>
                  <p className="about-stat-description">{stat.description}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="about-description">
              <p>{personalInfo.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;