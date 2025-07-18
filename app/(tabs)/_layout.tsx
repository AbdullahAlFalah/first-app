import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (

    <Tabs 
    // initialRouteName='about'
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

    </Tabs>

  );

}

