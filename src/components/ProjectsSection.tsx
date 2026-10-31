import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { LiveProjectButton } from './LiveProjectButton.tsx';
import { ProjectData } from './ProjectModal.tsx';

export const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    description:
      'Immersive brand universe and 3D architectural staging for Nextlevel Studio. Engineered custom WebGL particle simulations, high-fidelity ambient lighting, and bespoke motion typography.',
    deliverables: ['3D Modeling', 'Photorealistic Shaders', 'WebGL Art Direction', 'Brand Identity'],
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    number: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    description:
      'A sculptural brand identity project exploring iridescent volumetric forms, tactile material design, and spatial UI layouts designed for futuristic spatial computing interfaces.',
    deliverables: ['Procedural Materials', 'Spatial Design', 'Motion Graphics', 'Packaging Design'],
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    number: '03',
    name: 'Solaris Digital',
    category: 'Client',
    description:
      'High-impact visual strategy and dynamic 3D asset pipeline for Solaris Digital. Focused on clean industrial silhouettes, raymarched volumetric rays, and conversion-centered presentation.',
    deliverables: ['Raytraced Lighting', '3D Environment', 'Web Experience', 'Creative Direction'],
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  },
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  topOffset: number;
  onOpenProject: (p: ProjectData) => void;
}

const StackingCard: React.FC<CardProps> = ({
  project,
  index,
  totalCards,
  progress,
  range,
  targetScale,
  topOffset,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(5.5rem + ${topOffset}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] origin-top transition-shadow duration-300"
      >
        {/* Top Row: Number, category label, project name, and a "Live Project" ghost button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 90px)' }}
            >
              {project.number}
            </span>

            {/* Category + Name */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/70 font-light">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase text-[#D7E2EA] tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Ghost button */}
          <LiveProjectButton onClick={() => onOpenProject(project)} />
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Left column (40% width): 2 stacked images */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141518] border border-white/5 cursor-pointer group"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col1Top}
                alt={`${project.name} render preview 1`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141518] border border-white/5 cursor-pointer group"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col1Bottom}
                alt={`${project.name} render preview 2`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right column (60% width): 1 tall image */}
          <div className="lg:col-span-7">
            <div
              className="w-full h-full min-h-[300px] sm:min-h-[380px] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141518] border border-white/5 cursor-pointer group"
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.images.col2}
                alt={`${project.name} hero render`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onOpenProject: (p: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = PROJECTS.length;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-8 md:px-10 pt-20 pb-28"
    >
      {/* Heading: "Project" (singular) using .hero-heading gradient */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>
      </div>

      {/* Sticky stacking project cards */}
      <div className="relative">
        {PROJECTS.map((project, index) => {
          // targetScale = 1 - (totalCards - 1 - index) * 0.03
          const targetScale = 1 - (totalCards - 1 - index) * 0.03;
          // Scale range based on scroll
          const start = index / totalCards;
          const end = (index + 1) / totalCards;
          const topOffset = index * 28;

          return (
            <StackingCard
              key={project.number}
              project={project}
              index={index}
              totalCards={totalCards}
              progress={scrollYProgress}
              range={[start, end]}
              targetScale={targetScale}
              topOffset={topOffset}
              onOpenProject={onOpenProject}
            />
          );
        })}
      </div>
    </section>
  );
};
