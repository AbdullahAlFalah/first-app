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

  // New center position
  const centerX = useSharedValue(containerWidth / 2);
  const centerY = useSharedValue(containerHeight / 2);

  const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
    // Determine the new scale
    const newScale = scaleImage.value !== imageSize * 2 ? scaleImage.value * 2 : Math.round(scaleImage.value / 2);

    // Clamp center so sticker stays fully inside the image after scaling
    const halfSize = newScale / 2;
    centerX.value = Math.min(Math.max(centerX.value, halfSize), containerWidth - halfSize);
    centerY.value = Math.min(Math.max(centerY.value, halfSize), containerHeight - halfSize);

    // **Update the shared value** — the spring animation is applied automatically in imageStyle
    scaleImage.value = newScale;

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
    let newCenterX = centerX.value + event.changeX;
    let newCenterY = centerY.value + event.changeY;

    // Clamp the sticker's position so it stays fully within the image boundaries
    const halfSize = scaleImage.value / 2;
    centerX.value = Math.min(Math.max(newCenterX, halfSize), containerWidth - halfSize);
    centerY.value = Math.min(Math.max(newCenterY, halfSize), containerHeight - halfSize);
  }).onEnd(() => {
    console.log("Drag ended for sticker");
  });

  const containerStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: centerX.value - scaleImage.value / 2,
    top: centerY.value - scaleImage.value / 2,
    width: scaleImage.value,
    height: scaleImage.value,
  }));

  return (
   
    <GestureDetector gesture={drag}>     
      <Animated.View style={containerStyle}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image source={imageSource} resizeMode='contain' style={ [imageStyle, { width: imageSize, height: imageSize }] } />
        </GestureDetector>     
      </Animated.View>        
    </GestureDetector>

  );
  
});

export default EmojiSticker;

