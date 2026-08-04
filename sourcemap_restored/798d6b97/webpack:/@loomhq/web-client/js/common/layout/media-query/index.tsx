import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface MediaQueryProps {
  children: ReactNode;
  query: string;
}

export function MediaQuery({
  children,
  query,
}: MediaQueryProps): JSX.Element | null {
  const mqlRef = useRef<MediaQueryList>(window.matchMedia(query));
  const [matches, setMatches] = useState<boolean>(mqlRef.current.matches);

  useEffect(() => {
    const mql = mqlRef.current;
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches ? <>{children}</> : null;
}
