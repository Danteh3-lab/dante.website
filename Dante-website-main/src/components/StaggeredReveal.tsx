'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface StaggeredRevealProps {
  children: ReactNode[];
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  distance?: string;
  threshold?: number;
  className?: string;
}

export default function StaggeredReveal({
  children,
  staggerDelay = 100,
  direction = 'up',
  duration = 600,
  distance = '30px',
  threshold = 0.1,
  className = ''
}: StaggeredRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = (index: number) => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}, 0)`;
      case 'down':
        return `translate3d(0, -${distance}, 0)`;
      case 'left':
        return `translate3d(${distance}, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}, 0, 0)`;
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          style={{
            transform: getTransform(index),
            opacity: isVisible ? 1 : 0,
            transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * staggerDelay}ms`,
            willChange: 'transform, opacity'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
