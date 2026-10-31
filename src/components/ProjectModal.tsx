import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, CheckCircle } from 'lucide-react';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  description: string;
  deliverables: string[];
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#121316] border border-[#252830] rounded-3xl p-5 sm:p-8 shadow-2xl z-10 text-[#D7E2EA] max-h-[92vh] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#252830]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C9BA5]">
                  <span className="text-white font-mono">{project.number}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#BBCCD7]">{project.category}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  {project.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#8C9BA5] hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="py-6 space-y-6">
              <p className="text-sm sm:text-base text-[#D7E2EA]/80 leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#8C9BA5] font-medium mb-2.5">
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

              {/* Image Grid Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                <div className="md:col-span-5 flex flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] aspect-[4/3]">
                    <img
                      src={project.images.col1Top}
                      alt={`${project.name} preview 1`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] aspect-[4/3]">
                    <img
                      src={project.images.col1Bottom}
                      alt={`${project.name} preview 2`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C]">
                    <img
                      src={project.images.col2}
                      alt={`${project.name} hero preview`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#252830]">
              <div className="text-xs text-[#8C9BA5]">
                Custom 3D shaders · 8K textures · Cinematic lighting
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="px-6 py-2.5 rounded-full text-white font-medium uppercase tracking-widest text-xs transition-transform active:scale-95"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  Commission Similar Work
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
