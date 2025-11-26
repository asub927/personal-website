import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Work = lazy(() => import('./pages/Work'))
const Writing = lazy(() => import('./pages/Writing'))
const Contact = lazy(() => import('./pages/Contact'))

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
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navigation currentPath={location.pathname} />
      <main id="main-content" className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]" role="status" aria-live="polite">
            <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin" aria-hidden="true"></div>
            <span className="sr-only">Loading page content...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer socialLinks={socialLinks} navigationLinks={navigationLinks} />
    </div>
  )
}

export default App
