import React, { memo } from 'react';
import { ImageSourcePropType } from 'react-native'; 
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

const EmojiSticker = memo(function EmojiSticker({ imageSize, stickerSource }: Props) {

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
    translateX.value += event.changeX;
    translateY.value += event.changeY;
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

