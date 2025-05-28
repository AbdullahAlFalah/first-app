import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFilmApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";
import { isTokenValid } from "@/Utilities/TokenValidation";

// Define the type for the API response
interface ApiResponse {
    data: {
        actor_id: number;
        first_name: string;
        last_name: string;
    }[];
    ServerNote: string;
}

export const getActorsByFilmId = async (filmId: number) => {

    const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage

    if (!token) {
        console.error("Auth Token is not available; You must Login again!");
        showMsg("Unauthorized", "Auth Token is not available; You must Login again!");
        router.push("/(entry)/Sign-in");
        return;
    }

    // Validate the token before making the API call
    if (!isTokenValid(token)) {
        console.error("Invalid token; You must Login again!");
        showMsg("Unauthorized", "Invalid token; You must Login again!");
        await AsyncStorage.removeItem('token'); // Clear the invalid token
        router.push("/(entry)/Sign-in");
        return;
    }

    const url = getFilmApiUrl(`${filmId}/actors`);

    try {
        // Send data to express server
        const response = await axios.get<ApiResponse>(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
            },
        });

        const data = response.data; // Access the response data directly

        if (response.status === 200) {
            console.log("Response data:", data);
            showMsg("Actors Data Retrieved", data.ServerNote);
            return data.data.map((actor) => ({
                actorId: actor.actor_id, // Map `actor_id` to `id`
                Fname: actor.first_name,
                Lname: actor.last_name,
            })); // Return the list of actors
        } else {
            console.log("Response data:", data);
            showMsg("Actors Data wasn't Retrieved", data.ServerNote);            
        }

    } catch (error) {
        console.error("Error retrieving actors data:", error);
        showMsg("Network Error", "Unable to connect to the server. Please try again later.");
    }

};

