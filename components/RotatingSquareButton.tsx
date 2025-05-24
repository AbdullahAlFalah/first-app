import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Audio } from 'expo-av';

type Props = {
  icon: keyof typeof Entypo.glyphMap;
  label?: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  audioSource?: number; 
};

export default function RotatingSquareButton({ icon, label, onPress, style, audioSource }: Props) {

    const rotation = useRef(new Animated.Value(45)).current; // Start at 45deg

    const handlePress = async () => {

        // Animate to upright
        await new Promise(resolve => 
            Animated.spring(rotation, {
                toValue: 0,
                useNativeDriver: true,
            }).start(() => resolve(null))
        );

        // Play unlock sound
        try {
            if (audioSource) {
                const { sound } = await Audio.Sound.createAsync(audioSource);
                sound.setIsLoopingAsync(false);
                sound.playAsync();
                sound.setOnPlaybackStatusUpdate(status => {
                    if (status.isLoaded && status.didJustFinish) {
                        sound.unloadAsync();
                    }
                });    
            }
        } catch (e) {
        // If sound fails, just continue
        }

        // Animate back to diamond
        await new Promise(resolve =>
            Animated.spring(rotation, {
                toValue: 45,
                useNativeDriver: true,
            }).start(() => resolve(null))
        );

        // Now call the onPress action
        onPress();

    };

    // transform: [{ rotate }] is shorthand for transform: [{ rotate: rotate }] in ES6, when the key and value have the same name.
    const rotate = rotation.interpolate({
        inputRange: [0, 45],
        outputRange: ['0deg', '45deg'],
    });

    // Inverse rotation for the icon to keep it upright
    const iconRotate = rotation.interpolate({
        inputRange: [0, 45],
        outputRange: ['0deg', '-45deg'],
    });

    return (
        <Animated.View style={[styles.animated, style, { transform: [{ rotate }] }]}>
            <Pressable 
                style={styles.RSButton} 
                onPress={handlePress}
                android_disableSound={true} // Disable default Android sound
            >
                <Animated.View style={{ transform: [{ rotate: iconRotate }] }}>
                    <Entypo name={icon} size={36} color="#fff" />
                </Animated.View>
                {label ? <Text style={styles.RSButtonLabel}>{label}</Text> : null}
            </Pressable>
        </Animated.View>
    );

}

const SIZE = 64;

const styles = StyleSheet.create({
    animated: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RSButton: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0000cd',
    },
    RSButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
});


