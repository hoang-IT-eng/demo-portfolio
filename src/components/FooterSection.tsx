import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterSectionProps {
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0C0C0C] border-t border-[#1C1F26] px-6 sm:px-10 py-12 text-[#8C9BA5] text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white uppercase tracking-wider text-sm">
            Mina · 3D Creator
          </span>
          <span className="text-[#3E4552]">/</span>
          <span>Tokyo & Seoul</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onOpenContact}
            className="hover:text-white transition-colors uppercase tracking-wider font-medium cursor-pointer"
          >
            Inquiries
          </button>
          <a
            href="#projects"
            className="hover:text-white transition-colors uppercase tracking-wider font-medium"
          >
            Archive
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
