import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Placeholder pages
const Home = () => (
  <div className="pt-16 min-h-screen">
    <h1 className="text-4xl font-bold text-center py-8">Home</h1>
    <p className="text-center text-gray-600">Welcome to the portfolio website</p>
  </div>
)

const About = () => (
  <div className="pt-16 min-h-screen">
    <h1 className="text-4xl font-bold text-center py-8">About</h1>
  </div>
)

const Work = () => (
  <div className="pt-16 min-h-screen">
    <h1 className="text-4xl font-bold text-center py-8">Work</h1>
  </div>
)

const Writing = () => (
  <div className="pt-16 min-h-screen">
    <h1 className="text-4xl font-bold text-center py-8">Writing</h1>
  </div>
)

const Contact = () => (
  <div className="pt-16 min-h-screen">
    <h1 className="text-4xl font-bold text-center py-8">Contact</h1>
  </div>
)

function App() {
  const location = useLocation()

  const socialLinks = [
    { platform: 'twitter' as const, url: 'https://twitter.com', icon: 'twitter' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com', icon: 'linkedin' },
    { platform: 'github' as const, url: 'https://github.com', icon: 'github' },
  ]

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Writing', path: '/writing' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPath={location.pathname} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer socialLinks={socialLinks} navigationLinks={navigationLinks} />
    </div>
  )
}

export default App
