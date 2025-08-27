import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import dynamic from 'next/dynamic';
import Viewport from '@/components/Viewport';

const Pricing = dynamic(() => import('@/components/Pricing'), {
  ssr: false,
  loading: () => <div className="min-h-[600px]" />,
});

export default function Home() {
  return (
    <main id="main-content" role="main" className="min-h-screen animated-bg">
      <Header />
      <div className="space-y-32">
        <Hero />
        <div className="defer-section"><Services /></div>
        <Viewport>
          <div className="defer-section">
            <Pricing />
          </div>
        </Viewport>
        <div className="defer-section"><FAQ /></div>
        <div className="defer-section"><Contact /></div>
      </div>
      <Footer />
    </main>
  );
}
