import axios from 'axios';
import { getRemoteNotificationApiUrl, showMsg } from '@/Utilities/ApiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isTokenValid } from '@/Utilities/TokenValidation';
import { router } from 'expo-router';

// Define the type for the API response
interface ApiResponse {
    message: string;
}

export const registerRemoteNotification = async (token: string) => {

    if (!token) {
        console.error('No Expo push token provided. Skipping registration.');
        return null;
    }

    const url = getRemoteNotificationApiUrl('registerPushToken');
    const JWTtoken = await AsyncStorage.getItem('token');

    if (!JWTtoken) {
        console.error("Auth Token is not available; You must Login again!");
        showMsg("Unauthorized", "Auth Token is not available; You must Login again!");
        router.push("/(entry)/Sign-in");
        return null;
    }

    // Validate the token before making the API call
    if (!isTokenValid(JWTtoken)) {
        console.error("Invalid token; You must Login again!");
        showMsg("Unauthorized", "Invalid token; You must Login again!");
        await AsyncStorage.removeItem('token'); // Clear the invalid token
        router.push("/(entry)/Sign-in");
        return null;
    }

    try {              

        // Send data to express server
        const response = await axios.post<ApiResponse>(
            url, 
            { expoPushToken: token },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWTtoken}`, // Include the JWT token in the headers
                },
                timeout: 5000, // Set a timeout of 5 seconds
            }
        );

        if (response.status === 200) {
            console.log("Response message:", response.data.message);
            showMsg("Notification Registration Successful", response.data.message);
        } else {
            console.log("Response message:", response.data.message);
            showMsg("Notification Registration Failed", response.data.message);
        }
    } catch (error: any) {
        console.error("Error registering remote notification:", error.response?.data?.message || error.message);
        showMsg("Notification error", "Failed to register remote notification");
    }

}


