import { TouchableOpacity } from "react-native";
import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FilmsLayout() {

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

        <Tabs.Screen name="Films" 
            options={{ 
                title: 'Films', 
                tabBarIcon: ({ color, focused }) => 
                    ( <Ionicons name={focused ? 'film' : 'film-outline'} color={color} size={24} /> ), 
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
        <Tabs.Screen name="Cart" 
            options={{ 
                title: 'Cart',
                tabBarIcon: ({ color, focused }) =>
                ( <Ionicons name={focused ? 'cart' : 'cart-outline'} color={color} size={24} /> ),
            }} 
        />

    </Tabs>

  );

}


