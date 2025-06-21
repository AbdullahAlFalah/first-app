import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBackgroundApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";
import { isTokenValid } from "@/Utilities/TokenValidation";

interface UpgradeBackgroundResponse {
    success: boolean;
    message: string;
    newLevel?: number;
    assetName?: string;
    assetUrl?: string;
    remainingCoins?: number;
}

export const upgradeBackground = async (): Promise<UpgradeBackgroundResponse | null> => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
            showMsg("Unauthorized", "Auth Token is not available; You must Login again!");
            router.push("/(entry)/Sign-in");
            return null;
    }

    if (!isTokenValid(token)) {
            showMsg("Unauthorized", "Invalid token; You must Login again!");
            await AsyncStorage.removeItem("token");
            router.push("/(entry)/Sign-in");
            return null;
    }

    const API_URL = getBackgroundApiUrl("upgrade");

    try {
        const response = await axios.post<UpgradeBackgroundResponse>(
            API_URL,
            {},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
                timeout: 10000,
            }
        );

        if (response.status === 200 && response.data) {
            if (response.data.success) {
                showMsg("Upgrade Successful", response.data.message);
                return response.data;
            } else {
                showMsg("Upgrade Failed", response.data.message);
                return response.data;
            }
        }
    } catch (error: any) {
        const message =
        error?.response?.data?.message ||
        error.message ||
        "Unknown error occurred during background upgrade.";
        showMsg("Upgrade Failed", message);
    }

    return null;
};


