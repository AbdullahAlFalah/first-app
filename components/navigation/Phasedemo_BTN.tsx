import React from 'react';
import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { ThemeContextType } from '@/hooks/ThemeContext';

export default function Phasedemo_BTN({ themeContext }: { themeContext: ThemeContextType }) {

    return (

        <Pressable
            style={{
                backgroundColor: themeContext.colors.buttonColor2,
                marginVertical: themeContext.spacing.md,
            }}
            onPress={() => router.push('/PhaseDemo')}
        >
            <Text
                style={{
                    color: themeContext.colors.primaryText2,
                    fontSize: themeContext.fontSize.sm,
                }}
            >
                Open Phase Demo
            </Text>
        </Pressable>

    );

}

