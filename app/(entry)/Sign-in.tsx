import React from "react";
import { View, StyleSheet } from "react-native";

import Signin from "@/components/Forms/Signin";
import { useThemeMode } from "@/hooks/ThemeContext";

export default function signIn() {

    const themeContext = useThemeMode();

    return (

        <View style={[styles.container, themeContext.container]}>
            <Signin themeContext={themeContext} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

