import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useResponsiveThemeStyles } from '../constants/responsiveThemeStyles';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void; // Function to set the theme persistently
    toggleTheme: () => void;
    spacing: ReturnType<typeof useResponsiveThemeStyles>['spacing'];
    fontSize: ReturnType<typeof useResponsiveThemeStyles>['fontSize'];
    radius: ReturnType<typeof useResponsiveThemeStyles>['radius'];
    colors: ReturnType<typeof useResponsiveThemeStyles>['colors'];
    container: ReturnType<typeof useResponsiveThemeStyles>['container'];
    text: ReturnType<typeof useResponsiveThemeStyles>['text'];
    
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

