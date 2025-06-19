import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { getUserRewardHistory } from '@/api/GetUserRewardHistory';
import { showMsg } from '@/Utilities/ApiUtils';
import { router } from 'expo-router';

// Define the interface for a reward record object
interface RewardRecord {
    rewardCoins: number;
    totalCoins: number;
    createdAt: string;
}

export default function RewardsScreen() {
    const [rewardHistory, setRewardHistory] = useState<RewardRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRewardHistory = async () => {
            setLoading(true);
            const history = await getUserRewardHistory();
            if (history && history.coinHistory) {
                setRewardHistory(history.coinHistory);
            }
            setLoading(false);
        };

        fetchRewardHistory();
    }, []);

    // Get the total coins from the newest record
    const newestTotalCoins = rewardHistory.length > 0 ? rewardHistory[0].totalCoins : 0;

    const handleUpgradeBackground = () => {
        showMsg('Upgraded Background', 'Check the Ads page now!!!');
        router.push({
            pathname: '/(adsAndrewards)/AdsScreen',
            params: {  }, 
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.loadingText}>Loading reward history...</Text>
                </View>
            ) : rewardHistory.length > 0 ? (
                <>
                    {rewardHistory.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text style={styles.itemText}>Reward Coins: {item.rewardCoins}</Text>
                            <Text style={styles.itemText}>Total Coins: {item.totalCoins}</Text>
                            <Text style={styles.itemText}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
                        </View>
                    ))}
                    <View style={styles.buttonContainer}>
                        <Text style={styles.totalCoinsText}>Total Coins: {newestTotalCoins}</Text>
                        <Pressable
                            style={({ pressed }) => [
                                styles.buttonContainer,
                                pressed && styles.buttonContainerPressed, // Add pressed effect
                            ]}
                            onPress={handleUpgradeBackground}
                        >
                            <Text style={styles.buttonText}>Upgrade Background</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Text style={styles.noDataText}>No reward history available.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f0f8ff',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        color: '#555',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    buttonContainerPressed: {
        backgroundColor: '#0056b3',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    totalCoinsText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
});

