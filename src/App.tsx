import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Gallery from './components/Gallery';
import FloatingBookButton from './components/FloatingBookButton';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'gallery') {
      setCurrentPage('gallery');
      setIsMenuOpen(false);
      return;
    }
    
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Global Navigation */}
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        currentPage={currentPage}
        scrollToSection={scrollToSection}
      />

      {/* Conditional Page Content */}
      {currentPage === 'gallery' ? (
        <Gallery onBack={() => setCurrentPage('home')} />
      ) : (
        <HomePage
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          scrollToSection={scrollToSection}
          onModalStateChange={setIsModalOpen}
        />
      )}

      {/* Floating Book Button */}
      <FloatingBookButton isModalOpen={isModalOpen} />
    </div>
  );
}

export default App;