import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import UserProvider from "@/hooks/UserContext";
import CartProvider from "@/hooks/CartContext";
import WalletProvider from "@/hooks/WalletContext";
import ThemeProvider from "@/hooks/ThemeContext";
import { initializeNotificationSystem } from "@/Utilities/notificationsUtils";

export default function RootLayout() {

  useEffect(() => {   

    // Initialize the notification system
    let subscriptions: {
      responseSubscription?: Notifications.EventSubscription,
      receivedSubscription?: Notifications.EventSubscription
    } = {};
       
    const setupNotifications = async () => {
      subscriptions = ( await initializeNotificationSystem() ) ?? {};
      if (subscriptions.responseSubscription && subscriptions.receivedSubscription) {
        console.log('Notification listener set up successfully.');
      } else {
        console.log('Failed to set up notification listener.');
      }
    };
    setupNotifications();

    // Cleanup subscription on unmount
    return () => {
      if (subscriptions.responseSubscription && subscriptions.receivedSubscription) {
        subscriptions.responseSubscription.remove();
        subscriptions.receivedSubscription.remove();
        console.log('Cleaning up notification listener...');
      }
    };

  }, []);

  return (
    
      <GestureHandlerRootView>
        <ThemeProvider>
          <UserProvider>
            <WalletProvider>
              <CartProvider>
                <StatusBar style="light" />          
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(entry)" options={{ headerShown: false }} />
                  <Stack.Screen name="(films)" options={{ headerShown: false }} />
                  <Stack.Screen name="(adsAndrewards)" options={{ headerShown: false }} />
                  {/* My two new screens */}
                  <Stack.Screen 
                    name="Wallet"  
                    options={{
                      title: 'Wallet',
                      headerShadowVisible: false,
                      headerTintColor: '#fff',
                      headerStyle: { backgroundColor: '#25292e' },
                    }}
                  />
                  <Stack.Screen 
                    name="PhaseDemo"  
                    options={{
                      title: 'Phase Demo',
                      headerShadowVisible: false,                      
                      headerTintColor: '#fff',
                      headerStyle: { backgroundColor: '#25292e' },
                    }}
                  />
                  <Stack.Screen name="+not-found"  options={{ title: 'Page not found...', headerShadowVisible: false, headerTintColor: '#fff', headerStyle: {backgroundColor: '#25292e'} }} />
                </Stack> 
              </CartProvider>
            </WalletProvider>
          </UserProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
        
  );
  
};


