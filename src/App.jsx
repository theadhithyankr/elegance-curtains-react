import { BookingProvider } from './context/BookingContext.jsx';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import TrustStrip from './components/TrustStrip.jsx';
import Philosophy from './components/Philosophy.jsx';
import Process from './components/Process.jsx';
import OurCollections from './components/OurCollections.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import FabricScrollytelling from './components/FabricScrollytelling.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import VideoShowcase from './components/VideoShowcase.jsx';
import HorizontalPortfolio from './components/HorizontalPortfolio.jsx';
import StackingFooter from './components/StackingFooter.jsx';
import StickyMobileCTA from './components/StickyMobileCTA.jsx';
import FloatingContact from './components/FloatingContact.jsx';
import Loader from './components/Loader.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';

export default function App() {
  return (
    <BookingProvider>
      <a href="#main" className="skip-link">Skip to content</a>

      <SmoothScroll />
      <Loader />
      <ScrollProgress />

      <div className="relative">
        <Navigation />

        <main id="main" tabIndex={-1} className="relative z-10 outline-none">
          <Hero />
          <TrustStrip />
          <OurCollections />
          <WhyChooseUs />
          <Philosophy />
          <FabricScrollytelling />
          <BeforeAfter />
          <VideoShowcase />
          <HorizontalPortfolio />
          <Process />
          <StackingFooter />
        </main>

        <StickyMobileCTA />
        <FloatingContact />
      </div>
    </BookingProvider>
  );
}
