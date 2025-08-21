import * as Notifications from 'expo-notifications';
import { Platform, Linking } from 'react-native';
import { showAlertWithAction } from './showAlertWithAction';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Application from 'expo-application';
import { waitForAppActiveOnce, sleep } from './waitAppActive';

export default async function ensureExpoNotificationPermission(): Promise<boolean> {
    try {

        // Check existing permission
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        console.log('Existing notification permission status:', existingStatus);
        if (existingStatus === 'granted') { return true; } // Permission already granted

        // Permission not granted
        console.log('Notification permission not granted; user needs to enable it.');
        const { status } = await Notifications.requestPermissionsAsync();
        let secondStatus = status;
        console.log('Is notification permission given now? second status:', secondStatus);
        if (secondStatus === 'granted') { return true; } // Permission granted on second check

        // Permission still not granted → prompt user to settings
        console.log('Failed to get notification permission for push notification!');            
        console.log('Notification permission not granted; prompting settings...'); 
        await new Promise<void>((resolve) => {
            showAlertWithAction(
                'Notification Permission Required',
                'To receive important updates, please enable notifications in settings.',
                'Open Settings',
                async () => {
                    // deep link to app settings
                    if (Platform.OS === 'ios') {
                        Linking.openURL('app-settings:');
                    } else {
                        IntentLauncher.startActivityAsync(
                            IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
                            { data: `package:${Application.applicationId}` }
                        );
                    }
                    await waitForAppActiveOnce(); // Only resolve after app comes back
                    await sleep(1200); // Small buffer
                    resolve();
                }
            );
        });

        // Re-check permission
        let { status: finalStatus } = await Notifications.getPermissionsAsync();
        if (finalStatus === 'granted') {
            return true; // Permission granted on final check
        }
        else {
            return false;
        }

    } catch (err) {
        console.error('Error while requesting notification permissions:', err);
        return false;
    }
}
