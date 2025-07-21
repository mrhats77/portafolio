import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import '../styles/experience.css';

const Experience: React.FC = () => {
  const { frontendSkills, backendSkills } = useData();

  const SkillCard: React.FC<{ title: string; skills: { name: string; level: string }[] }> = ({
    title,
    skills,
  }) => (
    <div className="experience-card">
      <h3 className="experience-card-title">
        {title}
      </h3>
      <div className="experience-skills">
        {skills.map((skill, index) => (
          <div key={index} className="experience-skill">
            <div className="experience-skill-icon">
              <CheckCircle />
            </div>
            <div className="experience-skill-info">
              <p className="experience-skill-name">{skill.name}</p>
              <p className="experience-skill-level">{skill.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="experience-header">
          <p className="experience-subtitle">Explore My</p>
          <h2 className="experience-title">Experience</h2>
        </div>

        <div className="experience-content">
          <SkillCard title="Frontend Development" skills={frontendSkills} />
          <SkillCard title="Backend Development" skills={backendSkills} />
        </div>
      </div>
    </section>
  );
};

export default Experience;