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
        ? { xs: 10, sm: 12, md: 14, lg: 16, xl: 18, xxl: 20, xxxl: 22 }
        : isMedium
        ? { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 22, xxxl: 24 }
        : { xs: 14, sm: 16, md: 18, lg: 20, xl: 22, xxl: 24, xxxl: 26 };

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
        primaryText2: '#ffffff', // pure white color for both dark and light themes
        secondaryText: '#bbbbbb', // muted off-white color
        secondaryText2: '#999999', // darker muted off-white color
        tertiaryText: '#777777', // deeper muted gray color (for disabled/hint text)
        card: '#1e1e1e', // soft black color used for cards, buttons, etc....
        card2: '#f0f0f0', // ultra light gray color used for cards, buttons, etc... (Variant 2).
        border: '#d1d1d1', // off-white color
        buttonBorder: '#ffd700', // gold color for button border
        buttonColor: '#ffffff', // pure white color for button background
        buttonColor2: '#1e90ff', // blue color for button background (Variant 2) for both dark and light themes
        buttonColor3: '#4b0082', // indigo color for button background (Variant 3) for both dark and light themes
        RSButtonColor: '#dc143c', // crimson color for rotating square button background
        clickableText: '#ff0000', // red color for clickable text for both dark and light themes
        caret: '#00ff00', // lime color for text input caret for both dark and light themes
        loadWrapper: 'rgba(255, 255, 255, 0.1)', // white semi-transparent background for loading indicator
        loadIndicator: '#ff0000', // red color for loading indicator for both dark and light themes
        loadIndicator2: '#1e90ff', // blue color for loading indicator (Variant 2) for both dark and light themes
      }
    : {
        background: '#ffffff', // pure white color
        primaryText: '#000000',  // pure black color
        primaryText2: '#ffffff', // pure white color for both dark and light themes
        secondaryText: '#6e6e6e', // muted dark gray color
        secondaryText2: '#333333', // darker gray color 
        tertiaryText: '#aaaaaa', // soft light gray color (for disabled/hint text)
        card: '#f0f0f0', // ultra light gray color used for cards, buttons, etc...
        card2: '#1e1e1e', // soft black color used for cards, buttons, etc... (Variant 2).
        border: '#1a1a1a', // light gray color
        buttonBorder: '#4b0082', // indigo color for button border
        buttonColor: '#25292e', // dark gray color for button background
        buttonColor2: '#1e90ff', // blue color for button background (Variant 2) for both dark and light themes
        buttonColor3: '#4b0082', // indigo color for button background (Variant 3) for both dark and light themes
        RSButtonColor: '#0000cd', // dark blue color for rotating square button background 
        clickableText: '#ff0000', // red color for clickable text for both dark and light themes
        caret: '#00ff00', // lime color for text input caret for both dark and light themes
        loadWrapper: 'rgba(0, 0, 0, 0.1)', // black semi-transparent background for loading indicator
        loadIndicator: '#ff0000', // red color for loading indicator for both dark and light themes
        loadIndicator2: '#1e90ff', // blue color for loading indicator (Variant 2) for both dark and light themes
      };

    return {
        
      container: {
        backgroundColor: colors.background,       
      },
      primaryText: {
        fontSize: fontSize.lg,
        color: colors.primaryText,
      },
      primaryText2: {
        fontSize: fontSize.lg,
        color: colors.primaryText2,
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
        width: (size.xl*2)+4,
        height: (size.xl*2)+4,
        marginHorizontal: (spacing.xl-2)*2, 
        padding: (spacing.xs)*0.5, 
        borderColor: colors.buttonBorder,
        borderRadius: (radius.lg*4)-6,
      },
      CircleButton: {
        backgroundColor: colors.buttonColor,
        borderRadius: (radius.lg*4)-6,       
      },
      wideButtonContainer: {
        width: (size.md)*10,
        height: (size.md+2)*2,
        marginHorizontal: spacing.lg-4,
        padding: (spacing.xs)*0.5,
      },
      dropCapText : {
        fontSize: (fontSize.xxxl)*4,
        lineHeight: (fontSize.xxxl)*4,
        color: colors.primaryText,
        marginRight: (spacing.sm-2),
      },
      besideText: {
        fontSize: fontSize.xxl,
        lineHeight: fontSize.xxxl,
        color: colors.primaryText,
        paddingTop: (spacing.sm-2),
      },
      belowText: {
        fontSize: fontSize.xxl,
        lineHeight: fontSize.xxxl,
        color: colors.primaryText,
        paddingTop: (spacing.xs-1),
      },
      formsMainText: {
        color: colors.primaryText,
        fontSize: fontSize.lg,
        marginLeft: spacing.sm,
        marginTop: spacing.sm,
      },
      formsSecondaryText: {
        color: colors.secondaryText,
        fontSize: fontSize.md,
        marginLeft: spacing.sm,
        marginBottom: spacing.sm,
      },   
      inputsText: {
        height: size.xl,
        margin: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        padding: (spacing.sm-2),
        color: colors.primaryText, 
      },
      submitButton: {
        borderRadius: (radius.sm-1),       
        margin: spacing.sm, 
        padding: spacing.sm, 
      },
      clickableText: {
        color: colors.clickableText,
        fontSize: fontSize.md,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
      },
      loadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
      },
      loadWrapper: {
        width: (size.lg-1)*2,
        height: (size.lg-1)*2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: (radius.lg-2),
        backgroundColor: colors.loadWrapper,
      },
      cartItem: {
        padding: spacing.md,
        marginBottom: (spacing.xs+2),       
        borderRadius: radius.md,
        backgroundColor: colors.card,
        shadowColor: colors.border,
      },
      componentSize: {
        width: (size.md)*2,
        height: (size.md)*2,
      },
      radio: {
        width: (size.xl)*0.5,
        height: (size.xl)*0.5,
        borderRadius: (radius.lg-2),
        borderWidth: 2,
        marginRight: (spacing.xs+2),
        borderColor: colors.border,        
        backgroundColor: colors.background,
      },
      radioSelected: {
        width: (size.xl)*0.25,
        height: (size.xl)*0.25,
        borderRadius: (radius.lg-2),
        backgroundColor: colors.border,
      },
      filmCardItem: {                
        padding: spacing.md,
        marginBottom: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.card,
        shadowColor: colors.border,
      },
      filmCardButton: {
        marginTop: spacing.sm, // 12 at medium
        paddingVertical: (spacing.xs+2), // 8 at medium
        paddingHorizontal: spacing.md, // 16 at medium
        borderRadius: (radius.sm-1), // 5 at medium
      },
      spacing,
      fontSize,
      size,   
      radius,
      colors,
    };

}

