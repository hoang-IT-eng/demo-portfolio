import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Copy,
  Check,
  Cpu,
  Calendar,
  Clock,
  User,
  Eye,
} from 'lucide-react';
import { ParticleCanvas } from './ParticleCanvas.tsx';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  description: string;
  deliverables: string[];
  client?: string;
  year?: string;
  role?: string;
  timeline?: string;
  tools?: string[];
  technicalHighlights?: string[];
  metrics?: { label: string; value: string }[];
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
}

interface ProjectModalProps {
  project: ProjectData | null;
  projects?: ProjectData[];
  onSelectProject?: (p: ProjectData) => void;
  onClose: () => void;
  onOpenContact: (servicePrefill?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projects = [],
  onSelectProject,
  onClose,
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<'renders' | 'interactive' | 'pipeline'>('renders');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Keyboard navigation (Esc to close, Left/Right arrow to cycle)
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && projects.length > 1 && onSelectProject) {
        const currentIndex = projects.findIndex((p) => p.number === project.number);
        const nextIndex = (currentIndex + 1) % projects.length;
        onSelectProject(projects[nextIndex]);
      } else if (e.key === 'ArrowLeft' && projects.length > 1 && onSelectProject) {
        const currentIndex = projects.findIndex((p) => p.number === project.number);
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        onSelectProject(projects[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects, onSelectProject, onClose, lightboxImage]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.number === project.number);
  const prevProject =
    projects.length > 1
      ? projects[(currentIndex - 1 + projects.length) % projects.length]
      : null;
  const nextProject =
    projects.length > 1
      ? projects[(currentIndex + 1) % projects.length]
      : null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scheme: 'flower' | 'aura' | 'solaris' =
    project.number === '01'
      ? 'flower'
      : project.number === '02'
      ? 'aura'
      : 'solaris';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (lightboxImage) setLightboxImage(null);
            else onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#121316] border border-[#252830] rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl z-10 text-[#D7E2EA] max-h-[92vh] flex flex-col overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#252830]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C9BA5]">
                <span className="text-white font-mono font-bold">#{project.number}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#BBCCD7]">{project.category}</span>
                {project.year && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#8C9BA5]">{project.year}</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                {project.name}
              </h2>
            </div>

            {/* Top controls: Prev, Next, Copy Link, Close */}
            <div className="flex items-center gap-2">
              {projects.length > 1 && onSelectProject && (
                <div className="flex items-center gap-1 mr-1 bg-[#1A1D23] rounded-full p-1 border border-[#2A2E39]">
                  <button
                    type="button"
                    onClick={() => prevProject && onSelectProject(prevProject)}
                    className="p-1.5 rounded-full text-[#8C9BA5] hover:text-white hover:bg-white/10 transition-colors"
                    title={`Previous: ${prevProject?.name}`}
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs px-1 text-[#8C9BA5] font-mono">
                    {currentIndex + 1}/{projects.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => nextProject && onSelectProject(nextProject)}
                    className="p-1.5 rounded-full text-[#8C9BA5] hover:text-white hover:bg-white/10 transition-colors"
                    title={`Next: ${nextProject?.name}`}
                    aria-label="Next Project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2 rounded-full text-[#8C9BA5] hover:text-white hover:bg-white/10 transition-colors"
                title="Copy link"
                aria-label="Copy project link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-[#8C9BA5] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="pt-4 pb-2 space-y-4">
            <p className="text-sm sm:text-base text-[#D7E2EA]/85 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {/* Scope & Deliverables */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-[#8C9BA5] font-medium mb-2">
                Scope & Deliverables
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {project.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1D23] border border-[#2A2E39] text-[#D7E2EA]"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive View Tabs (Visual Renders vs Interactive WebGL vs Pipeline Specs) */}
            <div className="flex items-center gap-2 pt-2 border-b border-[#252830] pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('renders')}
                className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all ${
                  activeTab === 'renders'
                    ? 'bg-white text-[#0C0C0C] font-semibold shadow-md'
                    : 'text-[#8C9BA5] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual Showcase (3)</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all ${
                  activeTab === 'interactive'
                    ? 'bg-[#B600A8] text-white font-semibold shadow-md'
                    : 'text-[#8C9BA5] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>Live WebGL Simulation</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all ${
                  activeTab === 'pipeline'
                    ? 'bg-white text-[#0C0C0C] font-semibold shadow-md'
                    : 'text-[#8C9BA5] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Specs & Pipeline</span>
                </span>
              </button>
            </div>
          </div>

          {/* Tab 1: Visual Showcase Gallery */}
          {activeTab === 'renders' && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Left col: 2 stacked images */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  <div
                    onClick={() => setLightboxImage(project.images.col1Top)}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] aspect-[4/3] group cursor-zoom-in"
                  >
                    <img
                      src={project.images.col1Top}
                      alt={`${project.name} preview 1`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 text-white text-xs backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setLightboxImage(project.images.col1Bottom)}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] aspect-[4/3] group cursor-zoom-in"
                  >
                    <img
                      src={project.images.col1Bottom}
                      alt={`${project.name} preview 2`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 text-white text-xs backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right col: tall hero image */}
                <div className="md:col-span-7">
                  <div
                    onClick={() => setLightboxImage(project.images.col2)}
                    className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] group cursor-zoom-in"
                  >
                    <img
                      src={project.images.col2}
                      alt={`${project.name} hero render`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 text-white text-xs backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#17191F] border border-[#252830]">
                  <div className="text-[10px] uppercase tracking-wider text-[#8C9BA5]">Format</div>
                  <div className="text-sm font-semibold text-white mt-0.5">8K Photorealistic</div>
                </div>
                <div className="p-3 rounded-xl bg-[#17191F] border border-[#252830]">
                  <div className="text-[10px] uppercase tracking-wider text-[#8C9BA5]">Lighting</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Raymarched Volumetric</div>
                </div>
                <div className="p-3 rounded-xl bg-[#17191F] border border-[#252830]">
                  <div className="text-[10px] uppercase tracking-wider text-[#8C9BA5]">Pipeline</div>
                  <div className="text-sm font-semibold text-white mt-0.5">WebGL & Blender</div>
                </div>
                <div className="p-3 rounded-xl bg-[#17191F] border border-[#252830]">
                  <div className="text-[10px] uppercase tracking-wider text-[#8C9BA5]">Framerate</div>
                  <div className="text-sm font-semibold text-emerald-400 mt-0.5">60 FPS Smooth</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Interactive WebGL Canvas */}
          {activeTab === 'interactive' && (
            <div className="py-4 space-y-4">
              <ParticleCanvas colorScheme={scheme} />
              <div className="p-4 rounded-xl bg-[#17191F] border border-[#252830] text-xs text-[#D7E2EA]/80 leading-relaxed">
                <span className="text-white font-medium">Interactive Demo:</span> This simulation recreates the dynamic particle engine engineered for {project.name}. Particles respond dynamically to cursor motion, turbulence vectors, and proximity bloom.
              </div>
            </div>
          )}

          {/* Tab 3: Technical Specs & Pipeline */}
          {activeTab === 'pipeline' && (
            <div className="py-4 space-y-5">
              {/* Project Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#17191F] border border-[#252830] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8C9BA5] uppercase tracking-wider">
                    <User className="w-3.5 h-3.5" />
                    <span>Client</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {project.client || 'Confidential'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191F] border border-[#252830] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8C9BA5] uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Timeline</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {project.timeline || '6 Weeks'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191F] border border-[#252830] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8C9BA5] uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Role</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {project.role || 'Lead 3D Creator'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#17191F] border border-[#252830] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8C9BA5] uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Year</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {project.year || '2026'}
                  </div>
                </div>
              </div>

              {/* Tools & Pipeline */}
              {project.tools && project.tools.length > 0 && (
                <div className="p-4 rounded-xl bg-[#17191F] border border-[#252830] space-y-2.5">
                  <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                    Tools & Production Pipeline
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#252830] text-[#D7E2EA] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Highlights */}
              {project.technicalHighlights && (
                <div className="p-4 rounded-xl bg-[#17191F] border border-[#252830] space-y-2.5">
                  <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
                    Technical & Art Direction Highlights
                  </h4>
                  <ul className="space-y-2 text-xs text-[#D7E2EA]/85">
                    {project.technicalHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#B600A8] font-bold mt-0.5">✦</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#252830] mt-auto">
            <div className="text-xs text-[#8C9BA5]">
              Available for selected commercial commissions & art direction.
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact(project.name);
                }}
                className="px-6 py-2.5 rounded-full text-white font-medium uppercase tracking-widest text-xs transition-transform active:scale-95 cursor-pointer"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow:
                    '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                  outline: '2px solid white',
                  outlineOffset: '-3px',
                }}
              >
                Commission Similar Work
              </button>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Overlay */}
        <AnimatePresence>
          {lightboxImage && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
              >
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="absolute -top-10 right-0 p-2 text-white hover:text-white/70 transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={lightboxImage}
                  alt="High-resolution project view"
                  className="w-auto h-auto max-h-[85vh] object-contain rounded-xl border border-white/20 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
