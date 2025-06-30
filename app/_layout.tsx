import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import UserProvider from "@/hooks/UserContext";
import CartProvider from "@/hooks/CartContext";
import WalletProvider from "@/hooks/WalletContext";
import { registerForPushNotificationsAsync } from "@/Utilities/notificationsUtils";

export default function RootLayout() {

  useEffect(() => {
    // Register for remote push notifications
    registerForPushNotificationsAsync();

    // Listen for remote sent notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // TypeScript may not recognize categoryIdentifier, so use 'as any'
      const category = (response.notification.request.content as any).categoryIdentifier;
      if ( category === 'with-button' && response.actionIdentifier === 'open' ) {
          // Handle button press here (navigate, show alert, etc.)
          console.log("Open button pressed!");
      }
    });
    return () => subscription.remove();
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


