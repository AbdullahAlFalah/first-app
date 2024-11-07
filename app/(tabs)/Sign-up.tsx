import React from "react";

import Signup from "@/components/Forms/Signup";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import takeScreenshotAndSave from '@/Utilities/ScreenshotUtil';

export default function signUp() {

    const LongPressGesture = Gesture.LongPress().minDuration(800).onEnd(async () => {
        console.log("Long press gesture completed successfully!");
        const uri = await takeScreenshotAndSave();
    });

    return (
        <GestureDetector gesture={LongPressGesture}>
            <Signup />
        </GestureDetector>
    );
}

