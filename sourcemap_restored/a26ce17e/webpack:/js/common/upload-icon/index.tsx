import React from 'react';

type UploadIconProps = {
  size: number;
  color: string;
};

export function UploadIcon({
  size,
  color = 'currentColor',
}: UploadIconProps): JSX.Element {
  return (
    <svg width={size * 8} height={size * 8} viewBox="0 0 56 56" fill="none">
      <path
        d="M56 21.328V0H34.672v5.56h11.834L30.779 21.288V9.453h-5.56v11.834L9.492 5.561h11.836V0H0v21.328h5.56V9.492L21.288 25.22H9.453v5.56h11.834L5.561 46.506V34.672H0V56h21.328v-5.56H9.492L25.22 34.71v11.837h5.56V34.71l15.727 15.728H34.672V56H56V34.672h-5.56v11.834L34.712 30.779h11.834v-5.56H34.713L50.439 9.492v11.836H56z"
        fill={color}
      />
    </svg>
  );
}
