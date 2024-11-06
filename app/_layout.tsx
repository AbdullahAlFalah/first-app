import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import UserProvider from "@/hooks/UserContext";
import Screenshot from "@/components/Functional/Screenshot";

export default function RootLayout() {
  return (
    
    <GestureHandlerRootView>
        <UserProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            <Stack.Screen name="+not-found"  options={{ title: 'Page not found...', headerShadowVisible: false, headerTintColor: '#fff', headerStyle: {backgroundColor: '#25292e'} }} />
          </Stack>
        </UserProvider>
    </GestureHandlerRootView>

  );
};

