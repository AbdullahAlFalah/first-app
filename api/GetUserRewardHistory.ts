import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRewardApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";
import { isTokenValid } from "@/Utilities/TokenValidation";

// Define the type for the API response
interface RewardHistoryApiResponse {
    success: boolean;
    coinHistory?: Array<{
        rewardCoins: number;
        totalCoins: number;
        createdAt: string;
    }>;
    message?: string;
}

// Function to fetch the user's reward history
export const getUserRewardHistory = async (): Promise<RewardHistoryApiResponse | null> => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
        console.error("Auth Token is not available; You must Login again!");
        showMsg("Unauthorized", "Auth Token is not available; You must Login again!");
        router.push("/(entry)/Sign-in");
        return null;
    }

    // Validate the token before making the API call
    if (!isTokenValid(token)) {
        console.error("Invalid token; You must Login again!");
        showMsg("Unauthorized", "Invalid token; You must Login again!");
        await AsyncStorage.removeItem("token"); // Clear the invalid token
        router.push("/(entry)/Sign-in");
        return null;
    }

    const API_URL = getRewardApiUrl("rewards-history");

    try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
            source.cancel("Request timeout: Server not responding");
        }, 10000); // 10 seconds timeout

        const response = await axios.get<RewardHistoryApiResponse>(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cancelToken: source.token,
        });

        clearTimeout(timeout); // Clear the timeout if the request completes in time

        if (response.status === 200 && response.data) {
            const { success, coinHistory, message } = response.data;

            if (success) {
                console.log("Reward History Fetched:", coinHistory);
                return response.data; // Return the reward history data
            } else {
                showMsg("Failed to Fetch History", message || "Unknown error occurred");
                return null;
            }
        }
    } catch (error: any) {
        console.error("API error:", error);
        const message = error?.response?.data?.message || error.message;
        showMsg("Fetching History Failed", message);
    }

    return null; // Return null if the API call fails
};

