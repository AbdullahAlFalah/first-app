import React from "react";
import { View, StyleSheet } from "react-native";

import Resetpassword from "@/components/Forms/Reset";
import Updateuser from "@/components/Forms/Updateuser";
import { useThemeMode } from "@/hooks/ThemeContext";

export default function resetPassword() {

    const themeContext = useThemeMode();

    return (
        
        <View style={[styles.container, themeContext.container]}>
            <Resetpassword themeContext={themeContext} />
            <Updateuser themeContext={themeContext} />
        </View> 

    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

