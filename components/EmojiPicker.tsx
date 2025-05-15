import React, { memo, useImperativeHandle, useState, forwardRef, useRef } from 'react';
import { View, Animated, Text, Pressable, StyleSheet, Easing } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = PropsWithChildren<{
  onClose: () => void;
}>;

const EmojiPicker = memo(
  forwardRef(function EmojiPicker({ children, onClose }: Props, ref) { // Use `forwardRef` to expose methods to the parent component

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen

    // Open handler
    const handleOpen = () => {
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Slide into view
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    };

    // Close handler
    const handleClose = () => {
      Animated.timing(slideAnim, {
        toValue: 300, // Slide out of view
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
      setIsVisible(false); // Hide after animation completes
      onClose(); // Notify parent when modal closes or any other logic you need
      });
    };

    // Expose `handleOpen` to the parent via `ref`
    useImperativeHandle(ref, () => ({
      open: handleOpen,
    }));

    if (!isVisible) return null; // Don't render if not visible

    console.log("EmojiPicker children:", children, "type:", typeof children);

    return (
      <View style={styles.overlay} pointerEvents="box-none">
        <Animated.View style={[styles.pickerContainer, { transform: [{ translateY: slideAnim }] } ]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>          
          {children}
        </Animated.View>
      </View>
    );
  })
);

export default EmojiPicker;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
