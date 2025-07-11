import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import { registerRemoteNotification } from '@/api/RegisterRemoteNotification';

/**
 * Configures notification channels, categories, and handlers for both platforms.
 * Should be called before scheduling or registering notifications.
 */
async function configureNotifications() {

    if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
        console.log('📵 Skipping notification config — Expo Go does not support native push features.');
        return;
    }
    
    if (Platform.OS === 'android') {
        // Setting the notification channel for Android
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        // Setting a notification category with a button for Android
        await Notifications.setNotificationCategoryAsync('with-button', [
            {
                identifier: 'open',
                buttonTitle: 'Open',
                options: { opensAppToForeground: true },
            },
        ]);
    }

    if (Platform.OS === 'ios') {
        // Setting the notification handler for iOS
        await Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
        // Setting a notification category with a button for iOS
        await Notifications.setNotificationCategoryAsync('with-button', [
            {
                identifier: 'open',
                buttonTitle: 'Open',
                options: { opensAppToForeground: true },
            },
        ]);
    }
}

/**
 * Requests notification permissions, registers the Expo push token with the backend,
 * and returns the Expo push token.
 */
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {

    if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
        console.log('📵 Skipping push notification registration — Expo Go does not support native push features.');
        return;
    }

    await configureNotifications(); // Ensure notifications are configured before requesting permissions

    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log('Notification permission status:', finalStatus);
        }
        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo Push Token:', token);
        // Send the token to my server
        if (token) {
            await registerRemoteNotification(token);
        }
    } else {
        console.log('Must use physical device for Push Notifications');
        return;
    }
    return token;
}

/**
 * Schedules a local notification (for testing) with custom title and message.
 * On Android, adds a button. On iOS, simple notification.
 */
export async function scheduleLocalNotification(title: string, body: string) {

    if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
        console.log('📵 Skipping local notification scheduling — Expo Go does not support native push features.');
        return;
    }

    await configureNotifications();

    const content: Notifications.NotificationContentInput = {
        title,
        body,
        sound: 'default',
        categoryIdentifier: 'with-button', // Use the same category for both platforms
    };

    await Notifications.scheduleNotificationAsync({
        content: content,
        trigger: null, // send immediately
    });
    
}


