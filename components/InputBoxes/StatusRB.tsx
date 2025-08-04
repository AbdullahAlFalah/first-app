import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { useWalletContext } from "@/hooks/WalletContext";
import { ThemeContextType } from "@/hooks/ThemeContext";

type statusRB_Props = {
    value: string;
    onChange: (val: string) => void;
    themeContext: ThemeContextType;
};

const statuses = ["active", "inactive"];

export default function StatusRB ({ value, onChange, themeContext }: statusRB_Props) {

    const { status } = useWalletContext();

    return (
        <View style={[styles.container, { marginVertical: (themeContext.spacing.sm-2) }]}>
            <Text style={{ fontSize: themeContext.fontSize.lg, color: themeContext.colors.primaryText, marginBottom: (themeContext.spacing.sm-2) }}>Current Status: {status.charAt(0).toUpperCase() + status.slice(1)}</Text>
            <View style={[styles.row, { marginBottom: (themeContext.spacing.xs-1) }]}>
                {statuses.map((status) => (
                    <Pressable
                        key={status}
                        style={[styles.radioContainer, { marginHorizontal: themeContext.spacing.lg }]}
                        onPress={() => onChange(status)}
                    >
                        <View style={[styles.radio, themeContext.radio]}>
                            {value === status && 
                                <View style={[styles.radioSelected, themeContext.radioSelected]} />
                            }                       
                        </View>
                        <Text style={[styles.radioLabel, { fontSize: themeContext.fontSize.md, color: themeContext.colors.primaryText }]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
                    </Pressable>
                ))}
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
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 25, // add space between buttons
    },
    radio: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", // keep background white
    },
    radioSelected: {
        backgroundColor: "#000", // smaller black background for selected state
    },
    radioLabel: {
        fontSize: 16,
        color: "#000000",
    },
});


