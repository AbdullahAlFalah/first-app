import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemeContextType } from "@/hooks/ThemeContext";

const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "SAR",
    "LBP",
    "AED"
];

export default function CurrencyCB({ value, onChange, themeContext }: { value?: string; onChange?: (val: string) => void; themeContext: ThemeContextType }) {
    
    return (
        <View style={[styles.container, { marginVertical: (themeContext.spacing.sm-2) }]}>
            <Text style={{ fontSize: themeContext.fontSize.lg, color: themeContext.colors.primaryText, marginBottom: (themeContext.spacing.xs-2) }}>Currency:</Text>
            <View style={[styles.pickerContainer, { borderRadius: themeContext.radius.sm, borderColor: themeContext.colors.border }]}>
                <Picker
                    dropdownIconColor={"#696969"} // Dim gray?! your number is "Sus"
                    style={{ width: (themeContext.size.xl*3) }}            
                    selectedValue={value||currencies[0]}               
                    onValueChange={onChange}
                >
                    {currencies.map((cur) => (
                        <Picker.Item key={cur} label={cur} value={cur} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        justifyContent: "center",
        alignItems: "center",
    },
    pickerContainer: {  
        backgroundColor: "#8fbc8f", // Dark sea green for both themes
        borderWidth: 1,        
    },
});


