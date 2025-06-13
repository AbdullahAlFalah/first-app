import React, { useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'expo-ads-admob';
import { claimReward } from '../../api/GetReward';

export default function AdsScreen() {

    useEffect(() => {

        // Load Interstitial ad
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Interstitial Test ID
        AdMobInterstitial.requestAdAsync();

        // Register Rewarded Ad Listener
        AdMobRewarded.addEventListener(
            "rewardedVideoUserDidEarnReward",
            async () => {
                await claimReward(); // Call the claimReward function here
            }
        );

        // Cleanup listeners
        return () => {
            AdMobRewarded.removeAllListeners();
            AdMobInterstitial.removeAllListeners();
        };

    }, []);

    // Show Interstitial Ad
    const showInterstitial = async () => {
        try {
        await AdMobInterstitial.showAdAsync();
        } catch (error) {
        console.warn('Interstitial Ad Error:', error);
        }
    };

    // Show Rewarded Ad
    const showRewarded = async () => {
        try {
            await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917"); // Rewarded Test ID
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        } catch (error) {
            console.warn("Rewarded Ad Error:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
            <Button title="Show Interstitial Ad" onPress={showInterstitial} />
        </View>

        <View style={styles.section}>
            <Button title="Watch Rewarded Ad" onPress={showRewarded} />
        </View>

        <View style={styles.banner}>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds
                onDidFailToReceiveAdWithError={(err) => console.warn(err)}
            />
        </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginVertical: 20,
        width: '100%',
    },
    banner: {
        marginTop: 30,
    },
});


