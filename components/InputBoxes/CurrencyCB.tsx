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
    "AED",
];

export default function CurrencyCB({ value, onChange }: { value?: string; onChange?: (val: string) => void }) {
    
    const [selected, setSelected] = useState(value || currencies[0]);

    const handleValueChange = (itemValue: string) => {
        setSelected(itemValue);
        if (onChange) {
            onChange(itemValue);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Currency:</Text>
            <View style={styles.pickerContainer}>
                <Picker   
                    style={styles.pickerText}            
                    selectedValue={selected}               
                    onValueChange={handleValueChange}
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
        marginVertical: 10,
    },
    label: { 
        fontSize: 18,  
        marginBottom: 4,
        color: "#000000",
    },
    pickerText: { 
        color: "#000000",
        fontSize: 16,
    },
    pickerContainer: {  
        backgroundColor: "#8fbc8f",
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#000",
        overflow: "hidden",
    },
});


