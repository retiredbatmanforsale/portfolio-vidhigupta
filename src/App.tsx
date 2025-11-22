import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Blogs from './components/Blogs';
import BlogPost from './components/BlogPost';
import AdminLogin from './components/AdminLogin';
import BlogAdmin from './components/BlogAdmin';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'blog' | 'admin'>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('blog/')) {
        const slug = hash.replace('blog/', '');
        setSelectedSlug(slug);
        setCurrentView('blog');
      } else if (hash === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
        setSelectedSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (currentView === 'admin') {
    if (!user) {
      return <AdminLogin />;
    }
    return <BlogAdmin />;
  }

  if (currentView === 'blog' && selectedSlug) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <BlogPost
          slug={selectedSlug}
          onBack={() => {
            window.location.hash = 'blogs';
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <Blogs />
      <Education />
      <Contact />
    </div>
  );
}

export default App;
