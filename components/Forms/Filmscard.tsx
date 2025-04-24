import React, { useState } from "react";
import { Text, Pressable, StyleSheet, View, ActivityIndicator, LayoutAnimation, UIManager, Platform } from "react-native";

import { getActorsByFilmId } from "@/api/GetActors";
import { useCart } from "@/hooks/CartContext";

//Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FilmsCardProps {
    id: number;
    title: string;
    description: string;
    length: number;
    cost: number;
    rating: string;
    onPress?: () => void; // Optional callback for when the card is pressed
}

// Define the type for an actor object
type Actors = {
    actorId: number;
    Fname: string;
    Lname: string;
}

export default function FilmsCard({ id, title, description, length, cost, rating, onPress}: FilmsCardProps) {
   
    const [expanded, setExpanded] = useState<boolean>(false); // State to manage card expansion
    const [actors, setActors] = useState<Actors[]>([]); // State to store actors data
    const [loading, setLoading] = useState<boolean>(false); // State to manage loading state for actors

    const { addToCart } = useCart(); // Access the addToCart function
    
    const handleMoreInfo = async () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate the card expansion
        setExpanded(!expanded);

        if (!expanded && actors.length === 0) {
            // Fetch actors only if the card is being expanded and actors are not already fetched
            setLoading(true);
            try {
                const data = await getActorsByFilmId(id); // Fetch actors by film ID
                setActors(data || []); // Update the actors state
            } catch (error) {
                console.error("Error fetching actors:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAddToCart = () => {
        addToCart({ id, title, cost }); // Add the film to the cart
    };

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.info}>Length: {length} mins</Text>
            <Text style={styles.info}>Cost: {cost}$</Text>
            <Text style={styles.info}>Rating: {rating}</Text>
            <Pressable style={styles.actorInfoButton} onPress={handleMoreInfo}>
                <Text style={styles.actorInfoText}>More Details</Text>
            </Pressable>
            {expanded && (
                <View style={styles.extraInfo}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#1e90ff" />
                    ) : actors.length > 0 ? (
                        actors.map((actor) => (
                            <Text key={actor.actorId} style={styles.actor}>
                                {actor.Fname} {actor.Lname}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>No actors available</Text>
                    )}
                </View>
            )}
            <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
            </Pressable>            
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
    addToCartButton: {
        marginTop: 12,
        backgroundColor: "#1e90ff",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: "center",
    },
    addToCartText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    actorInfoButton: {
        marginTop: 12,
        backgroundColor: "#f0f0f0",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: "center",
    },
    actorInfoText: {
        color: "#333",
        fontSize: 14,
        fontWeight: "bold",
    },
    extraInfo: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingTop: 8,
    },
    actor: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
    },
    noDataText: {
        fontSize: 14,
        color: "#999",
    },
});

