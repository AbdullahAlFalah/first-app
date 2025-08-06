import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeContextType } from '@/hooks/ThemeContext';

export default function Ads_BTN({ themeContext }: { themeContext: ThemeContextType }) {
  const router = useRouter();

  return (
    <Pressable
      style={[
        styles.button, 
        {
          backgroundColor: themeContext.colors.buttonBorder,
          borderRadius: (themeContext.radius.lg-2)*5,
          padding: (themeContext.spacing.md-1),
        },
      ]}
      onPress={() => router.push('/(adsAndrewards)/AdsScreen')}
    >
      <View 
        style={[
          styles.inner,
          {
            backgroundColor: themeContext.colors.buttonColor4, 
            borderColor: themeContext.colors.border,
            borderRadius: (themeContext.radius.lg-2)*4,
            paddingVertical: (themeContext.spacing.sm-2),
            paddingHorizontal: (themeContext.spacing.md+4),               
          },
        ]}
      >
        <Text style={[styles.text, { fontSize: themeContext.fontSize.md, color: themeContext.colors.primaryText2 }]}>🎉 Go to Ads 🎈</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 20,
    elevation: 3,
    
  },
  inner: {
    borderWidth: 2,   
  },
  text: {
    fontWeight: 'bold',    
    textAlign: 'center',
  },
});

