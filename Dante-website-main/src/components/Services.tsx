'use client';

import React from 'react';
// Note: lottie-web must be imported dynamically on the client to avoid SSR issues

import LiteYouTube from './LiteYouTube';
import { Code2, Globe2, Settings, Cloud, Smartphone, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: 'code',
    title: 'Custom Software Development',
    description: 'Tailored applications built with modern technologies to solve your unique business challenges.',
    features: ['Full-stack development', 'API integrations', 'Database design', 'Performance optimization']
  },
  {
    icon: 'web',
    title: 'Web Applications',
    description: 'Responsive and scalable web applications using cutting-edge frameworks and best practices.',
    features: ['React/Next.js development', 'Progressive Web Apps', 'E-commerce solutions', 'Content Management Systems']
  },
  {
    icon: 'automation',
    title: 'Process Automation',
    description: 'Streamline your workflows with intelligent automation solutions that save time and reduce errors.',
    features: ['Workflow automation', 'Data processing', 'Integration solutions', 'Business intelligence']
  },
  {
    icon: 'cloud',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment strategies for modern applications.',
    features: ['AWS/Azure deployment', 'Containerization', 'Microservices architecture', 'DevOps implementation']
  },
  {
    icon: 'mobile',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications that deliver exceptional user experiences.',
    features: ['React Native apps', 'iOS/Android development', 'App Store optimization', 'Mobile-first design']
  },
  {
    icon: 'analytics',
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with advanced analytics and visualization.',
    features: ['Data visualization', 'Machine learning models', 'Real-time dashboards', 'Predictive analytics']
  }
];

const gradientFor = (iconType: string) => {
  switch (iconType) {
    case 'code':
      return 'from-cyan-400 via-blue-500 to-purple-600';
    case 'web':
      return 'from-emerald-400 via-teal-500 to-cyan-500';
    case 'automation':
      return 'from-orange-400 via-amber-500 to-pink-600';
    case 'cloud':
      return 'from-sky-400 via-indigo-500 to-fuchsia-600';
    case 'mobile':
      return 'from-rose-400 via-pink-500 to-fuchsia-600';
    case 'analytics':
      return 'from-lime-400 via-green-500 to-emerald-600';
    default:
      return 'from-blue-500 via-purple-500 to-pink-500';
  }
};

// Optional Lordicon animation sources. If a URL is provided for a service icon,
// we'll render an animated Lordicon; otherwise we fall back to Lucide.
// You can replace these with your preferred Lordicon CDN URLs.
const LORDICONS: Record<string, string | undefined> = {
  code: 'https://cdn.lordicon.com/puvaffet.json',
  web: 'https://cdn.lordicon.com/ogkflacg.json',
  automation: 'https://cdn.lordicon.com/nqtddedc.json',
  cloud: 'https://cdn.lordicon.com/hbvyhtse.json',
  mobile: 'https://cdn.lordicon.com/qhviklyi.json',
  analytics: 'https://cdn.lordicon.com/akuwjdzh.json',
};

// Hoisted function declaration so it can be used above its definition safely
function getServiceIcon(iconType: string) {
  const common = 'w-8 h-8 text-white';
  switch (iconType) {
    case 'code':
      return <Code2 className={common} />;
    case 'web':
      return <Globe2 className={common} />;
    case 'automation':
      return <Settings className={common} />;
    case 'cloud':
      return <Cloud className={common} />;
    case 'mobile':
      return <Smartphone className={common} />;
    case 'analytics':
      return <BarChart3 className={common} />;
    default:
      return <Globe2 className={common} />;
  }
}

const ServiceIcon = ({ type }: { type: string }) => {
  const url = LORDICONS[type];
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const animRef = React.useRef<any>(null);
  const initStartedRef = React.useRef(false);
  const [ready, setReady] = React.useState(false);

  const handleEnter = async () => {
    if (!url) return;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;
    if (!animRef.current && !initStartedRef.current && containerRef.current) {
      initStartedRef.current = true;
      try {
        const lottie = (await import('lottie-web')).default;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (!containerRef.current) return;
        animRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: data,
        });
        setReady(true);
      } catch {
        // ignore and fall back to static icon
      }
    }
    animRef.current?.goToAndPlay?.(0, true);
  };

  const handleLeave = () => {
    animRef.current?.stop?.();
    animRef.current?.goToAndStop?.(0, true);
  };

  return (
    <div className="w-8 h-8 relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {!ready && getServiceIcon(type)}
      <div ref={containerRef} className="absolute inset-0" aria-hidden={!ready} />
    </div>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  return (
    <div
      key={service.title}
      className="glass-card group transition-transform duration-300 hover:scale-105"
    >
      <div className="flex items-center mb-6">
        <div
          className={`p-3 bg-gradient-to-r ${gradientFor(service.icon)} bg-[length:200%_200%] animate-gradient rounded-xl mr-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2`}
        >
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            <ServiceIcon type={service.icon} />
          </div>
        </div>
        <h3 className="text-xl font-semibold">{service.title}</h3>
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed">
        {service.description}
      </p>
      
      <ul className="space-y-2">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center text-gray-300">
            <svg className="w-4 h-4 text-primary mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <div className="mt-6 pt-6 border-t border-white/10">
        <button className="text-primary hover:text-primary-light font-medium transition-colors duration-300 group-hover:translate-x-2 transform inline-flex items-center">
          Learn More
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive software solutions designed to accelerate your business growth 
            and digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Video Showcase Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              See Our <span className="gradient-text">Development Process</span> in Action
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Watch how we transform ideas into powerful software solutions with modern development practices and cutting-edge technologies.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="group transition-transform duration-300 hover:scale-105">
              <div className="glow-frame">
                <div className="glow-inner relative bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="aspect-video relative">
                    <LiteYouTube
                      videoId="JPh7Pf1z7gE"
                      start={2923}
                      end={2935}
                      autoplay
                      muted
                      forceRate={2}
                    />
                  </div>

                  {/* Video info overlay */}
                  <div className="absolute bottom-4 left-4 flex items-end z-10">
                    <div className="text-white">
                      <div className="text-sm font-medium">Live Coding Session</div>
                      <div className="text-xs text-gray-300">Building a React + Node.js Application</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-[length:200%_200%] animate-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-2">Clean Code Practices</h4>
                <p className="text-sm text-gray-400">Watch how we write maintainable, scalable code following industry best practices.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-[length:200%_200%] animate-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-2">Modern Workflow</h4>
                <p className="text-sm text-gray-400">See our development process from planning to deployment with modern tools.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 bg-[length:200%_200%] animate-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-white mb-2">Real-Time Results</h4>
                <p className="text-sm text-gray-400">Experience the immediate impact of professional development techniques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
