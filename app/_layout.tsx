import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="Sign-in" options={{ title: 'Login', headerShadowVisible: false, headerTintColor: '#fff', headerStyle: {backgroundColor: '#25292e'} }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

