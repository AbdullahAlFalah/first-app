import React, { useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { claimReward } from '../../api/GetReward';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});

const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
    requestNonPersonalizedAdsOnly: true,
});

export default function AdsScreen() {

    // Extract parameters from the local URL
    const { assetUrl } = useLocalSearchParams();
    const imageUrl = Array.isArray(assetUrl) ? assetUrl[0] : assetUrl;

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

    // If assetUrl exists, use it as background; otherwise, use default background
    const Wrapper = imageUrl ?
        ({ children }: { children: React.ReactNode }) => (
            <View style={styles.background}>
                <Image
                    source={imageUrl as string}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                    transition={300}
                />
                {children}
            </View>
        )
        : ({ children }: { children: React.ReactNode }) => (
            <View style={styles.background}>{children}</View>
        );

    return (
        <Wrapper>
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
        </Wrapper>
    );

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1, // stretch it to fill the parent
        paddingVertical: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0)', // Transparent background 
    },
    section: {
        marginVertical: 20,
        width: '100%',
    },
    banner: {
        marginTop: 30,
    },
});


