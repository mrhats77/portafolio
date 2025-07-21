import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  Home,
  Settings,
  BarChart3
} from 'lucide-react';
import PersonalInfoEditor from './PersonalInfoEditor';
import ProjectsEditor from './ProjectsEditor';
import SkillsEditor from './SkillsEditor';
import ContactEditor from './ContactEditor';
import '../../styles/admin.css';

type TabType = 'overview' | 'personal' | 'projects' | 'skills' | 'contact';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'personal' as TabType, label: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { id: 'projects' as TabType, label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'skills' as TabType, label: 'Skills', icon: <Code className="w-5 h-5" /> },
    { id: 'contact' as TabType, label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="admin-section-title">Dashboard Overview</h2>
            <div className="admin-overview-stats">
              <div className="admin-stat-card blue">
                <div className="admin-stat-content">
                  <User className="admin-stat-icon" />
                  <div>
                    <p className="admin-stat-label">Profile</p>
                    <p className="admin-stat-value">Active</p>
                  </div>
                </div>
              </div>
              <div className="admin-stat-card green">
                <div className="admin-stat-content">
                  <Briefcase className="admin-stat-icon" />
                  <div>
                    <p className="admin-stat-label">Projects</p>
                    <p className="admin-stat-value">3</p>
                  </div>
                </div>
              </div>
              <div className="admin-stat-card purple">
                <div className="admin-stat-content">
                  <Code className="admin-stat-icon" />
                  <div>
                    <p className="admin-stat-label">Skills</p>
                    <p className="admin-stat-value">12</p>
                  </div>
                </div>
              </div>
              <div className="admin-stat-card orange">
                <div className="admin-stat-content">
                  <Mail className="admin-stat-icon" />
                  <div>
                    <p className="admin-stat-label">Contact</p>
                    <p className="admin-stat-value">Ready</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-quick-actions">
              <h3>Quick Actions</h3>
              <div className="admin-actions-grid">
                <button
                  onClick={() => setActiveTab('personal')}
                  className="admin-action-button"
                >
                  <User className="admin-action-icon blue" />
                  <div>
                    <p className="admin-action-title">Update Profile</p>
                    <p className="admin-action-description">Edit personal information and bio</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="admin-action-button"
                >
                  <Briefcase className="admin-action-icon green" />
                  <div>
                    <p className="admin-action-title">Manage Projects</p>
                    <p className="admin-action-description">Add, edit, or remove projects</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      case 'personal':
        return <PersonalInfoEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'contact':
        return <ContactEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-header-content">
            <div className="admin-header-brand">
              <Settings />
              <h1 className="admin-header-title">Portfolio Admin</h1>
            </div>
            <div className="admin-header-actions">
              <a
                href="/"
                className="admin-header-link"
              >
                <Home />
                View Site
              </a>
              <div className="admin-header-user">
                <User />
                {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="admin-logout-btn"
              >
                <LogOut />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-main">
        <div className="admin-content">
          {/* Sidebar */}
          <div className="admin-sidebar">
            <nav className="admin-sidebar-nav">
              <ul>
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`admin-nav-button ${
                        activeTab === tab.id
                          ? 'active'
                          : ''
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="admin-main-content">
            <div className="admin-content-card">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;