import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Writing from './pages/Writing'
import Contact from './pages/Contact'

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
