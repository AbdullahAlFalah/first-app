import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { claimReward } from '../../api/GetReward';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { saveBackgroundUrl, loadBackgroundUrl } from '@/Utilities/persistantBackgroundUtils';
import { useThemeMode } from '@/hooks/ThemeContext';
import { showMsg } from '@/Utilities/ApiUtils';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});

const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
    requestNonPersonalizedAdsOnly: true,
});

export default function AdsScreen() {

    const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

    // Extract parameters from the local URL
    const { assetUrl } = useLocalSearchParams();
    const imageUrl = Array.isArray(assetUrl) ? assetUrl[0] : assetUrl;

    // Access the theme context for styling
    const themeContext = useThemeMode(); 

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

        // Error Listeners
        const interstitialErrorListener = interstitial.addAdEventListener(
            AdEventType.ERROR,
            (error) => {
                console.error('Interstitial failed to load:', error);
                showMsg("Interstitial Ad", "Ad failed to load. Please try again later by re-opening this screen!");
            }
        );

        const rewardedErrorListener = rewardedAd.addAdEventListener(
            AdEventType.ERROR,
            (error) => {
                console.error('Rewarded ad failed to load:', error);
                showMsg("Rewarded Ad", "Ad failed to load. Please try again later by re-opening this screen!");
            }
        );

        return () => { 
            // Cleanup listeners on unmount 
            rewardedEarnedListener();
            rewardedCloseListener(); 
            interstitialCloseListener(); 
            interstitialErrorListener();
            rewardedErrorListener();         
        }; 

    }, []);

    useEffect(() => {

        // Load the background URL from storage if available
        const loadBackground = async () => {
            if (imageUrl !== undefined && imageUrl !== null) {
                await saveBackgroundUrl(imageUrl);
                setBackgroundUrl(imageUrl);
            } else {
                const storedUrl = await loadBackgroundUrl();
                if (storedUrl) setBackgroundUrl(storedUrl);
            }
        };

        loadBackground();

    }, [imageUrl]);

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
    const Wrapper = backgroundUrl ?
        ({ children }: { children: React.ReactNode }) => (
            <View style={[styles.background, { backgroundColor: themeContext.colors.background }]}>
                <Image
                    source={backgroundUrl as string}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                    transition={300}
                />
                {children}
            </View>
        )
        : ({ children }: { children: React.ReactNode }) => (
            <View style={[styles.background, { backgroundColor: themeContext.colors.background }]}>{children}</View>
        );

    return (
        <Wrapper>
            <ScrollView contentContainerStyle={[styles.container, themeContext.scrollViewContainer]}>

                <View style={[styles.section, { marginVertical: (themeContext.spacing.md+4) }]}>
                    <Button title="Show Interstitial Ad" onPress={showInterstitial} />
                </View>

                <View style={[styles.section, { marginVertical: (themeContext.spacing.md+4) }]}>
                    <Button title="Watch Rewarded Ad" onPress={showRewarded} />
                </View>

                <View style={[styles.banner, { marginTop: (themeContext.spacing.xl-2) }]}>
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


