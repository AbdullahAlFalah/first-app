import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

export default function PhaseAnimation({ phase }: { phase: number }) {
    const animationRef = useRef<LottieView>(null);

    const animations = [
        require("../../assets/Lotties/Order-Received.json"),
        require("../../assets/Lotties/Food-Prep.json"),
        require("../../assets/Lotties/Delivery.json")
    ];

    useEffect(() => {
        if (phase > 0) {
            animationRef.current?.reset();
            animationRef.current?.play();
        }
    }, [phase]);

    if (phase === 0) return null; // nothing shown in idle phase

    return (
        <LottieView
            ref={animationRef}
            source={animations[phase - 1]} // shift index (phase 1 -> index 0)
            style={{ width: 200, height: 200 }}
            loop
        />
    );
}

