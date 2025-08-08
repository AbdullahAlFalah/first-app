import { TouchableOpacity } from "react-native";
import { Tabs, router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

export default function EntryLayout() {

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
    }}>

        <Tabs.Screen name="MainAccount" 
            options={{ 
                title: 'Main Account', 
                tabBarIcon: ({ color, focused }) => 
                    ( <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={24} /> ),
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
        <Tabs.Screen name="Reset" 
            options={{ 
                title: 'Reset Password',
                tabBarIcon: ({ color, focused }) =>
                ( <MaterialIcons name={focused ? 'password' : 'lock-reset'} color={color} size={24} /> ),
            }} 
        />
        <Tabs.Screen name="Sign-in"
            options={{
                title: 'Login',
                // tabBarButton: () => null, // Only hides the button but it still exists
                href: null, // This removes the button completely now
            }}
        />
        <Tabs.Screen name="HomeButton"
            options={{                
                title: 'Home',
                tabBarIcon: ({ color, focused }) => 
                ( <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} /> ),
            }}
            listeners = {{
                tabPress: (e) => {
                    e.preventDefault(); // Prevent default tab navigation behavior
                    router.replace('/'); // // Redirect immediately to the home screen: '/(tabs)/index.tsx'
                },
            }}  
        />

    </Tabs>

  );

}


