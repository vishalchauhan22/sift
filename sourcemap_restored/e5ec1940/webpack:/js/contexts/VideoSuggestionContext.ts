import { createContext } from 'react';

import { VideoSuggestionContextType } from '@js/constants/destinationLogging';

export const VideoSuggestionContext =
  createContext<VideoSuggestionContextType>(null);
