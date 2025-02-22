import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import UserProvider from "@/hooks/UserContext";

export default function RootLayout() {



  return (
    
      <GestureHandlerRootView>
        <UserProvider>
          <StatusBar style="light" />          
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            <Stack.Screen name="+not-found"  options={{ title: 'Page not found...', headerShadowVisible: false, headerTintColor: '#fff', headerStyle: {backgroundColor: '#25292e'} }} />
          </Stack>                
        </UserProvider>
      </GestureHandlerRootView>
        
  );
  
};

