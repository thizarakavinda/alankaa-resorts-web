import React from 'react';

interface SplitWordsProps {
  text: string;
}

/**
 * Splits a sentence into individual words wrapped in spans.
 * This allows GSAP or Framer Motion to animate each word individually.
 * 
 * Each word is given a class 'split-word' and an initial clipPath 
 * so it is hidden until revealed by GSAP.
 */
export const SplitWords: React.FC<SplitWordsProps> = ({ text }) => {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <span 
          key={index} 
          className="split-word inline-block"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          {word}
        </span>
      ))}
    </>
  );
};
