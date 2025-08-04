import React, { useState } from "react";
import { Text, Pressable, StyleSheet, View, ActivityIndicator, LayoutAnimation, UIManager, Platform } from "react-native";

import { getActorsByFilmId } from "@/api/GetActors";
import { useCart } from "@/hooks/CartContext";
import { ThemeContextType } from "@/hooks/ThemeContext";

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
    themeContext?: ThemeContextType; // Optional theme context for styling
}

// Define the type for an actor object
type Actors = {
    actorId: number;
    Fname: string;
    Lname: string;
}

export default function FilmsCard({ id, title, description, length, cost, rating, onPress, themeContext}: FilmsCardProps) {
   
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
        <Pressable style={[styles.card, themeContext?.filmCardItem]} onPress={onPress}>
            <Text style={[styles.title, { fontSize: themeContext?.fontSize.lg, color: themeContext?.colors.secondaryText2, marginBottom: themeContext?.spacing.xs }]}>{title}</Text>
            <Text style={{ fontSize: themeContext?.fontSize.sm, color: themeContext?.colors.secondaryText, marginBottom: themeContext?.spacing.xs }}>{description}</Text> 
            <Text style={{ fontSize: themeContext?.fontSize.xs, color: themeContext?.colors.secondaryText2 }}>Length: {length} mins</Text>
            <Text style={{ fontSize: themeContext?.fontSize.xs, color: themeContext?.colors.secondaryText2 }}>Cost: {cost}$</Text>
            <Text style={{ fontSize: themeContext?.fontSize.xs, color: themeContext?.colors.secondaryText2 }}>Rating: {rating}</Text>
            <Pressable style={[styles.actorInfoButton, themeContext?.filmCardButton, { backgroundColor: themeContext?.colors.card2 }]} onPress={handleMoreInfo}>
                <Text style={[styles.actorInfoText, { fontSize: themeContext?.fontSize.sm, color: themeContext?.colors.secondaryText2 }]}>More Details</Text>
            </Pressable>
            {expanded && (
                <View style={[styles.extraInfo, { borderTopColor: themeContext?.colors.border, paddingTop: themeContext?.spacing.xs, marginTop: themeContext?.spacing.md }]}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#1e90ff" />
                    ) : actors.length > 0 ? (
                        actors.map((actor) => (
                            <Text key={actor.actorId} style={{ fontSize: themeContext?.fontSize.sm, color: themeContext?.colors.secondaryText2, marginBottom: themeContext?.spacing.xs }}>
                                {actor.Fname} {actor.Lname}
                            </Text>
                        ))
                    ) : (
                        <Text style={{ fontSize: themeContext?.fontSize.sm, color: themeContext?.colors.secondaryText2 }}>No actors available!!!</Text>
                    )}
                </View>
            )}
            <Pressable style={[styles.addToCartButton, themeContext?.filmCardButton, { backgroundColor: themeContext?.colors.buttonColor2 }]} onPress={handleAddToCart}>
                <Text style={[styles.addToCartText, { fontSize: themeContext?.fontSize.sm, color: themeContext?.colors.primaryText2 }]}>Add to Cart</Text>
            </Pressable>            
        </Pressable>
    );

}

const styles = StyleSheet.create({
    card: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {          
        fontWeight: "bold",    
    },
    actorInfoButton: {                 
        alignItems: "center",
    },
    actorInfoText: {               
        fontWeight: "bold",
    },
    extraInfo: {      
        borderTopWidth: 1,      
    },
    addToCartButton: {
        alignItems: "center",
    },
    addToCartText: {
        fontWeight: "bold",
    },
});

