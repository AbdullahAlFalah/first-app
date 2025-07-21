import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { getApiUrl, showMsg } from "@/Utilities/ApiUtils";
import useRegisterPushToken from "@/Utilities/useRegisterPushToken";

export const signin = async ( email: string, password: string ) => {
   
    const url = getApiUrl(`login`);
    
    try {

        // Send data to express server
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.indexOf('application/json') !== -1) {
            data = await response.json();
        } else {
            const text = await response.text();
            throw new Error(`Unexpected response format: ${text}`);
        }

        if (response.ok) {

            // Store the JWT (for React Native)
            await AsyncStorage.setItem('token', data.token); 
            console.log("JWT token stored successfully:", data.token);
            console.log("Response data:", data);
            showMsg("Login Successful", data.ServerNote);

            // Register the Expo push token
            await useRegisterPushToken();

            // Navigate to the main account page
            router.push('/(entry)/MainAccount');

        } else {
            console.log("Response data:", data);
            showMsg("Login Failed", data.ServerNote);
        }
    } catch (error) {
        console.error("Error submitting login data:", error);
        showMsg("Network Error", "Unable to connect to the server. Please try again later.");
    }

};

