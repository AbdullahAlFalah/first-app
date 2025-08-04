import { View } from "react-native";

import { useThemeMode } from "@/hooks/ThemeContext";

export default function PhaseDemo() {

    // Access the theme context for styling
    const themeContext = useThemeMode();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        </View>
    );

}

