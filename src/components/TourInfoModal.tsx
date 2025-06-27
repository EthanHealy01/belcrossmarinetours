import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Clock, Eye } from 'lucide-react';

interface TourInfo {
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  images: string[];
  bookingUrl: string;
}

interface TourInfoModalProps {
  tour: TourInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

const TourInfoModal: React.FC<TourInfoModalProps> = ({ tour, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !tour) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % Math.min(tour.images.length, 3));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + Math.min(tour.images.length, 3)) % Math.min(tour.images.length, 3));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get only the first 3 images for the carousel
  const carouselImages = tour.images.slice(0, 3);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
            <p className="text-gray-600">{tour.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Image Carousel */}
        <div className="relative h-80 overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out h-full"
            style={{ 
              transform: `translateX(-${currentImageIndex * 100}%)`,
              touchAction: 'pan-y pinch-zoom',
              overscrollBehaviorX: 'contain',
              WebkitOverflowScrolling: 'touch'
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
                          {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('${image}')`,
                    minWidth: '100%'
                  }}
                />
              ))}
          </div>
          
          {/* Navigation buttons */}
          {carouselImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          
          {/* Dots indicator */}
          {carouselImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tour Details */}
          <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{tour.duration}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About This Tour</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{tour.description}</p>
            <p className="text-gray-700 leading-relaxed">{tour.fullDescription}</p>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
            <ul className="space-y-3">
              {tour.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 mt-0.5 text-teal-600 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl font-bold text-blue-700">€60</div>
                  <div className="text-xs text-gray-400">+ booking fee</div>
                </div>
                <div className="text-sm text-gray-600">Adult</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl font-bold text-blue-700">€40</div>
                  <div className="text-xs text-gray-400">+ booking fee</div>
                </div>
                <div className="text-sm text-gray-600">Child (Under 16)</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl font-bold text-blue-700">€50</div>
                  <div className="text-xs text-gray-400">+ booking fee</div>
                </div>
                <div className="text-sm text-gray-600">Student</div>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="text-center">
            <a 
              href={tour.bookingUrl}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-block"
            >
              Book This Tour Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourInfoModal; 