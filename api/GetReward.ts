import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWalletApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";
import { isTokenValid } from "@/Utilities/TokenValidation";

// Define the type for the API response
interface RewardApiResponse {
    success: boolean;
    message: string;
    reward?: {
        rewardCoins: number;
        totalCoins: number;
        timestamp: string;
    }; // without a separate interface for reward
}

// Function to claim the reward
export const claimReward = async (): Promise<RewardApiResponse | null> => {
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

    const API_URL = getWalletApiUrl("reward-claim");

    try {

        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
            source.cancel("Request timeout: Server not responding");
        }, 10000); // 10 seconds timeout

        const response = await axios.post<RewardApiResponse>(
            API_URL,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cancelToken: source.token,
            }
        );

        clearTimeout(timeout); // Clear the timeout if the request completes in time

        if (response.status === 200 && response.data) {
            const { success, message, reward } = response.data;

            if (success) {
                console.log("Reward Claimed:", reward);
                showMsg("Reward Claimed!", `You earned ${reward?.rewardCoins} coins!`);
                return response.data; // Return the reward data
            } else {
                showMsg("Reward Failed", message);
                return null;
            }
        }
    } catch (error: any) {
        console.error("API error:", error);
        const message = error?.response?.data?.message || error.message;
        showMsg("Giving Reward Failed", message);
    }

    return null; // Return null if the API call fails
};

