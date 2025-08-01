import { Text, View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useRef } from 'react';
import DropCapText from '../../components/DropCapText'; 
import { useThemeMode } from "@/hooks/ThemeContext";

export default function About() {

  const themeContext = useThemeMode();

  const [fontsLoaded] = useFonts({
    'TimesNewRoman': require('../../assets/fonts/times-new-roman.ttf'),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current; // slide up effect

  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={[
        styles.loadingContainer, 
        { backgroundColor: themeContext.colors.background, },
      ]}>
        <ActivityIndicator size="large" color={themeContext.colors.primaryText} />
        <Text style={[styles.loadingText, themeContext.primaryText]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: themeContext.colors.background, 
        padding: (themeContext.spacing.md+4),
      },
    ]}>
      <Animated.View style={[
        {
          opacity: fadeAnim, 
          transform: [{ translateY }], 
        }, 
      ]}>       
          <DropCapText 
            text={`Welcome to Mish Mash!\nThis app is a chaotic blend of features,\neach one representing different aspects of my mobile development journey.\nIt is intentionally varied and a little unpredictable, just like the creative process itself.\nDive in and explore this unique showcase of my skills, where each feature brings something different to the table!`}
            dropCapStyle={styles.DropCapText}
            textStyle={styles.ParagraphText}
            themeContext={themeContext} // Pass the theme context here
          />
      </Animated.View>      
    </View>
  );

}

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',     
    },
    loadingText: {     
      fontSize: 20,
      color: '#fff',
      marginTop: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    DropCapText: {
      fontFamily: 'TimesNewRoman',
    },
    ParagraphText: {
      fontFamily: 'TimesNewRoman',
    },
  });

