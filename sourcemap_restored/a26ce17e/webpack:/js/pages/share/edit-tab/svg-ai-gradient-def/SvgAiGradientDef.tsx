import React, { useEffect } from 'react';

/**
 * This component renders the svg definition for the ai primary gradient, and
 * makes it available for setting on svg paths (like icons) via the
 * var(--svg-ai-gradient-primary) css variable.
 */
export const SvgAiGradientDef = (): JSX.Element => {
  useEffect(() => {
    // Set CSS variable on mount, when the SVG definition becomes available
    document.documentElement.style.setProperty(
      '--svg-ai-gradient-primary',
      'url(#svg-ai-gradient-primary-def)'
    );

    // Cleanup CSS variable if this component is unmounted
    return () => {
      document.documentElement.style.removeProperty(
        '--svg-ai-gradient-primary'
      );
    };
  }, []);

  return (
    <svg width="0" height="0" style={{ display: 'absolute' }}>
      <defs>
        <linearGradient id="svg-ai-gradient-primary-def">
          <stop offset="0%" stopColor="hsl(242, 88%, 66%)" />
          <stop offset="39%" stopColor="hsl(247, 78%, 72%)" />
          <stop offset="61%" stopColor="hsl(270, 64%, 72%)" />
          <stop offset="100%" stopColor="hsl(313, 67%, 68%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
