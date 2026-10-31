import React from 'react';
import { Magnet } from './Magnet.tsx';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  withMagnet?: boolean;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  withMagnet = true,
}) => {
  const button = (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest cursor-pointer transition-colors duration-200 hover:bg-[#D7E2EA]/10 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}
      aria-label="View Live Project"
    >
      <span className="relative z-10">Live Project</span>
    </button>
  );

  if (withMagnet) {
    return <Magnet strength={4}>{button}</Magnet>;
  }

  return button;
};
