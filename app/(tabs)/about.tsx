import { Text, View, StyleSheet } from 'react-native';

export default function first() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
              Welcome to Mish Mash! This app is a chaotic blend of features, each one representing different aspects of my mobile development journey. 
              It is intentionally varied and a little unpredictable, just like the creative process itself. 
              Dive in and explore this unique showcase of my skills, where each feature brings something different to the table!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
    },
  });