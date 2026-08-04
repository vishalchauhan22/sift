// TODO(next author): Please convert styled component to native Lens and/or module css instead
// eslint-disable-next-line no-restricted-imports
import styled from '@emotion/styled';

import React from 'react';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Background = (): JSX.Element => {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="625"
        height="270"
        viewBox="0 0 625 270"
        fill="none"
      >
        <g clipPath="url(#clip0_3609_26241)">
          <rect width="625" height="270" rx="24" fill="#2B1C50" />
          <g filter="url(#filter0_f_3609_26241)">
            <rect
              x="60"
              y="-136"
              width="440"
              height="144"
              rx="72"
              fill="url(#paint0_linear_3609_26241)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_3609_26241"
            x="-88"
            y="-284"
            width="736"
            height="440"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="74"
              result="effect1_foregroundBlur_3609_26241"
            />
          </filter>
          <linearGradient
            id="paint0_linear_3609_26241"
            x1="280"
            y1="7.99998"
            x2="274.607"
            y2="-135.798"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#615CF5" />
            <stop offset="0.557292" stopColor="#9F92EC" />
            <stop offset="1" stopColor="#E477CC" />
          </linearGradient>
          <clipPath id="clip0_3609_26241">
            <rect width="625" height="270" rx="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Wrapper>
  );
};
