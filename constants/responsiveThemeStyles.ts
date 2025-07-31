import { useBreakpoint } from '../hooks/UseScreenBreakpoints';

// Get the user-toggled theme mode
export function useResponsiveThemeStyles(theme: 'light' | 'dark') {

    const { isSmall, isMedium, isLarge } = useBreakpoint();
    // Log the current screen size
    console.log(`Current screen size: small? ${isSmall} medium? ${isMedium} large? ${isLarge}`);

    const isDarkMode = theme === 'dark';

    // Chooses values based on screen size
    // Spacing values for different screen sizes (used for margin and padding)
    const spacing = isSmall
        ? { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }
        : isMedium
        ? { xs: 6, sm: 12, md: 16, lg: 24, xl: 32 }
        : { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 };

    // Font sizes for different screen sizes
    const fontSize = isSmall
        ? { sm: 12, md: 14, lg: 16, xl: 18, xxl: 20, xxxl: 22 }
        : isMedium
        ? { sm: 14, md: 16, lg: 18, xl: 20, xxl: 22, xxxl: 24 }
        : { sm: 16, md: 18, lg: 20, xl: 22, xxl: 24, xxxl: 26 };

    // Generic sizes for different screen sizes
    const size = isSmall
        ? { sm: 24, md: 28, lg: 32, xl: 36, xxl: 40, xxxl: 44 }
        : isMedium
        ? { sm: 28, md: 32, lg: 36, xl: 40, xxl: 44, xxxl: 48 }
        : { sm: 32, md: 36, lg: 40, xl: 44, xxl: 48, xxxl: 52 };

    // Border radius values for different screen sizes     
    const radius = isSmall
        ? { sm: 4, md: 6, lg: 8 }
        : isMedium
        ? { sm: 6, md: 8, lg: 12 }
        : { sm: 8, md: 12, lg: 16 };

    // Define colors based on dark mode
      const colors = isDarkMode
    ? {
        background: '#25292e', // dark gray color
        primaryText: '#ffffff', // pure white color
        secondaryText: '#bbbbbb', // muted off-white color
        tertiaryText: '#777777', // deeper muted gray color (for disabled/hint text)
        card: '#1e1e1e', // soft black color used for cards, buttons, etc.
        border: '#d1d1d1', // off-white color
        circleButtonBorder: '#ffd700', // gold color for circle button border
        circleButtonColor: '#ffffff', // pure white color for circle button background
      }
    : {
        background: '#ffffff', // pure white color
        primaryText: '#000000',  // pure black color
        secondaryText: '#6e6e6e', // muted dark gray color 
        tertiaryText: '#aaaaaa', // soft light gray color (for disabled/hint text)
        card: '#f0f0f0', // ultra light gray color used for cards, buttons, etc.
        border: '#1a1a1a', // light gray color
        circleButtonBorder: '#4b0082', // indigo color for button border
        CircleButtonColor: '#25292e', // pure white color for button background
      };

    return {
        
      container: {
        backgroundColor: colors.background,       
      },
      primaryText: {
        fontSize: fontSize.lg,
        color: colors.primaryText,
      },
      secondaryText: {
        fontSize: fontSize.sm,
        color: colors.secondaryText,
      },
      tertiaryText: {
        fontSize: fontSize.sm,
        color: colors.tertiaryText,
      },
      boldText: {
        fontWeight: 'bold',
        fontSize: fontSize.md,
        color: colors.primaryText,
      },
      cellText: {
        fontSize: fontSize.md,
        color: colors.secondaryText,
      },
      titleText: {
        fontWeight: 'bold',
        fontSize: fontSize.lg,
        color: colors.primaryText,
        textAlign: 'center',
        marginBottom: spacing.sm,
      },
      tableContainer: {
        backgroundColor: colors.card,
        borderRadius: radius.sm,
        padding: spacing.sm,
      },
      tableOuterBorder: {
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
      },
      tabelRow: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
      },
      tableRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      CircleButtonContainer: {
        width: size.xl+4,
        height: size.xl+4,
        marginHorizontal: (spacing.xl-2)*2, 
        padding: (spacing.xs)*0.5, 
        borderColor: colors.circleButtonBorder,
        borderRadius: (radius.lg)-6,
      },
      CircleButton: {
        backgroundColor: colors.circleButtonColor,
        borderRadius: (radius.lg)-6,       
      },
      spacing,
      fontSize,
      size,   
      radius,
      colors,
    };

}

