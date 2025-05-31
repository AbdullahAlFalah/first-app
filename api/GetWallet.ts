import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWalletApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";
import { isTokenValid } from "@/Utilities/TokenValidation";

export interface WalletInfo {
  userWalletId: number;
  balance: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Define the type for the API response
interface WalletApiResponse {
    walletInfo: WalletInfo;
    ServerNote: string;
}

export const getWallet = async (): Promise<WalletApiResponse | null> => {

    const token = await AsyncStorage.getItem('token');
  
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
        await AsyncStorage.removeItem('token'); // Clear the invalid token
        router.push("/(entry)/Sign-in");
        return null;
    }

    const API_URL = getWalletApiUrl("getWalletinfo");

    try {

        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
            source.cancel("Request timeout: Server not responding");
        }, 10000); // 10 seconds timeout

        const response = await axios.get<WalletApiResponse>(
        API_URL,
        {
            headers: {                
                'Authorization': `Bearer ${token}`,
            },
            cancelToken: source.token,
        });

        clearTimeout(timeout); // Clear the timeout if the request completes in time

        if (response.status === 200 && response.data) {   
            console.log("Wallet info:", response.data.walletInfo);
            console.log("Fetch Successful", response.data.ServerNote);   
            return response.data ; // Return the walletInfo and ServerNote
        }
    } catch (error: any) {
        console.log("API error:", error);
        const ServerNote = error?.response?.data?.ServerNote || error.message;
        console.log("Fetching Wallet Failed:", ServerNote);       
    }  
    return null; // Return null if the API call fails
};

