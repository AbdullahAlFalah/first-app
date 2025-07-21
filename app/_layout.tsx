import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import UserProvider from "@/hooks/UserContext";
import CartProvider from "@/hooks/CartContext";
import WalletProvider from "@/hooks/WalletContext";
import useRegisterPushToken from "@/Utilities/useRegisterPushToken";
import { initializeNotificationSystem } from "@/Utilities/notificationsUtils";

export default function RootLayout() {

  useEffect(() => {   

    // Register the Expo push token
    useRegisterPushToken();

    // Initialize the notification system
    let subscription: Notifications.EventSubscription | undefined;
    const setupNotifications = async () => {
      subscription = await initializeNotificationSystem();
      if (subscription) {
        console.log('Notification listener set up successfully.');
      } else {
        console.log('Failed to set up notification listener.');
      }
    };
    setupNotifications();

    

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        subscription.remove();
        console.log('Cleaning up notification listener...');
      }
    };

  }, []);

  return (
    
      <GestureHandlerRootView>
        <UserProvider>
          <WalletProvider>
            <CartProvider>
              <StatusBar style="light" />          
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(entry)" options={{ headerShown: false }} />
                <Stack.Screen name="(films)" options={{ headerShown: false}} />
                <Stack.Screen name="(adsAndrewards)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found"  options={{ title: 'Page not found...', headerShadowVisible: false, headerTintColor: '#fff', headerStyle: {backgroundColor: '#25292e'} }} />
              </Stack> 
            </CartProvider>
          </WalletProvider>
        </UserProvider>
      </GestureHandlerRootView>
        
  );
  
};


