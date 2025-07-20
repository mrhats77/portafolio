import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Experience: React.FC = () => {
  const { frontendSkills, backendSkills } = useData();

  const SkillCard: React.FC<{ title: string; skills: { name: string; level: string }[] }> = ({
    title,
    skills,
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">{skill.name}</p>
              <p className="text-sm text-gray-600">{skill.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-600 mb-2">Explore My</p>
          <h2 className="text-4xl font-bold text-gray-900">Experience</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkillCard title="Frontend Development" skills={frontendSkills} />
          <SkillCard title="Backend Development" skills={backendSkills} />
        </div>
      </div>
    </section>
  );
};

export default Experience;