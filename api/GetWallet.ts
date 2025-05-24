import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWalletApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";

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

    const API_URL = getWalletApiUrl("getWalletinfo");

    try {

        const response = await axios.get<WalletApiResponse>(
        API_URL,
        {
            headers: {                
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200 && response.data) {   
            console.log("Wallet info:", response.data.walletInfo);
            showMsg("Fetch Successful", response.data.ServerNote);   
            return response.data ; // Return the walletInfo and ServerNote
        }
        else {
            showMsg("Fetch Failed", response.data.ServerNote);
        }
    } catch (error) {
        console.error("API error:", error);
        showMsg("API Error:", error);       
    }  
    return null; // Return null if the API call fails
};

