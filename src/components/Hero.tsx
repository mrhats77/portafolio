import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { personalInfo, contactInfo } = useData();

  return (
    <section id="profile" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:space-x-12">
          {/* Profile Image */}
          <div className="flex-shrink-0 mb-8 lg:mb-0">
            <div className="w-80 h-80 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-lg text-gray-600 mb-2">Hello, I'm</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8">
              {personalInfo.title}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Mail className="w-5 h-5 mr-2" />
                Contact Info
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <a
                href="#"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 hover:text-blue-600"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 hover:text-blue-600"
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