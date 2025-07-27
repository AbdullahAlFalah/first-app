import { useBreakpoint } from '../hooks/UseScreenBreakpoints';

// Get the user-toggled theme mode
export function useResponsiveTheme(theme: 'light' | 'dark') {

    const { isSmall, isMedium, isLarge } = useBreakpoint();

    const isDarkMode = theme === 'dark';

    // Choose values based on screen size
    const spacing = isSmall
        ? { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }
        : isMedium
        ? { xs: 6, sm: 12, md: 16, lg: 24, xl: 32 }
        : { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 };

    const fontSize = isSmall
        ? { sm: 12, md: 14, lg: 16, xl: 18 }
        : isMedium
        ? { sm: 14, md: 16, lg: 18, xl: 20 }
        : { sm: 16, md: 18, lg: 20, xl: 24 };

    const radius = isSmall
        ? { sm: 4, md: 6, lg: 8 }
        : isMedium
        ? { sm: 6, md: 8, lg: 12 }
        : { sm: 8, md: 12, lg: 16 };

    // Define colors based on dark mode
      const colors = isDarkMode
    ? {
        background: '#121212', // near black color
        text: '#ffffff', // pure white color
        card: '#1e1e1e', // soft black color
        border: '#2a2a2a', // muted gray color
      }
    : {
        background: '#ffffff', // pure white color
        text: '#000000',  // pure black color 
        card: '#f0f0f0', // ultra light gray color
        border: '#e0e0e0', // light gray color
      };

    return {
        spacing,
        fontSize,
        radius,
        colors,
    };

}

