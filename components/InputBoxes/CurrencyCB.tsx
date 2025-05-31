import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

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

export default function CurrencyCB({ value, onChange }: { value?: string; onChange?: (val: string) => void }) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Currency:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    dropdownIconColor={"#696969"} // Dim gray?! your number is "Sus"
                    style={styles.pickerDimensions}            
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
        marginVertical: 10,
    },
    label: { 
        fontSize: 18,  
        marginBottom: 4,
        color: "#000000",
    },
    pickerDimensions: { 
        width: 120,
    },
    pickerContainer: {  
        backgroundColor: "#8fbc8f",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#000",
    },
});


