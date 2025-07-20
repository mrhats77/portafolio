import React from 'react';
import { Award, Users, Coffee } from 'lucide-react';
import { useData } from '../context/DataContext';

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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-600 mb-2">Get To Know More</p>
          <h2 className="text-4xl font-bold text-gray-900">About Me</h2>
        </div>

        <div className="lg:flex lg:items-center lg:space-x-12">
          {/* Image */}
          <div className="flex-shrink-0 mb-12 lg:mb-0">
            <div className="w-80 h-96 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={personalInfo.aboutImage}
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600">{stat.description}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-lg text-gray-700">
              <p>{personalInfo.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;