import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

import { getfilms } from '@/api/GetFilms'; // Import the API function
import FilmsCard from '@/components/Forms/Filmscard'; // Import the FilmsCard component

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

    const [films, setFilms] = useState<Film[]>([]); // State to store films data
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const data: Film[] = await getfilms(); // Fetch films data from the API
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
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1e90ff" />
                <Text style={styles.loadingText}>Loading films...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {films.map((film) => (
                <FilmsCard
                    key={film.id} // Use a unique key for each card
                    title={film.title}
                    description={film.description}
                    length={film.length}
                    cost={film.cost}
                    rating={film.rating}
                    onPress={() => console.log(`Selected Film ID: ${film.id}`)} // Example onPress action
                />
            ))}
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
});

