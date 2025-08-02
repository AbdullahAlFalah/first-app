import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useResponsiveThemeStyles } from '../constants/responsiveThemeStyles';

type ThemeMode = 'light' | 'dark';

export type ThemeContextType = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void; // Function to set the theme persistently
    toggleTheme: () => void;
    spacing: ReturnType<typeof useResponsiveThemeStyles>['spacing'];
    fontSize: ReturnType<typeof useResponsiveThemeStyles>['fontSize'];
    size: ReturnType<typeof useResponsiveThemeStyles>['size'];
    radius: ReturnType<typeof useResponsiveThemeStyles>['radius'];
    colors: ReturnType<typeof useResponsiveThemeStyles>['colors'];
    container: ReturnType<typeof useResponsiveThemeStyles>['container'];
    primaryText: ReturnType<typeof useResponsiveThemeStyles>['primaryText'];
    primaryText2: ReturnType<typeof useResponsiveThemeStyles>['primaryText2'];
    secondaryText: ReturnType<typeof useResponsiveThemeStyles>['secondaryText'];
    tertiaryText: ReturnType<typeof useResponsiveThemeStyles>['tertiaryText'];
    boldText: ReturnType<typeof useResponsiveThemeStyles>['boldText'];
    cellText: ReturnType<typeof useResponsiveThemeStyles>['cellText'];
    titleText: ReturnType<typeof useResponsiveThemeStyles>['titleText'];
    tableContainer: ReturnType<typeof useResponsiveThemeStyles>['tableContainer'];
    tableOuterBorder: ReturnType<typeof useResponsiveThemeStyles>['tableOuterBorder'];
    tabelRow: ReturnType<typeof useResponsiveThemeStyles>['tabelRow'];
    tableRowBorder: ReturnType<typeof useResponsiveThemeStyles>['tableRowBorder'];
    CircleButtonContainer: ReturnType<typeof useResponsiveThemeStyles>['CircleButtonContainer'];
    CircleButton: ReturnType<typeof useResponsiveThemeStyles>['CircleButton'];
    wideButtonContainer: ReturnType<typeof useResponsiveThemeStyles>['wideButtonContainer'];
    dropCapText: ReturnType<typeof useResponsiveThemeStyles>['dropCapText'];
    besideText: ReturnType<typeof useResponsiveThemeStyles>['besideText'];
    belowText: ReturnType<typeof useResponsiveThemeStyles>['belowText'];
    formsMainText: ReturnType<typeof useResponsiveThemeStyles>['formsMainText'];
    formsSecondaryText: ReturnType<typeof useResponsiveThemeStyles>['formsSecondaryText'];
    inputsText: ReturnType<typeof useResponsiveThemeStyles>['inputsText'];
    submitButton: ReturnType<typeof useResponsiveThemeStyles>['submitButton'];
    clickableText: ReturnType<typeof useResponsiveThemeStyles>['clickableText'];
    loadContainer: ReturnType<typeof useResponsiveThemeStyles>['loadContainer'];
    loadWrapper: ReturnType<typeof useResponsiveThemeStyles>['loadWrapper'];
    cartItem: ReturnType<typeof useResponsiveThemeStyles>['cartItem'];
    componentSize: ReturnType<typeof useResponsiveThemeStyles>['componentSize'];
    
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [themeState, setThemeState] = useState<ThemeMode>('light');
    const responsiveTheme = useResponsiveThemeStyles(themeState);

    useEffect(() => {
        const loadTheme = async () => {
        const savedTheme = await AsyncStorage.getItem('user-theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            setThemeState(savedTheme);
        }
        };
        loadTheme();
    }, []);

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        AsyncStorage.setItem('user-theme', newTheme);
    };

    const toggleTheme = () => {
        const newTheme = themeState === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        console.log("Theme toggled to:", newTheme);
    };

    return (
        <ThemeContext.Provider 
            value={{ 
                theme: themeState, 
                setTheme, 
                toggleTheme,
                ...responsiveTheme  // Spread responsive theme props here
            }}
        >
            {children}
        </ThemeContext.Provider>
    );

};

export const useThemeMode = () => {

    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeMode must be used within a ThemeProvider');
    return context;

};

export default ThemeProvider;

