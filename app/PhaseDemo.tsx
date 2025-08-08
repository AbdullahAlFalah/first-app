import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import ProgressBar from "../components/PhaseDemo-Components/ProgressBar";
import PhaseAnimation from "../components/PhaseDemo-Components/PhaseAnimation";
import CircleButton from "@/components/CircleButton";
import { useThemeMode } from "@/hooks/ThemeContext";

export default function PhaseDemo() {

    const [phase, setPhase] = useState(0);    
    const bars = [1, 2, 3]; // We have 3 bars, but 4 phases (phase 0 = idle)

    const phaseNames = [
        "No phase", // phase 0
        "Accepting Order", // Phase 1
        "Preparation", // Phase 2
        "Delivery", // Phase 3
    ];

    // Access the theme context for styling
    const themeContext = useThemeMode();

    // Function to handle phase change
    const handlePhaseChange = () => {
        setPhase((phase + 1) % 4) // Cycle through phases: 0 → 1 → 2 → 3 → 0
    };

    return (
        <View style={[themeContext.container, { flex: 1, justifyContent: 'center', alignItems: 'center', padding: (themeContext.spacing.md+4) }]}>

            {/* Page title */}
            <Text style={[styles.title, { color: themeContext.colors.primaryText, fontSize: themeContext.fontSize.xl, marginBottom: (themeContext.spacing.md+4) }]}>Phase Demo</Text>

            {/* Progress bars row */}
            <View style={[styles.barRow, { gap: themeContext.spacing.sm }]}>
                {bars.map((barNum) => (
                    <ProgressBar key={barNum} active={phase === barNum} ThemeContext={themeContext} />
                ))}
            </View>

            {/* Phase name label */}
            <Text style={{
                color: themeContext.colors.primaryText,
                fontSize: themeContext.fontSize.lg,
                marginVertical: themeContext.spacing.md,
                fontWeight: "bold",
            }}>
                {phaseNames[phase]}
            </Text>

            {/* Shared animation space */}
            <View style={[styles.animationContainer, { width: (themeContext.size.xl)*5, height: (themeContext.size.xl)*5,  marginTop: themeContext.spacing.xl }]}>
                {/* Show animation only if phase != 0 */}
                { phase !== 0 && 
                    <PhaseAnimation phase={phase} />
                }
            </View>

            {/* Phase control circle button */}
            <CircleButton 
                icon="play-arrow"
                onPress={handlePhaseChange}
                themeContext={themeContext}
            />

        </View>
    );

}

const styles = StyleSheet.create({
    title: { 
        fontWeight: "bold",         
    },
    barRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    animationContainer: {
        alignItems: "center",
        justifyContent: "center",                
    },
});