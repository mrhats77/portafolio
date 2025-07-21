import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useData } from '../context/DataContext';
import '../styles/projects.css';

const Projects: React.FC = () => {
  const { projects } = useData();

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <p className="projects-subtitle">Browse My Recent</p>
          <h2 className="projects-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
            >
              {/* Project Image */}
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-description">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="project-tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  <a
                    href={project.githubUrl}
                    className="project-btn project-btn-secondary"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Github
                  </a>
                  <a
                    href={project.liveUrl}
                    className="project-btn project-btn-primary"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;