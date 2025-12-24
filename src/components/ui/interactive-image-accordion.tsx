'use client'

import React, { useState } from 'react';
import Link from 'next/link';

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

// --- Accordion Item Component ---
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
          transition-all duration-700 ease-in-out border border-[#00F2FF]/20
          hover:border-[#00F2FF]/40 shadow-lg hover:shadow-[#00F2FF]/25
          ${isActive ? 'w-[340px]' : 'w-[50px]'}
        `}
        style={{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        onMouseEnter={onMouseEnter}
      >
      {/* Gradient overlay for better integration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1728]/60 via-[#1a3a5c]/40 to-[#0f2640]/60"></div>

      {/* Content Container - Only visible when active */}
      {isActive && (
        <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
          {/* Title */}
          <h3 className="text-xl font-bold text-[#00F2FF] mb-4 text-center drop-shadow-lg">
            {item.title}
          </h3>

          {/* Bullet Points */}
          <div className="space-y-2">
            {item.bulletPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#00F2FF] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-white text-sm leading-relaxed drop-shadow-md">
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
            className="text-white text-base font-semibold whitespace-nowrap transition-all duration-300 ease-in-out drop-shadow-lg"
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF]/10 via-transparent to-[#33CCFF]/10 pointer-events-none"></div>
      )}
      </div>
    </Link>
  );
};

// --- Main Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0); // Default to AI Transformation (primary service)

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] font-sans">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 rounded-full px-4 py-2 text-sm font-medium mb-6">
              Our Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter">
              AI-Powered Solutions
              <span className="block text-[#00F2FF]">Built to Perform</span>
            </h1>
            <p className="mt-6 text-lg text-[#B3B3B3] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We specialize in AI transformation and custom application development, turning complex business challenges into streamlined, automated solutions that deliver measurable ROI.
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] text-[#0a1728] font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-[#00F2FF]/25 transition-all duration-300 hover:scale-105"
              >
                Get Started Today
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-[55%]">
            <div className="flex flex-row items-center justify-start gap-2 p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}