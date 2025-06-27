import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface FloatingBookButtonProps {
  isModalOpen?: boolean;
}

const FloatingBookButton: React.FC<FloatingBookButtonProps> = ({ isModalOpen = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button when user scrolls down 100px
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Hide button if not visible or if modal is open on mobile
  if (!isVisible || isModalOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://fareharbor.com/embeds/book/belcrossmarinetours/?full-items=yes&flow=1427653"
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 font-semibold"
      >
        <Calendar className="h-5 w-5" />
        <span>Book Now!</span>
      </a>
    </div>
  );
};

export default FloatingBookButton; 