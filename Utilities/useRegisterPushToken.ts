import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from "@/Utilities/notificationsUtils";
import { registerRemoteNotification } from '@/api/RegisterRemoteNotification';

export default async function useRegisterPushToken() {  

    try {
        console.log('useRegisterPushToken started');

        // Get the Expo push token from AsyncStorage
        const storedExpoPushToken = await AsyncStorage.getItem('expoPushToken');

        // Register the remote notification with the Expo push token
        if (storedExpoPushToken) {    
            console.log('Calling registerRemoteNotification with stored token');            
            // Send the stored Expo push token to my backed server
            await registerRemoteNotification(storedExpoPushToken);
            console.log('registerRemoteNotification done with stored token:', storedExpoPushToken);
        } else {
            console.log('No Expo push token available for registration. Let us create one now...');
            // Register the push token if it is not already set
            const newExpoPushToken = await registerForPushNotificationsAsync(); 
            console.log('New token from registerForPushNotificationsAsync:', newExpoPushToken);
            // Set the token in the async storage      
            if (newExpoPushToken) {
                await AsyncStorage.setItem('expoPushToken', newExpoPushToken);

                console.log('Calling registerRemoteNotification with new token');                
                // Send the new Expo push token to my backed server
                await registerRemoteNotification(newExpoPushToken);
                console.log('registerRemoteNotification done with new token:', newExpoPushToken);           
            } else {
                console.log('No token received from getExpoPushTokenAsync');
                return;
            }
            console.log('useRegisterPushToken finished successfully');      
        }
    } catch (error) {
        console.error('Error in useRegisterPushToken:', error);
    }

}

