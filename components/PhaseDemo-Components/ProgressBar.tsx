import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Easing } from "react-native";
import { ThemeContextType } from "@/hooks/ThemeContext";

type ProgressBarProps = {
    active: boolean; // Whether the progress bar is active or not
    ThemeContext: ThemeContextType; // Theme context for styling
};

export default function ProgressBar({ active, ThemeContext }: ProgressBarProps) {
    const translateX = useRef(new Animated.Value(-40)).current; // start before the bar
    const loopAnim = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {  
             
        if (active) {
            loopAnim.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(translateX, {
                        toValue: 80, // width of bar
                        duration: 1200,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }),
                    Animated.timing(translateX, {
                        toValue: -40,
                        duration: 0,
                        useNativeDriver: true
                    })
                ])
            );
            loopAnim.current?.start();
        } else {
            translateX.setValue(-40); // reset position
            loopAnim.current?.stop();
        }

        return () => loopAnim.current?.stop();

    }, [active]);

    return (
        <View style={[styles.container,
            {
                height: (ThemeContext.size.md/4),
                width: (ThemeContext.size.xl*2),
                borderRadius: ThemeContext.radius.md,
                backgroundColor: ThemeContext.colors.tertiaryText,
            },
        ]}>
            <View style={styles.base} />
            <Animated.View
                style={[
                    styles.runner,
                    { 
                        transform: [{ translateX }],
                        width: ThemeContext.size.xl, // width of the moving highlight
                        borderRadius: ThemeContext.radius.md,
                        backgroundColor: ThemeContext.colors.buttonColor2,                        
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",      
    },
    base: {
        flex: 1,
    },
    runner: {
        position: "absolute",
        height: "100%",
        opacity: 0.8
    }
});

