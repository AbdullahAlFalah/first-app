import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

interface Props {
    children: React.ReactNode;
    // onScreenshot: (uri: String) => void;
}

export default function Screenshot({ children }: Props) {

    const [status, requestPermission] = MediaLibrary.usePermissions();
    const imageRef = useRef<View>(null);

    useEffect( () => {
        if (status === null) {
            requestPermission();
        }
    }, [status, requestPermission]);
    
    const Screenshot = async () => {

        if (status?.granted) {

            try {

                //Capture the screenshot
                const uri = await captureRef(imageRef, {
                    format: 'jpg',
                    quality: 0.8,
                });

                //Save the screenshot to the gallery
                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync('Screenshots', asset, false);

                console.log('Screenshot saved to gallery:', uri);

            } catch (error) {
                console.error('Error capturing screenshot:', error);
            }

        } else {
            console.log('Permission denied, cannot save to gallery.');
        }

    };

    const LongPressGesture = Gesture.LongPress().minDuration(800).onEnd(() => {
        console.log ("Long press gesture completed successfully!");
        Screenshot();
    });

    return (
        <GestureDetector gesture={LongPressGesture}>
            <View ref={imageRef} collapsable={false}>
                {children}
            </View>
        </GestureDetector>
    );

}

