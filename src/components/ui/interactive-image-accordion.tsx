'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDevice } from '@/lib/contexts/DeviceContext';

// --- Data for Steel Motion's Technology Solutions ---
// Primary services (AI & Custom Apps) first, then secondary services
const accordionItems = [
  {
    id: 1,
    title: 'AI Transformation & Automation',
    url: '/services/ai-transformation',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    bulletPoints: [
      'Process Automation & Workflow Optimization',
      'Intelligent Document Processing',
      'Predictive Analytics & Decision Support'
    ],
    isPrimary: true
  },
  {
    id: 2,
    title: 'Custom Application Development',
    url: '/services/custom-development',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
    bulletPoints: [
      'Full-Stack Web & Mobile Applications',
      'API Development & Integration',
      'Legacy System Modernization'
    ],
    isPrimary: true
  },
  {
    id: 3,
    title: 'Cloud Infrastructure Solutions',
    url: '/services/cloud-infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    bulletPoints: [
      'Scalable Cloud Architecture Design',
      'Infrastructure as Code (IaC)',
      'DevOps & CI/CD Pipeline Implementation'
    ],
    isPrimary: false
  },
  {
    id: 4,
    title: 'Cybersecurity & Protection',
    url: '/services/cybersecurity',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    bulletPoints: [
      'Security Assessments & Penetration Testing',
      'Compliance & Risk Management',
      'Incident Response & Recovery Planning'
    ],
    isPrimary: false
  },
  {
    id: 5,
    title: 'Data Analytics & Intelligence',
    url: '/services/data-analytics',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    bulletPoints: [
      'Business Intelligence Dashboards',
      'Machine Learning Model Development',
      'Real-time Data Processing & Visualization'
    ],
    isPrimary: false
  },
];

// --- Mobile Card Component ---
const MobileServiceCard = ({ item }: { item: typeof accordionItems[0] }) => {
  return (
    <Link href={item.url} className="block">
      <div className="relative rounded-2xl overflow-hidden border border-sm-border-inverse hover:border-sm-accent-inverse/40 shadow-lg transition-all duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-sm-surface-inverse/70"></div>
        </div>
        <div className="p-4 bg-sm-surface-inverse/90">
          <h3 className="text-lg font-bold text-sm-accent-inverse mb-3">
            {item.title}
          </h3>
          <div className="space-y-2">
            {item.bulletPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-sm-accent-inverse rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm-text-inverse text-sm leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- Desktop Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <Link href={item.url} className="block flex-shrink-0">
      <div
        className={`
          relative h-[420px] rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-700 ease-in-out border border-sm-border-inverse
          hover:border-sm-accent-inverse/40 shadow-lg
          ${isActive ? 'w-[340px]' : 'w-[50px]'}
        `}
        onMouseEnter={onMouseEnter}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 340px"
          className="object-cover"
        />
        {/* Gradient overlay for better integration */}
        <div className="absolute inset-0 bg-sm-surface-inverse/60"></div>

        {/* Content Container - Only visible when active */}
        {isActive && (
          <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
            {/* Title */}
            <h3 className="text-xl font-bold text-sm-accent-inverse mb-4 text-center drop-shadow-lg">
              {item.title}
            </h3>

            {/* Bullet Points */}
            <div className="space-y-2">
              {item.bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-sm-accent-inverse rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm-text-inverse text-sm leading-relaxed drop-shadow-md">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inactive state - vertical title */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-sm-text-inverse text-base font-semibold whitespace-nowrap transition-all duration-300 ease-in-out drop-shadow-lg"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)'
              }}
            >
              {item.title}
            </span>
          </div>
        )}

        {/* Active state glow effect */}
        {isActive && (
          <div className="absolute inset-0 bg-sm-accent-inverse/10 pointer-events-none"></div>
        )}
      </div>
    </Link>
  );
};

// --- Main Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0); // Default to AI Transformation (primary service)
  const { isDesktop } = useDevice();

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-sm-surface-inverse font-sans">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-sm-accent-inverse/10 text-sm-accent-inverse border border-sm-accent-inverse/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
              Our Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-sm-text-inverse leading-tight tracking-tighter">
              AI-Powered Solutions
              <span className="block text-sm-accent-inverse">Built to Perform</span>
            </h1>
            <p className="mt-6 text-lg text-sm-text-inverse-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We specialize in AI transformation and custom application development, turning complex business challenges into streamlined, automated solutions that deliver measurable ROI.
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block bg-sm-accent-inverse hover:bg-[#5AE8D5] text-sm-surface-inverse font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 min-h-[44px]"
              >
                Get Started Today
              </a>
            </div>
          </div>

          {/* Right Side: Mobile Cards / Desktop Accordion */}
          <div className="w-full lg:w-[55%]">
            {/* Mobile/Tablet: Grid of Cards */}
            {!isDesktop && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accordionItems.map((item) => (
                  <MobileServiceCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Desktop: Image Accordion */}
            {isDesktop && (
              <div className="flex flex-row items-center justify-start gap-2 p-4 overflow-x-auto">
                {accordionItems.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isActive={index === activeIndex}
                    onMouseEnter={() => handleItemHover(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
