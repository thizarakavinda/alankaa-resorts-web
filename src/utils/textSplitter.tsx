import React from 'react';

interface SplitWordsProps {
  text: string;
}


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
