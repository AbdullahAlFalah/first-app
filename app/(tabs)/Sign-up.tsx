import React from "react";
import { View, StyleSheet } from "react-native";

import Signup from "@/components/Forms/Signup";
import { useThemeMode } from "@/hooks/ThemeContext";

export default function signUp() {

    const themeContext = useThemeMode();

    return (
        
        <View style={[styles.container, themeContext.container]}>
            <Signup 
                themeContext={themeContext} // Pass the theme context here
            />           
        </View>
        
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

