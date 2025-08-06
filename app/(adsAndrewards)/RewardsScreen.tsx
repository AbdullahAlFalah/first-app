import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable, ViewStyle } from 'react-native';
import { getUserRewardHistory } from '@/api/GetUserRewardHistory';
import { showMsg } from '@/Utilities/ApiUtils';
import { router, useFocusEffect } from 'expo-router';
import { upgradeBackground } from '@/api/UpgradingBackground';
import { useThemeMode } from '@/hooks/ThemeContext';

// Define the interface for a reward record object
interface RewardRecord {
    rewardCoins: number;
    totalCoins: number;
    createdAt: string;
}

export default function RewardsScreen() {
    const [rewardHistory, setRewardHistory] = useState<RewardRecord[]>([]);
    const [loading, setLoading] = useState(true);

    // Access the theme context for styling
    const themeContext = useThemeMode();

    const fetchRewardHistory = useCallback(async () => {
        setLoading(true);
        const history = await getUserRewardHistory();
        if (history && history.coinHistory) {
            setRewardHistory(history.coinHistory);
        }
        setLoading(false);
    }, []);

    // Refresh on screen focus
    useFocusEffect(
        useCallback(() => {
            fetchRewardHistory();
        }, [fetchRewardHistory])
    );

    // Get the total coins from the newest record
    const newestTotalCoins = rewardHistory.length > 0 ? rewardHistory[0].totalCoins : 0;

    const handleUpgradeBackground = async () => {  
        const result = await upgradeBackground();
        console.log(`Upgrade result: {"success": ${result?.success}, "message": "${result?.message}"}`);
        showMsg(result?.success ? 'Upgrade Succeded' : 'Upgrade Failed', `API message: ${result?.message}`);
        if (result?.success) {
            router.push(
               `/(adsAndrewards)/AdsScreen?assetLevel=${result.newLevel}&assetName=${encodeURIComponent(result.assetName ?? '')}&assetUrl=${encodeURIComponent(result.assetUrl ?? '')}&remainingCoins=${result.remainingCoins ?? ''}` 
            );           
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, themeContext.container, { padding: 20 }]}>
            {loading ? (
                <View style={[themeContext.loadContainer as ViewStyle, { marginTop: ((themeContext.spacing.lg+1)*2) }]}>
                    <ActivityIndicator size="large" color={themeContext.colors.loadIndicator2} />
                    <Text style={[styles.loadingText, { fontSize: themeContext.fontSize.md, marginTop: (themeContext.spacing.sm-2), color: themeContext.colors.secondaryText2 }]}>Loading reward history...</Text>
                </View>
            ) : rewardHistory.length > 0 ? (
                <>
                    {rewardHistory.map((item, index) => (
                        <View key={index} style={[
                            styles.item, 
                            {
                                backgroundColor: themeContext.colors.background,
                                padding: (themeContext.spacing.md-1),
                                marginVertical: (themeContext.spacing.xs+2),
                                borderRadius: themeContext.radius.md,
                                shadowColor: themeContext.colors.primaryText,
                            },
                        ]}>
                            <Text style={{ fontSize: themeContext.fontSize.sm, color: themeContext.colors.secondaryText2 }}>Reward Coins: {item.rewardCoins}</Text>
                            <Text style={{ fontSize: themeContext.fontSize.sm, color: themeContext.colors.secondaryText2 }}>Total Coins: {item.totalCoins}</Text>
                            <Text style={{ fontSize: themeContext.fontSize.sm, color: themeContext.colors.secondaryText2 }}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                    ))}
                    <View style={[styles.buttonContainer, { marginTop: (themeContext.spacing.md+4) }]}>
                        <Text style={[styles.totalCoinsText, { fontSize: themeContext.fontSize.md, marginBottom: (themeContext.spacing.sm-2), color: themeContext.colors.secondaryText2 }]}>Total Coins: {newestTotalCoins}</Text>
                        <Pressable
                            style={({ pressed }) => [
                                styles.buttonContainer,
                                { backgroundColor: themeContext.colors.buttonColor2, marginTop: (themeContext.spacing.md+4) },
                                pressed && styles.buttonContainerPressed, // Add pressed effect
                            ]}
                            onPress={handleUpgradeBackground}
                        >
                            <Text style={{
                                fontSize: themeContext.fontSize.md,
                                color: themeContext.colors.primaryText2,
                                paddingVertical: (themeContext.spacing.sm-2),
                                paddingHorizontal: (themeContext.spacing.md+4),
                                borderRadius: themeContext.radius.sm,
                            }}>
                                Upgrade Background
                            </Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Text style={[styles.noDataText, { fontSize: themeContext.fontSize.md, marginTop: (themeContext.spacing.md+4), color: themeContext.colors.secondaryText2 }]}>No reward history available.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,      
    },
    loadingText: {
        fontWeight: 'bold',
        textAlign: 'center',          
    },
    item: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    totalCoinsText: {
        fontWeight: 'bold',        
    },
    buttonContainerPressed: {
        backgroundColor: '#0056b3',
    },    
    noDataText: {
        fontWeight: 'bold',
        textAlign: 'center',        
    },
});

