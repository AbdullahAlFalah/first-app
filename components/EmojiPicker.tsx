import React, { memo, useImperativeHandle, useState, forwardRef, useRef } from 'react';
import { View, Animated, Text, Pressable, StyleSheet, Easing } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemeContextType } from '@/hooks/ThemeContext';

type Props = {
  children: React.ReactElement<{ themeContext: ThemeContextType }>;
  onClose: () => void;
  themeContext: ThemeContextType;
};

const EmojiPicker = memo(
  forwardRef(function EmojiPicker({ children, onClose, themeContext }: Props, ref) { // Use `forwardRef` to expose methods to the parent component

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
      <View style={[
        styles.overlay, 
        { 
          backgroundColor: themeContext.colors.transparentColor, // Transparent background
        }
      ]} 
      pointerEvents="box-none">
        <Animated.View style={[
          styles.pickerContainer, 
          {
            backgroundColor: themeContext?.colors.background, 
            borderTopRightRadius: ((themeContext?.radius.md ?? 9)+1)*2,
            borderTopLeftRadius: ((themeContext?.radius.md ?? 9)+1)*2, 
            transform: [{ translateY: slideAnim }] 
          } 
        ]}>
          <View style={[
            styles.titleContainer,
            {
              backgroundColor: '#464C55', // Static background color for the title container
              borderTopRightRadius: ((themeContext?.radius.md ?? 9)+2),
              borderTopLeftRadius: ((themeContext?.radius.md ?? 9)+2),
              paddingHorizontal: ((themeContext?.spacing.md ?? 20)+4),
            },
          ]}>
            <Text style={{ color: themeContext?.colors.primaryText2, fontSize: themeContext?.fontSize.md }}>Choose a sticker</Text>
            <Pressable onPress={handleClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>          
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { themeContext })
              : child
          )}
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
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    height: '25%',
    width: '100%',
  },
  titleContainer: {
    height: '16%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
