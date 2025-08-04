import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, ViewStyle } from 'react-native';

import { getfilms } from '@/api/GetFilms'; // Import the API function
import FilmsCard from '@/components/Forms/Filmscard'; // Import the FilmsCard component
import { useThemeMode } from "@/hooks/ThemeContext";

// Define the type for a film object
interface Film {
    id: number;
    title: string;
    description: string;
    length: number;
    cost: number;
    rating: string;
}

export default function Films() {

    const [films, setFilms] = useState<Film[] | null>([]); // State to store films data
    const [loading, setLoading] = useState(true); // State to manage loading state

    // Access the theme context for styling
    const themeContext = useThemeMode();

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data = await getfilms(); // Fetch films data from the API
                setFilms(data); // Update the films state with the fetched data
            } catch (error) {
                console.error("Error fetching films:", error);
            } finally {
                setLoading(false); // Stop the loading indicator
            }
        };

        fetchFilms();
    }, []);

    if (loading) {
        return (
            <View style={themeContext.loadContainer as ViewStyle}>
                <ActivityIndicator style={themeContext.loadWrapper as ViewStyle} size="large" color={themeContext.colors.loadIndicator2} />
                <Text style={
                    {
                        fontSize: themeContext.fontSize.md,
                        color: themeContext.colors.secondaryText,
                        marginTop: (themeContext.spacing.sm-2),
                    }
                }>
                    Loading films...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={[themeContext.container, { padding: themeContext.spacing.md }]}>
            {films && films.length > 0 ? (
                films.map((film) => (
                    <FilmsCard
                        key={film.id} // Use a unique key for each card
                        id={film.id} // Pass the film ID to the card is needed here
                        title={film.title}
                        description={film.description}
                        length={film.length}
                        cost={film.cost}
                        rating={film.rating}
                        onPress={() => console.log(`Selected Film ID: ${film.id}`)} // Example onPress action
                        themeContext={themeContext} // Pass the theme context for dynamic styling
                    />
                ))
            ) : (
                <Text style={[
                    styles.text, 
                    {
                        fontSize: themeContext.fontSize.lg,
                        color: themeContext.colors.secondaryText2,
                        marginTop: (themeContext.spacing.md+4),
                    },
                ]}>
                    No films found.
                </Text>
            )}
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
    },
});

