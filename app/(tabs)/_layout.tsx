import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#ffd700', 
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
            backgroundColor: '#25292e'
        }, 
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#25292e',
        },
    }}>
        <Tabs.Screen name="index" 
            options={{ 
                title: 'Home', 
                tabBarIcon: ({ color, focused }) => 
                    ( <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} /> ),  
            }} 
        />
        <Tabs.Screen name="about" 
            options={{ 
                title: 'About',
                tabBarIcon: ({ color, focused }) =>
                ( <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} /> ),
            }} 
        />
        <Tabs.Screen name="Sign-up" 
            options={{ 
                title: 'Register',
                tabBarIcon: ({ color, focused }) =>
                ( <Ionicons name={focused ? 'key' : 'key-outline'} color={color} size={24} /> ),
            }} 
        />
        <Tabs.Screen name="Sign-in"
            options={{
                title: 'Login',
                tabBarButton: () => null,  // Hides from tab bar
                /* tabBarStyle: { display: 'none' },  Keeps the entire tab bar hidden */
            }}
        />
        <Tabs.Screen name='MainAccount'
            options={{
                title: 'Main Page',
                tabBarButton: () => null,                 
            }}
        />
        <Tabs.Screen name='Reset'
            options={{
                title: 'Password Reset',
                tabBarButton: () => null,
            }}
        />    
    </Tabs>
  );
}

