import { BookingProvider } from './context/BookingContext.jsx';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Philosophy from './components/Philosophy.jsx';
import Process from './components/Process.jsx';
import OurCollections from './components/OurCollections.jsx';
import FabricScrollytelling from './components/FabricScrollytelling.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import VideoShowcase from './components/VideoShowcase.jsx';
import HorizontalPortfolio from './components/HorizontalPortfolio.jsx';
import StackingFooter from './components/StackingFooter.jsx';
import StickyMobileCTA from './components/StickyMobileCTA.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Loader from './components/Loader.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';

export default function App() {
  return (
    <BookingProvider>
      <a href="#main" className="skip-link">Skip to content</a>

      <SmoothScroll />
      <Loader />
      <CustomCursor />
      <ScrollProgress />

      <div className="relative">
        <Navigation />

        <main id="main" tabIndex={-1} className="relative z-10 outline-none">
          <Hero />
          <Philosophy />
          <Process />
          <OurCollections />
          <FabricScrollytelling />
          <BeforeAfter />
          <VideoShowcase />
          <HorizontalPortfolio />
          <StackingFooter />
        </main>

        <StickyMobileCTA />
      </div>
    </BookingProvider>
  );
}
