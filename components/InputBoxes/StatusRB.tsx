import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type statusRB_Props = {
    value: string;
    onChange: (val: string) => void;
};

const statuses = ["active", "inactive"];

export default function StatusRB ({ value, onChange }: statusRB_Props) {
        return (
        <View style={styles.container}>
            <Text style={styles.label}>Status:</Text>
            <View style={styles.row}>
                {statuses.map((status) => (
                    <Pressable
                        key={status}
                        style={styles.radioContainer}
                        onPress={() => onChange(status)}
                    >
                        <View style={styles.radio}>
                            {value === status && 
                                <View style={styles.radioSelected} />
                            }                       
                        </View>
                        <Text style={styles.radioLabel}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
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
    label: {
        fontSize: 18,
        marginBottom: 4,
        color: "#000000",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        backgroundColor: "#fff", // keep background white
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#000", 
    },
    radioLabel: {
        fontSize: 16,
        color: "#000000",
    },
});


