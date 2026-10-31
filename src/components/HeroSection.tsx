import React from 'react';
import { motion } from 'framer-motion';
import { ContactButton } from './ContactButton.tsx';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 1. Navbar: Horizontal nav bar with 4 links */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 z-20"
      >
        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          About
        </button>

        <button
          type="button"
          onClick={() => scrollTo('services')}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Price
        </button>

        <button
          type="button"
          onClick={() => scrollTo('projects')}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Projects
        </button>

        <button
          type="button"
          onClick={onOpenContact}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
        >
          Contact
        </button>
      </motion.nav>

      {/* 2. Massive Hero Heading */}
      <div className="w-full overflow-hidden text-center z-0 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none"
        >
          Hi, i&apos;m mina
        </motion.h1>
      </div>

      {/* 3. Hero Portrait: The Living Portrait */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="hero-portrait-wrap"
        id="magnetWrap"
      >
        <div
          className="hero-portrait-inner fade-in"
          id="magnetInner"
          style={{ '--fade-y': '30px' } as React.CSSProperties}
          data-delay="600"
        >
          <img
            id="faceFallback"
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_040619_2f6f349e-a4a7-40db-8e9b-03b6acd8b99a.png&w=1024&q=92"
            alt="Mina Portrait"
          />
          <canvas id="faceGl" aria-hidden="true"></canvas>
          <div id="faceProps" aria-hidden="true">
            <svg id="faceFly" viewBox="0 0 32 32">
              <path
                className="wing"
                d="M15 15C12 9.500 4.500 8.500 2 13c2.500 4.500 10 4.500 13 2z"
              />
              <path
                className="wing r"
                d="M17 15c3-5.500 10.500-6.500 13-2-2.500 4.500-10 4.500-13 2z"
              />
              <ellipse cx="16" cy="19.500" rx="4" ry="6.500" />
              <circle cx="16" cy="11.500" r="3.300" />
            </svg>
            <svg id="faceHand" viewBox="0 0 32 32">
              <path
                className="open"
                d="M10.500 16.500V8.200a1.800 1.800 0 0 1 3.600 0V14v-8a1.800 1.800 0 0 1 3.600 0V14 7a1.800 1.800 0 0 1 3.600 0v8-5a1.800 1.800 0 0 1 3.600 0v10.500c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-3.500-5.600c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.600 1z"
              />
              <path
                className="grab"
                d="M10.500 17v-3.300a1.800 1.800 0 0 1 3.600 0V14v-1.800a1.800 1.800 0 0 1 3.600 0V14v-1.300a1.800 1.800 0 0 1 3.600 0V14v-.3a1.800 1.800 0 0 1 3.600 0v6.800c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-2.300-3.700c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.700 1z"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* 4. Bottom bar: Flexbox justify-between items-end */}
      <div className="w-full flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        {/* Left text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          a 3d creator driven by crafting striking and unforgettable projects
        </motion.p>

        {/* Right ContactButton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton onClick={onOpenContact} />
        </motion.div>
      </div>
    </section>
  );
};
