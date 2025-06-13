import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import UserProvider from "@/hooks/UserContext";
import CartProvider from "@/hooks/CartContext";
import WalletProvider from "@/hooks/WalletContext";

export default function RootLayout() {



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


