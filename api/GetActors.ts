import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFilmApiUrl, showMsg } from "@/Utilities/ApiUtils";

export const getActorsByFilmId = async (filmId: number) => {

    const url = getFilmApiUrl(`${filmId}/actors`);
    const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage

    try {
        // Send data to express server
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
            },
        });

        const data = response.data; // Access the response data directly

        if (response.status === 200) {
            console.log("Response data:", data);
            showMsg("Actors Data Retrieved", data.ServerNote);
            return data.data; // Return the list of actors
        } else {
            console.log("Response data:", data);
            showMsg("Actors Data wasn't Retrieved", data.ServerNote);            
        }

    } catch (error) {
        console.error("Error retrieving actors data:", error);
        showMsg("Network Error", "Unable to connect to the server. Please try again later.");
    }

};

