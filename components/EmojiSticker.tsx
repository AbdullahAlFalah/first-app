import React, { memo } from 'react';
import { ImageSourcePropType } from 'react-native'; 
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
  containerWidth: number;
  containerHeight: number;
};

const EmojiSticker = memo(function EmojiSticker({ imageSize, stickerSource, containerWidth, containerHeight }: Props) {

  const imageSource = stickerSource;

  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
    if (scaleImage.value !== imageSize*2) {
      scaleImage.value = scaleImage.value*2;
    } else {
      scaleImage.value = Math.round(scaleImage.value/2);
    }
    console.log("Double tap detected for sticker");
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const drag = Gesture.Pan().onChange(event => {
    // Calculate new position
    let newX = translateX.value += event.changeX;
    let newY = translateY.value += event.changeY;

    // Constrain within container bounds
    const halfSize = imageSize / 2;
    const minX = -containerWidth / 2 + halfSize;
    const maxX = containerWidth / 2 - halfSize;
    const minY = -containerHeight / 2 + halfSize;
    const maxY = containerHeight / 2 - halfSize;

    // Calculate new position within the image conatiner
    translateX.value = Math.min(Math.max(newX, minX), maxX);
    translateY.value = Math.min(Math.max(newY, minY), maxY);
  }).onEnd(() => {
    console.log("Drag ended for sticker");
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value, },
        { translateY: translateY.value, },
      ],
    };
  });

  return (
   
    <GestureDetector gesture={drag}>     
      <Animated.View style={ [containerStyle, { position: 'absolute' }] }>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image source={imageSource} resizeMode='contain' style={ [imageStyle, { width: imageSize, height: imageSize }] } />
        </GestureDetector>     
      </Animated.View>        
    </GestureDetector>

  );
  
});

export default EmojiSticker;

