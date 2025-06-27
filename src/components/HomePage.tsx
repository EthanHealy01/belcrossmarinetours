import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Users, 
  Phone, 
  Globe, 
  Camera, 
  Eye, 
  Heart,
  ChevronDown,
  Star,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  Anchor
} from 'lucide-react';
import { stagsImages, errisImages } from '../data/tours';
import TourInfoModal from './TourInfoModal';

interface HomePageProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string) => void;
  onModalStateChange?: (isOpen: boolean) => void;
}



const HomePage: React.FC<HomePageProps> = ({ setActiveSection, scrollToSection, onModalStateChange }) => {
  // Tour carousel states
  const [stagsCarouselIndex, setStagsCarouselIndex] = useState(0);
  const [errisCarouselIndex, setErrisCarouselIndex] = useState(0);
  
  // Tour data for the modal
  const tourData = {
    stags: {
      title: 'The Stags & Cliffs',
      subtitle: 'Coastal Boat Tour',
      duration: '2.5-3 hours',
      location: 'Ballyglass Pier',
      description: 'Set off on an unforgettable journey along one of Ireland\'s most spectacular coastlines.',
      fullDescription: 'Cruise through Broadhaven Bay and witness the dramatic Stags of Broadhaven Bay - jagged sea stacks rising dramatically from the ocean like ancient sentinels. Leaving from the peaceful harbour of Ballyglass, we\'ll cruise through Broadhaven Bay and head north, where the wild Atlantic meets sheer cliffs, remote islands, and dramatic sea stacks.',
      highlights: [
        'Kid Island with stunning coastal backdrop',
        'Hidden caves and blowholes accessible only by sea',
        'Incredible cliffs of Inver and Portacloy',
        'Wildlife spotting: dolphins, seals, and puffins'
      ],
      images: stagsImages,
      bookingUrl: 'https://fareharbor.com/embeds/book/belcrossmarinetours/items/645292/?full-items=yes&flow=1427653'
    },
    erris: {
      title: 'Erris Head',
      subtitle: 'Coastal Boat Tour',
      duration: '2.5-3 hours',
      location: 'Ballyglass Pier',
      description: 'Explore one of the most remote and awe-inspiring stretches of Ireland\'s Atlantic coastline.',
      fullDescription: 'Journey to the iconic Erris Head where few boats venture, offering you a front-row seat to one of Mayo\'s most breathtaking natural landmarks. Get ready to explore one of the most remote and awe-inspiring stretches of Ireland\'s Atlantic coastline.',
      highlights: [
        'Spectacular Erris Head with towering sheer cliffs',
        'Hidden coves and dramatic rock formations',
        'Sea caves and blowholes shaped by centuries',
        'Rich wildlife: puffins, guillemots, seals, dolphins'
      ],
      images: errisImages,
      bookingUrl: 'https://fareharbor.com/embeds/book/belcrossmarinetours/items/645293/?full-items=yes&flow=1427653'
    }
  };

  // Modal states
  const [selectedTour, setSelectedTour] = useState<typeof tourData.stags | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTourModal = (tourKey: 'stags' | 'erris') => {
    setSelectedTour(tourData[tourKey]);
    setIsModalOpen(true);
    onModalStateChange?.(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onModalStateChange?.(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'tours', 'pricing', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const nextImage = (tourType: 'stags' | 'erris') => {
    if (tourType === 'stags') {
      setStagsCarouselIndex((prev) => (prev + 1) % stagsImages.length);
    } else {
      setErrisCarouselIndex((prev) => (prev + 1) % errisImages.length);
    }
  };

  const prevImage = (tourType: 'stags' | 'erris') => {
    if (tourType === 'stags') {
      setStagsCarouselIndex((prev) => (prev - 1 + stagsImages.length) % stagsImages.length);
    } else {
      setErrisCarouselIndex((prev) => (prev - 1 + errisImages.length) % errisImages.length);
    }
  };

  const ImageCarousel = ({ images, currentIndex, onNext, onPrev, showArrows = true }: {
    images: string[];
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
    showArrows?: boolean;
  }) => (
    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
      <div 
        className="flex transition-transform duration-300 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>
      
      {/* Navigation buttons - only show if showArrows is true */}
      {showArrows && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      
      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800">
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://belcrossmarinetours.s3.eu-north-1.amazonaws.com/Promo.mp4" type="video/mp4" />
          {/* Fallback image in case video doesn't load */}
          <img 
            src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Belcross Marine Tours - Ireland's Wild Atlantic Coast"
            className="w-full h-full object-cover"
          />
        </video>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Ireland's
            <span className="block text-teal-300">Wild Atlantic Coast</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Experience the raw beauty of Mayo's coastline with professional guided boat tours 
            from Ballyglass Pier, Belmullet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('tours')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Our Tours
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
        <button 
          onClick={() => scrollToSection('tours')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2"
          aria-label="Scroll to Tours section"
        >
          <ChevronDown className="h-8 w-8 text-white/70 hover:text-white transition-colors duration-300" />
        </button>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Coastal Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our expertly guided tours along Ireland's most spectacular and untouched coastlines
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            {/* Stags & Cliffs Tour */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <ImageCarousel
                  images={stagsImages}
                  currentIndex={stagsCarouselIndex}
                  onNext={() => nextImage('stags')}
                  onPrev={() => prevImage('stags')}
                  showArrows={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white">The Stags & Cliffs</h3>
                    <p className="text-white/90 text-sm md:text-base">Coastal Boat Tour</p>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Ballyglass Pier</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>2.5-3 hours</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  Set off on an unforgettable journey along one of Ireland's most spectacular coastlines...
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => openTourModal('stags')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 md:px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-sm md:text-base"
                  >
                    More Info
                  </button>
                  <a
                    href="https://fareharbor.com/embeds/book/belcrossmarinetours/items/645292/?full-items=yes&flow=1427653"
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 md:px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-sm md:text-base text-center"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            {/* Erris Head Tour */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <ImageCarousel
                  images={errisImages}
                  currentIndex={errisCarouselIndex}
                  onNext={() => nextImage('erris')}
                  onPrev={() => prevImage('erris')}
                  showArrows={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white">Erris Head</h3>
                    <p className="text-white/90 text-sm md:text-base">Coastal Boat Tour</p>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Ballyglass Pier</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>2.5-3 hours</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  Explore one of the most remote and awe-inspiring stretches of Ireland's Atlantic coastline...
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => openTourModal('erris')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 md:px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-sm md:text-base"
                  >
                    More Info
                  </button>
                  <a
                    href="https://fareharbor.com/embeds/book/belcrossmarinetours/items/645293/?full-items=yes&flow=1427653"
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 md:px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-sm md:text-base text-center"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Perfect For Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Perfect For</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Eye className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Sightseers & Explorers</h4>
                <p className="text-gray-600 text-sm">Discover hidden coastal gems</p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Wildlife Lovers</h4>
                <p className="text-gray-600 text-sm">Spot dolphins, seals, and seabirds</p>
              </div>
              <div className="text-center">
                <Camera className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Photographers</h4>
                <p className="text-gray-600 text-sm">Capture breathtaking coastal scenes</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Families & Groups</h4>
                <p className="text-gray-600 text-sm">Create unforgettable memories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tour Pricing
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Seasonal availability, weather dependent
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Adult</h3>
                <div className="text-5xl font-bold text-blue-700 mb-4">€60</div>
                <p className="text-gray-600">Per person</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Child</h3>
                <div className="text-5xl font-bold text-blue-700 mb-2">€40</div>
                <p className="text-gray-600 mb-2">Under 16</p>
                <div className="text-green-600 font-semibold">Save €20</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Student</h3>
                <div className="text-5xl font-bold text-blue-700 mb-4">€50</div>
                <p className="text-gray-600">With valid ID</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <a
              href="https://fareharbor.com/embeds/book/belcrossmarinetours/?full-items=yes&flow=1427653"
              className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Book Online Now
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Belcross Enterprises
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on Land and Sea - A proudly family-run company with over 20 years of trusted experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Welcome to Belcross Enterprises Ltd, a proudly family-run company based in Emlybeg South, 
                near Belmullet, County Mayo. Since our founding in 1999, we've grown from a trusted name 
                in construction and civil engineering to a respected provider of marine services and 
                coastal charter tours along Ireland's Wild Atlantic Way.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Drawing on our deep local knowledge of the Atlantic coast, we now offer guided charter 
                tours from Ballyglass Pier, taking passengers along the wild and stunning shores of 
                northwest Mayo. These tours provide a rare, up-close look at Mayo's dramatic coastline.
              </p>
            </div>
            <div 
              className="h-96 bg-cover bg-center rounded-2xl shadow-xl"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop')"
              }}
            ></div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-700" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Construction & Civil Engineering</h4>
              <p className="text-gray-600">
                Over two decades of experience delivering projects with the highest standards 
                of quality and safety in the community we call home.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Anchor className="h-8 w-8 text-teal-700" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Marine Services</h4>
              <p className="text-gray-600">
                Operating since 2001 with a versatile fleet, providing professional marine services 
                including 24/7 operations, emergency response, and offshore support.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-green-700" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Coastal Charter Tours</h4>
              <p className="text-gray-600">
                Expert-guided tours showcasing Mayo's dramatic coastline, perfect for wildlife 
                watchers, photographers, and adventure seekers.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-blue-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <Award className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">20+ Years Experience</h4>
                <p className="text-gray-600 text-sm">Trusted expertise since 1999</p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">Fully Licensed</h4>
                <p className="text-gray-600 text-sm">Safety-compliant vessels</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">Expert Local Crews</h4>
                <p className="text-gray-600 text-sm">Deep coastal knowledge</p>
              </div>
              <div className="text-center">
                <Heart className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">Community Focused</h4>
                <p className="text-gray-600 text-sm">Proud part of Belmullet & Erris</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-gray-300">
              Ready to explore Ireland's wild Atlantic coast? Get in touch with us
            </p>
          </div>

          {/* Contact Information Grid - 2x2 Layout */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* Phone */}
            <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Phone</h4>
              <p className="text-gray-300 text-lg">0858230869</p>
            </div>

            {/* Website */}
            <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Website</h4>
              <p className="text-gray-300 text-lg">www.Belmulletmarinetours.com</p>
            </div>

            {/* Location */}
            <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Location</h4>
              <p className="text-gray-300">
                Belcross Enterprises Ltd<br />
                Emlybeg South, Binghamstown<br />
                Belmullet, Co. Mayo, Ireland
              </p>
            </div>

            {/* Departure Point */}
            <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Anchor className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Departure Point</h4>
              <p className="text-gray-300 text-lg">Ballyglass Pier, Belmullet</p>
            </div>
          </div>
          {/* potential email form that can be set up in future if needed */}
          {/* <div className="bg-gray-800 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-bold mb-6">Contact Form</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white">
                  <option>General Inquiry</option>
                  <option>Tour Booking</option>
                  <option>Group Booking</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent text-white"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Send Message
              </button>
            </div>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/static/images/BM_logo_transparent_dark.svg" 
              alt="Belcross Marine Tours Logo" 
              className="h-8 w-8"
            />
            <span className="text-2xl font-bold">Belcross Marine Tours</span>
          </div>
            <p className="text-gray-400 mb-4">
              Local knowledge, professional service, and a passion for the Atlantic
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Belcross Enterprises Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Tour Info Modal */}
      <TourInfoModal
        tour={selectedTour}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default HomePage; 