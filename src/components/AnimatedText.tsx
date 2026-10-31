import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharSpanProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-text">
        {char}
      </motion.span>
    </span>
  );
};

interface WordSpanProps {
  word: string;
  wordStartIndex: number;
  totalChars: number;
  progress: MotionValue<number>;
}

const WordSpan: React.FC<WordSpanProps> = ({ word, wordStartIndex, totalChars, progress }) => {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split('').map((char, charIdx) => {
        const charIndex = wordStartIndex + charIdx;
        const start = charIndex / totalChars;
        const end = Math.min(1, start + 1.2 / totalChars);
        return (
          <CharSpan
            key={charIdx}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;

  let runningCharIndex = 0;

  return (
    <p
      ref={elementRef}
      className={`relative select-text ${className}`}
      aria-label={text}
    >
      {words.map((word, wordIdx) => {
        const wordStartIndex = runningCharIndex;
        runningCharIndex += word.length + 1; // account for space

        return (
          <React.Fragment key={wordIdx}>
            <WordSpan
              word={word}
              wordStartIndex={wordStartIndex}
              totalChars={totalChars}
              progress={scrollYProgress}
            />
            {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </React.Fragment>
        );
      })}
    </p>
  );
};
