import axios from 'axios';
import { getRemoteNotificationApiUrl, showMsg } from '@/Utilities/ApiUtils';
import { useUserinfo } from '@/hooks/UserContext';
import { router } from 'expo-router';

// Define the type for the API response
interface ApiResponse {
    message: string;
}

export const registerRemoteNotification = async (token: string) => {
    const { globalemail } = useUserinfo(); // Access the context to get the global email

    if (!globalemail) {
        console.error("Global email is not set; You must Login again!");
        showMsg("Unauthorized", "You must Login again!");
        router.push("/(entry)/Sign-in");
        return;
    }

    const url = getRemoteNotificationApiUrl('registerPushToken');

    try {       
        // Send data to express server
        const response = await axios.post<ApiResponse>(url, {
            email: globalemail,
            expoPushToken: token,
        });

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


