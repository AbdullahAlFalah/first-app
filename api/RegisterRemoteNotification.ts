import axios from 'axios';
import { getRemoteNotificationApiUrl, showMsg } from '@/Utilities/ApiUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for the API response
interface ApiResponse {
    message: string;
}

export const registerRemoteNotification = async (token: string) => {

    const url = getRemoteNotificationApiUrl('registerPushToken');
    const JWTtoken = await AsyncStorage.getItem('token');

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
            }
    );

        if (response.status === 200) {
            console.log("Response message:", response.data.message);
            showMsg("Notification Registration Successful", response.data.message);
        } else {
            console.log("Response message:", response.data.message);
            showMsg("Notification Registration Failed", response.data.message);
        }
    } catch (error) {
        console.error("Error registering remote notification:", error);
        showMsg("Notification error", "Failed to register remote notification.");
    }
}


