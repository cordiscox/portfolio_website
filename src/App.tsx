import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GridBackground } from './components/ui/GridBackground';
import { InfinitePawTrail } from './components/ui/infinite-paw-trail';
import { ChatWidget } from './components/chat/ChatWidget';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <GridBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
