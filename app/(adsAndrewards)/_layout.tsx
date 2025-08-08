import { TouchableOpacity } from "react-native";
import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdsRewardsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd700',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
          height: 50,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          flexGrow: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: 'center',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen
        name="AdsScreen"
        options={{
          title: 'Ads',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'megaphone' : 'megaphone-outline'}
              color={color}
              size={24}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 14, marginRight: 28, }}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="RewardsScreen"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'gift' : 'gift-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

