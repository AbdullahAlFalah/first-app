import React from 'react';
import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { ThemeContextType } from '@/hooks/ThemeContext';

export default function Phasedemo_BTN({ themeContext }: { themeContext: ThemeContextType }) {

    return (

        <Pressable
            style={{
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: themeContext.colors.buttonColor2,
                borderRadius: themeContext.radius.sm,
                margin: themeContext.spacing.sm, // Affects outer spacing
                marginTop: themeContext.spacing.lg, // Affects outer spacing on top of the button
                padding: themeContext.spacing.sm, // Affects inner spacing
            }}
            onPress={() => router.push('/PhaseDemo')}
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: themeContext.colors.primaryText2,
                    fontSize: themeContext.fontSize.md,
                }}
            >
                Open Phase Demo
            </Text>
        </Pressable>

    );

}

