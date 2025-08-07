import React, { useCallback } from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import ScreenshotUtil from "@/Utilities/ScreenshotUtil";
import { useThemeMode } from "@/hooks/ThemeContext";

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Home() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [stickers, setStickers] = useState<{ id: number; emoji: ImageSourcePropType }[]>([]);

  const imageRef = useRef<View>(null);
  const emojiPickerRef = useRef<{ open: () => void }>(null); // Ref for EmojiPicker

  const themeContext = useThemeMode();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.')
    }
  };

  const onReset = useCallback(() => {
    setShowAppOptions(false);
    setStickers([]); // Clear all stickers when resetting
  }, []);

  const onAddSticker = useCallback((emoji: ImageSourcePropType) => {
    console.log("Adding sticker:", emoji);
    setStickers((prevStickers) => [
        ...prevStickers,
        { id: Date.now(), emoji }, // Use a unique ID for each sticker
    ]);
  }, []);

  const handleSave = async () => {
    await ScreenshotUtil.captureAndSave(imageRef.current);
  };

  return (
    <GestureHandlerRootView style={[styles.container, themeContext.container]}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
          {stickers.map((sticker) => {
            console.log(sticker.emoji); // Log the emoji for debugging
            console.log(typeof sticker.emoji); // Log the type of emoji
            return (
              <EmojiSticker key={sticker.id} imageSize={(themeContext.size.md+4)*2} stickerSource={sticker.emoji} />
            );
          })} 
        </View>        
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} themeContext={themeContext} />            
            <CircleButton
              icon="add" 
              onPress={() => {
                console.log("ref:", emojiPickerRef.current);
                console.log("ref.open:", emojiPickerRef.current?.open);
                setTimeout(() => {
                  emojiPickerRef.current?.open();
                }, 100);                
              }}
              themeContext={themeContext}
            />            
            <IconButton icon="save-alt" label="Save" onPress={handleSave} themeContext={themeContext} /> 
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>         
          <Button icon="picture-o" theme="primary" label="Choose a photo" onPress={pickImageAsync} themeContext={themeContext}/>
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} themeContext={themeContext}/>
        </View>
      )}
      {/* Notify parent when modal closes; here you can any logic you need on close; never use these on the same line as JSX components */}
      <EmojiPicker ref={emojiPickerRef} onClose={() => console.log("Emoji Picker closed")} themeContext={themeContext}> 
        <EmojiList 
          onSelect={(emoji) => { 
            onAddSticker(emoji); 
          }} 
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
  optionsContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

