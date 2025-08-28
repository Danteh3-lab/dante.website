'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ScrollReveal from './ScrollReveal';
import StaggeredReveal from './StaggeredReveal';

export default function Hero() {

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <ScrollReveal direction="fade" delay={200}>
              <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm text-gray-300">Your On-Demand Dev Team</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={400} duration={800}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Product Engineering.
                <br />
                <span className="gradient-text">Without the Hiring.</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={600} duration={700}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                A senior team delivering features, integrations, and automations for a fixed monthly rate.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={800} duration={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="#pricing" 
                  className="btn-primary group inline-flex items-center"
                >
                  Start Free Trial
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/portfolio"
                  className="btn-secondary group inline-flex items-center"
                >
                  View Portfolio
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats Section */}
          <StaggeredReveal
            staggerDelay={150}
            direction="up"
            duration={700}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-32 md:mb-20"
          >
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "24/7", label: "Expert Support" }
            ].map((stat, index) => (
              <div key={index} className="glass-card text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </div>

      {/* Portfolio modal removed; replaced with /portfolio link */}

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          const servicesSection = document.getElementById('services');
          if (servicesSection) {
            servicesSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 hover:scale-110 transition-transform duration-300 cursor-pointer group z-20"
        aria-label="Scroll to services section"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2 group-hover:text-primary transition-colors">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-primary rounded-full flex justify-center transition-colors">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </button>
    </section>
  );
}
