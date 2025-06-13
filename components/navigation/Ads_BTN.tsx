import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Ads_BTN() {
  const router = useRouter();

  return (
    <Pressable
      style={styles.button}
      onPress={() => router.push('/(adsAndrewards)/AdsScreen')}
    >
      <View style={styles.inner}>
        <Text style={styles.text}>🎉 Go to Ads 🎈</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffd700',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginVertical: 20,
    alignSelf: 'center',
  },
  inner: {
    backgroundColor: '#ff69b4',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

