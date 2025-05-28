import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFilmApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";
import { isTokenValid } from "@/Utilities/TokenValidation";

// Define the type for a film object
interface Film {
    id: number;
    title: string;
    description: string;
    length: number;
    cost: number;
    rating: string;
}

// Define the type for the API response
interface ApiResponse {
    data: {
        film_id: number;
        title: string;
        description: string;
        length: number;
        replacement_cost: number;
        rating: string;
    }[];
    ServerNote: string;
}

export const getfilms = async (): Promise<Film[] | null> => {
      
    const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage

    if (!token) {
        console.error("Auth Token is not available; You must Login again!");
        showMsg("Unauthorized", "Auth Token is not available; You must Login again!");
        router.push("/(entry)/Sign-in");
        return null;
    }

    // Validate the token before making the API call
    if (!isTokenValid(token)) {
        console.error("Invalid token; You must Login again!");
        showMsg("Unauthorized", "Invalid token; You must Login again!");
        await AsyncStorage.removeItem('token'); // Clear the invalid token
        router.push("/(entry)/Sign-in");
        return null;
    }

    const url = getFilmApiUrl(`getfilmsinfo`);

    try {

        // Send data to express server
        const response = await axios.get<ApiResponse>(url, {
            headers: {
                'Content-Type': 'application/json', // not needed in get requests, but good practice
                'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
            },
        });

        const data = response.data; // Access the response data directly

        if (response.status === 200) {
            console.log("Response data:", data);
            showMsg("Film Data Retrieved", data.ServerNote);
            // Map the data to rename `film_id` to `id`
            return data.data.map((film) => ({
                id: film.film_id, // Map `film_id` to `id`
                title: film.title,
                description: film.description,
                length: film.length,
                cost: film.replacement_cost,
                rating: film.rating,
            })); // Return the list of films
        } else {
            console.log("Response data:", data);
            showMsg("Film Data wasn't Retrieved", data.ServerNote);
            return []; // Return an empty array if the request failed
        }

    } catch (error) {
        console.error("Error retrieving film data:", error);
        showMsg("Network Error", "Unable to connect to the server. Please try again later.");
        return []; // Return an empty array if the request fails
    }

};

