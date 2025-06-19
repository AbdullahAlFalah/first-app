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

        // Rewarded Ad Earned Event Listener
        const rewardedEarnedListener = rewardedAd.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            (reward) => {
                console.log('User earned reward:', reward);
                claimReward(); // Call your reward logic here
            }
        );

        // Rewarded Ad Close Event Listener
        const rewardedCloseListener = rewardedAd.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                rewardedAd.load(); // Reload for next time
            }
        );

        // Interstitial Ad Close Event Listener
        const interstitialCloseListener = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                interstitial.load(); // Reload for next time
            }
        );

        return () => { 
            // Cleanup listeners on unmount 
            rewardedEarnedListener();
            rewardedCloseListener(); 
            interstitialCloseListener();          
        }; 

    }, []);

    // Show Interstitial Ad
    const showInterstitial = async () => {
        if (interstitial?.loaded) {
            interstitial.show();
        } else {
            console.log('Interstitial ad not loaded yet');
        }
    };

    // Show Rewarded Ad
    const showRewarded = async () => {
        if (rewardedAd?.loaded) {
            rewardedAd.show();
        } else {
            console.log('Rewarded ad not loaded yet');
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


