import React from 'react';
import { Magnet } from './Magnet.tsx';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  withMagnet?: boolean;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  withMagnet = true,
}) => {
  const button = (
    <button
      type="button"
      onClick={onClick}
      className={`contact-btn group relative inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest cursor-pointer transition-transform duration-200 active:scale-95 select-none px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      aria-label="Contact Mina"
    >
      <span className="relative z-10 transition-opacity duration-200 group-hover:opacity-90">
        Contact Me
      </span>
    </button>
  );

  if (withMagnet) {
    return <Magnet strength={4}>{button}</Magnet>;
  }

  return button;
};
