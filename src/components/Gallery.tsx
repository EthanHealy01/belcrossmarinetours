import React, { useState } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  onBack: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Actual images from your public/static/images folder
  const galleryImages = [
    { src: '/static/images/optimized_erriscoastline-20.png', title: 'Erris Coastline View 20' },
    { src: '/static/images/optimized_erriscoastline-13.png', title: 'Erris Coastline View 13' },
    { src: '/static/images/optimized_erriscoastline-10.png', title: 'Erris Coastline View 10' },
    { src: '/static/images/optimized_erriscoastline-8.png', title: 'Erris Coastline View 8' },
    { src: '/static/images/optimized_erriscoastline-4.png', title: 'Erris Coastline View 4' },
    { src: '/static/images/optimized_broadhavenbaycoast-77.png', title: 'Broadhaven Bay Coast 77' },
    { src: '/static/images/optimized_broadhavenbaycoast-70.png', title: 'Broadhaven Bay Coast 70' },
    { src: '/static/images/optimized_broadhavenbaycoast-66.png', title: 'Broadhaven Bay Coast 66' },
    { src: '/static/images/optimized_broadhavenbaycoast-64.png', title: 'Broadhaven Bay Coast 64' },
    { src: '/static/images/optimized_broadhavenbaycoast-61.png', title: 'Broadhaven Bay Coast 61' },
    { src: '/static/images/optimized_broadhavenbaycoast-58.png', title: 'Broadhaven Bay Coast 58' },
    { src: '/static/images/optimized_broadhavenbaycoast-51.png', title: 'Broadhaven Bay Coast 51' },
    { src: '/static/images/optimized_broadhavenbaycoast-50.png', title: 'Broadhaven Bay Coast 50' },
    { src: '/static/images/optimized_broadhavenbaycoast-48.png', title: 'Broadhaven Bay Coast 48' },
    { src: '/static/images/optimized_broadhavenbaycoast-43.png', title: 'Broadhaven Bay Coast 43' },
    { src: '/static/images/optimized_broadhavenbaycoast-42.png', title: 'Broadhaven Bay Coast 42' },
    { src: '/static/images/optimized_broadhavenbaycoast-27.png', title: 'Broadhaven Bay Coast 27' },
    { src: '/static/images/optimized_broadhavenbaycoast-26.png', title: 'Broadhaven Bay Coast 26' },
    { src: '/static/images/optimized_broadhavenbaycoast-21.png', title: 'Broadhaven Bay Coast 21' },
    { src: '/static/images/optimized_broadhavenbaycoast-19.png', title: 'Broadhaven Bay Coast 19' },
    { src: '/static/images/optimized_broadhavenbaycoast-7.png', title: 'Broadhaven Bay Coast 7' },
    { src: '/static/images/optimized_broadhavenbaycoast-6.png', title: 'Broadhaven Bay Coast 6' },
    { src: '/static/images/optimized_broadhavenbaycoast-4.png', title: 'Broadhaven Bay Coast 4' },
    { src: '/static/images/optimized_broadhavenbaycoast-3.png', title: 'Broadhaven Bay Coast 3' },
    { src: '/static/images/optimized_broadhavenbaycoast-1.png', title: 'Broadhaven Bay Coast 1' },
  ];

  const openFullScreen = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeFullScreen = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeFullScreen();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the breathtaking beauty of Ireland's Wild Atlantic Coast through our collection of stunning photographs
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => openFullScreen(index)}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-64 sm:h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to the first image in our static images list
                  const target = e.target as HTMLImageElement;
                  if (target.src !== galleryImages[0].src) {
                    target.src = galleryImages[0].src;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeFullScreen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Image */}
          <div className="max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            <img
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Image Title */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <h3 className="text-lg font-semibold">{galleryImages[selectedImageIndex].title}</h3>
            <p className="text-sm text-gray-300 mt-1">
              {selectedImageIndex + 1} of {galleryImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Own Memories?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us on an unforgettable journey along Ireland's most spectacular coastline
          </p>
          <button
            onClick={onBack}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book Your Adventure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;