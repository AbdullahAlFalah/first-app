import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from "@/Utilities/notificationsUtils";
import { registerRemoteNotification } from '@/api/RegisterRemoteNotification';

export default async function useRegisterPushToken() {    
    
    // Get the Expo push token from AsyncStorage
    const storedExpoPushToken = await AsyncStorage.getItem('expoPushToken');
    // Register the remote notification with the Expo push token
    if (storedExpoPushToken) {                
        // Send the stored Expo push token to my backed server
        await registerRemoteNotification(storedExpoPushToken);
    } else {
        console.log('No Expo push token available for registration. Let us create one now...');
        // Register the push token if it is not already set
        const newExpoPushToken = await registerForPushNotificationsAsync(); 
        // Set the token in the async storage      
        if (newExpoPushToken) {
            await AsyncStorage.setItem('expoPushToken', newExpoPushToken || '');
            // Send the new Expo push token to my backed server
            console.log('Registering remote notification with token:', newExpoPushToken);
            await registerRemoteNotification(newExpoPushToken);           
        } else {
            console.log('No token received from getExpoPushTokenAsync');
        }       
    }

}

