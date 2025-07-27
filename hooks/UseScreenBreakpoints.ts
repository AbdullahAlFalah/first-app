import { useWindowDimensions } from 'react-native';

export function useBreakpoint() {

  const { width, height } = useWindowDimensions(); // Get the current width of the window

  const isPortrait = height >= width;
  const isLandscape = width > height;

  return {
    width,
    height,
    isSmall: width < 360,
    isMedium: width >= 360 && width < 768,
    isLarge: width >= 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isPortrait,
    isLandscape,
  };

}

