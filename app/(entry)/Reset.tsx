import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import Resetpassword from "@/components/Forms/Reset";
import Updateuser from "@/components/Forms/Updateuser";
import { useThemeMode } from "@/hooks/ThemeContext";

export default function resetPassword() {

    const themeContext = useThemeMode();

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={(themeContext.spacing.xl*2)} // adjust if you have a header
        > 
            <ScrollView 
                contentContainerStyle={[styles.container, themeContext.container]}
                keyboardShouldPersistTaps="handled"
            >
                <Resetpassword themeContext={themeContext} />
                <Updateuser themeContext={themeContext} />
            </ScrollView>
        </KeyboardAvoidingView>

    );
    
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Use flexGrow for ScrollView content
    },
});

