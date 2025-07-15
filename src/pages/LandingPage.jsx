import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Users, BookOpen, Trophy, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel images data
  const carouselImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
      title: 'Modern University Campus',
      description: 'State-of-the-art facilities for learning and research'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&h=400&fit=crop',
      title: 'Digital Learning Environment',
      description: 'Advanced technology integrated into every classroom'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
      title: 'Student Community',
      description: 'Vibrant campus life and collaborative learning spaces'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop',
      title: 'Academic Excellence',
      description: 'Pursuing knowledge and innovation across all disciplines'
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const levels = [
    {
      id: '1',
      title: '100 Level',
      description: 'First year students - Foundation courses and orientation',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      students: '2,500+ students'
    },
    {
      id: '2',
      title: '200 Level',
      description: 'Second year students - Core curriculum development',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      students: '2,200+ students'
    },
    {
      id: '3',
      title: '300 Level',
      description: 'Third year students - Specialized field studies',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      students: '2,000+ students'
    },
    {
      id: '4',
      title: '400 Level',
      description: 'Fourth year students - Advanced coursework & projects',
      icon: Trophy,
      color: 'from-pink-500 to-pink-600',
      students: '1,800+ students'
    },
    {
      id: '5',
      title: '500 Level',
      description: 'Fifth year students - Professional training & thesis',
      icon: Star,
      color: 'from-red-500 to-red-600',
      students: '1,500+ students'
    },
    {
      id: '6',
      title: 'Postgraduate Level',
      description: 'Masters & PhD students - Research and advanced studies',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      students: '800+ students'
    }
  ]

  const handleLevelSelect = (level) => {
    navigate(`/notices/${level}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <GraduationCap className="w-20 h-20 mx-auto mb-6 text-blue-200" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              University Notice Board
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Stay updated with the latest announcements, events, and important notices for your academic level
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block mb-12">
              <p className="text-lg font-medium">
                Select your academic level to view relevant notices
              </p>
            </div>

            {/* Image Carousel */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                {/* Carousel Images */}
                {carouselImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{image.title}</h3>
                      <p className="text-sm md:text-base opacity-90">{image.description}</p>
                    </div>
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Selection Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Academic Level
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on your academic level to access notices, announcements, and important updates specifically tailored for your year of study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {levels.map((level) => {
            const IconComponent = level.icon
            return (
              <div
                key={level.id}
                className={`card-hover cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${
                  hoveredCard === level.id ? 'ring-4 ring-navy-200' : ''
                }`}
                onMouseEnter={() => setHoveredCard(level.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleLevelSelect(level.id)}
              >
                <div className={`bg-gradient-to-r ${level.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-12 h-12" />
                    <ArrowRight className={`w-6 h-6 transition-transform duration-200 ${
                      hoveredCard === level.id ? 'translate-x-1' : ''
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                  <p className="text-sm opacity-90">{level.students}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {level.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy-600">
                      View Notices
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center transition-colors duration-200 ${
                      hoveredCard === level.id ? 'bg-navy-200' : ''
                    }`}>
                      <ArrowRight className="w-4 h-4 text-navy-600" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Features & Benefits
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to stay informed about your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Level-Specific Content</h3>
              <p className="text-gray-600">Get notices and announcements relevant to your academic level only</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Filtering</h3>
              <p className="text-gray-600">Filter notices by date range, day, week, or month for better organization</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">Stay up-to-date with the latest announcements and important notices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-950 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">
            © 2025 University Notice Board. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
