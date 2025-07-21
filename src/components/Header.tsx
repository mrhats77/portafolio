import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import '../styles/header.css';

const Header: React.FC = () => {
  const { personalInfo } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="header">
      <nav className="header-nav">
        {/* Desktop Navigation */}
        <div className="header-desktop">
          <div className="header-logo">
            {personalInfo.name}
          </div>
          <div>
            <ul className="header-nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                key={item.href}
                href={item.href}
                className="header-nav-link"
              >
                {item.label}
              </a>
              </li>
            ))}
            </ul>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="header-mobile">
          <div className="header-mobile-logo">
            {personalInfo.name}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="header-menu-button"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="header-mobile-menu">
            <ul className="header-mobile-nav">
              {navItems.map((item) => (
                <li key={item.href} className="header-mobile-nav-item">
                  <a
                  key={item.href}
                  href={item.href}
                  className="header-mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;