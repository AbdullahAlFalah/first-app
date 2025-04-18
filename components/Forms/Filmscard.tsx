import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

interface FilmsCardProps {
    title: string;
    description: string;
    length: number;
    cost: number;
    rating: string;
    onPress?: () => void; // Optional callback for when the card is pressed
}

export default function FilmsCard({title, description, length, cost, rating, onPress}: FilmsCardProps) {
   
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.info}>Length: {length} mins</Text>
            <Text style={styles.info}>Cost: {cost}$</Text>
            <Text style={styles.info}>Rating: {rating}</Text>
        </Pressable>
    );

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    info: {
        fontSize: 12,
        color: "#999",
    },
});

