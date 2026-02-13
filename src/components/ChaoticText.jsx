import React, { useMemo } from 'react';

/**
 * ChaoticText - Wraps every character in a span with randomized styles
 * This creates maximum visual chaos and readability issues
 */
function ChaoticText({ children, as: Component = 'span', className = '', ...props }) {
  const chaoticContent = useMemo(() => {
    // Convert children to string
    const text = typeof children === 'string' ? children : String(children);
    
    // Split into characters and wrap each in a randomized span
    return text.split('').map((char, index) => {
      // Random font size between 8px and 34px
      const fontSize = Math.floor(Math.random() * (34 - 8 + 1)) + 8;
      
      // Random letter-spacing between -2px and 10px
      const letterSpacing = Math.floor(Math.random() * (10 - (-2) + 1)) + (-2);
      
      // Random rotation for extra chaos
      const rotation = Math.floor(Math.random() * 20) - 10;
      
      // Random vertical offset
      const verticalOffset = Math.floor(Math.random() * 10) - 5;
      
      // Random color from a terrible palette
      const terribleColors = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
        '#FF00FF', '#00FFFF', '#FF6600', '#9900FF'
      ];
      const color = terribleColors[Math.floor(Math.random() * terribleColors.length)];
      
      // Random font family
      const chaoticFonts = [
        "'Jokerman', cursive",
        "'Creepster', cursive", 
        "'Rubik Beetle', cursive",
        "'Comic Sans MS', cursive",
        "Papyrus, fantasy"
      ];
      const fontFamily = chaoticFonts[Math.floor(Math.random() * chaoticFonts.length)];
      
      return (
        <span
          key={index}
          style={{
            fontSize: `${fontSize}px`,
            letterSpacing: `${letterSpacing}px`,
            display: 'inline-block',
            transform: `rotate(${rotation}deg) translateY(${verticalOffset}px)`,
            color: color,
            fontFamily: fontFamily,
            textShadow: `2px 2px 0px #000000, -1px -1px 0px #FFFFFF`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  }, [children]);

  return (
    <Component className={`chaotic-text ${className}`} {...props}>
      {chaoticContent}
    </Component>
  );
}

export default ChaoticText;
