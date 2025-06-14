import React, { useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { claimReward } from '../../api/GetReward';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});

const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
    requestNonPersonalizedAdsOnly: true,
});

export default function AdsScreen() {

    useEffect(() => {

        // Load both types of ads on mount
        interstitial.load();
        rewardedAd.load();

        // Rewarded Ad Event Listener
        const rewardedListener = rewardedAd.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            (reward) => {
                console.log('User earned reward:', reward);
                claimReward(); // Call your reward logic here
            }
        );

        rewardedAd.addAdEventListener(AdEventType.LOADED, () => {
            rewardedAd.show();
        });

        return () => { 
            rewardedListener(); // Cleanup the listener on unmount          
        }; 

    }, []);

    // Show Interstitial Ad
    const showInterstitial = async () => {
        if (interstitial?.loaded) {
            interstitial.show();
        }
    };

    // Show Rewarded Ad
    const showRewarded = async () => {
        if (rewardedAd?.loaded) {
            rewardedAd.show();
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
            <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
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


