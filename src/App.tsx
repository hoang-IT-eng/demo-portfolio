/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection.tsx';
import { MarqueeSection } from './components/MarqueeSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ProjectsSection, PROJECTS } from './components/ProjectsSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { ProjectModal, ProjectData } from './components/ProjectModal.tsx';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenContact = (prefill?: string) => {
    setContactPrefill(prefill);
    setIsContactOpen(true);
  };

  return (
    <main
      className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif]"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HeroSection */}
      <HeroSection onOpenContact={() => handleOpenContact()} />

      {/* 2. MarqueeSection */}
      <MarqueeSection />

      {/* 3. AboutSection */}
      <AboutSection onOpenContact={() => handleOpenContact()} />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* 5. ProjectsSection */}
      <ProjectsSection
        onOpenProject={(project) => setSelectedProject(project)}
      />

      {/* Subtle closing footer */}
      <FooterSection onOpenContact={() => handleOpenContact()} />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        initialService={contactPrefill}
        onClose={() => {
          setIsContactOpen(false);
          setContactPrefill(undefined);
        }}
      />

      {/* Interactive Project Case Study Lightbox */}
      <ProjectModal
        project={selectedProject}
        projects={PROJECTS}
        onSelectProject={(p) => setSelectedProject(p)}
        onClose={() => setSelectedProject(null)}
        onOpenContact={(prefill) => handleOpenContact(prefill)}
      />
    </main>
  );
}
