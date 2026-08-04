import { useState, useEffect } from 'react';

export const useScreenInLandscapeMode = (): boolean => {
  const getIsLandscape = () => {
    try {
      if (
        typeof window !== 'undefined' &&
        window.screen &&
        window.screen.orientation &&
        window.screen.orientation.type
      ) {
        // may be landscape-primary or landscape-secondary
        return window.screen.orientation.type.startsWith('landscape');
      }
    } catch (e) {
      // Intentionally empty: safe to ignore errors caused due to unsupported API call
    }
    return false; // fallback to portrait
  };

  const [isLandscape, setIsLandscape] = useState(getIsLandscape());

  useEffect(() => {
    // in case window.screen property is not available or ScreenOrientation API is not supported
    if (!window.screen || !window.screen.orientation) {
      return;
    }

    const handleOrientationChange = () => {
      setIsLandscape(getIsLandscape());
    };

    // in case addEventListener doesn't exist on window.screen.orientation
    try {
      window.screen.orientation.addEventListener(
        'change',
        handleOrientationChange
      );
    } catch (e) {
      // Intentionally empty: safe to ignore errors caused due to unsupported API call
    }

    return () => {
      // in case removeEventListener doesn't exist on window.screen.orientation
      try {
        window.screen.orientation.removeEventListener(
          'change',
          handleOrientationChange
        );
      } catch (e) {
        // Intentionally empty: safe to ignore errors caused due to unsupported API call
      }
    };
  }, []);

  // return true if the screen is in landscape mode, false if it is on portrait
  // or if the ScreenOrientation API is not supported
  return isLandscape;
};
