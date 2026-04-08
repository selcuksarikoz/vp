'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: 'Premium Vapes & E-Liquids',
    description: 'Explore our curated selection of high-quality vaping devices and flavors.',
    image: '/images/hero/1.webp',
    cta: 'Shop Now',
  },
  {
    id: 2,
    title: 'New Disposables Arrived',
    description: 'Convenient, flavorful, and long-lasting. Check out the latest disposable vapes.',
    image: '/images/hero/2.webp',
    cta: 'View Disposables',
  },
  {
    id: 3,
    title: 'Advanced Pod Systems',
    description: 'Upgrade your experience with our top-rated rechargeable pod kits.',
    image: '/images/hero/3.webp',
    cta: 'Explore Pods',
  },
];

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            className={clsx(
              'absolute inset-0 w-full h-full flex flex-col lg:flex-row transition-opacity duration-1000 ease-in-out',
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none',
            )}
          >
            {/* Left Content Area */}
            <div className="relative z-20 w-full lg:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div
                className={clsx(
                  'relative z-10 max-w-xl transition-all duration-1000 ease-out delay-200',
                  isActive
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-8',
                )}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.15]">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light">
                  {slide.description}
                </p>
                <div>
                  <Button
                    variant="light"
                    size="lg"
                    href="/products"
                    className="h-14 px-8 text-base font-semibold"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="absolute top-0 left-0 w-screen h-screen">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={clsx(
                  'object-cover object-center transition-transform duration-[4000ms] ease-out',
                  isActive ? 'scale-100' : 'scale-105',
                )}
                priority={index === 0}
              />
              {/* Solid black overlay, no gradients */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Mobile Image Overlay */}
            <div className="absolute inset-0 w-full h-full lg:hidden z-0 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={clsx(
                  'object-cover object-center transition-transform duration-[4000ms] ease-out',
                  isActive ? 'scale-100' : 'scale-105',
                )}
                priority={index === 0}
              />
              {/* Solid black overlay, no gradients */}
              <div className="absolute inset-0 bg-black/60" />
            </div>
          </div>
        );
      })}

      {/* Dots on the right */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={clsx(
              'w-1.5 transition-all duration-500 rounded-full',
              activeIndex === index
                ? 'bg-white h-10'
                : 'bg-white/30 h-3 hover:bg-white/50 hover:scale-110',
            )}
          />
        ))}
      </div>
    </div>
  );
}
