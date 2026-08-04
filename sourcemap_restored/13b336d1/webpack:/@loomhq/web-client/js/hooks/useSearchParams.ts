import { useLocation } from 'react-router-dom';

export function useSearchParams(): URLSearchParams {
  const location = useLocation();

  return new URLSearchParams(location.search);
}
