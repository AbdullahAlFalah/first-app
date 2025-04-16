import { useEffect } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function HomeButton() {

    useEffect(() => {
        // Redirect immediately to the home screen (tabs/index.tsx)
        router.replace('/');
      }, []);
    
      return <View />; // Render an empty view 

}

