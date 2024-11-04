import { Stack } from "expo-router";

import UserProvider from "@/hooks/UserContext";

export default function RootLayout() {
  return (
    
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="+not-found"  options={{ title: 'Page not found...', headerShadowVisible: false, headerTintColor: '#fff', headerStyle: {backgroundColor: '#25292e'} }} />
      </Stack>
    </UserProvider>

  );
}

