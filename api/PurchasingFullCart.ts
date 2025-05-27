import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPurchaseApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";

// Define the type for a cart item
interface CartItem {
    id: number;
    title: string;
    cost: number;
}

// Define the type for the API response
interface PurchaseApiResponse {
  success: boolean;
  ServerNote: string;
}

export const purchaseItems = async (items: CartItem[]): Promise<void> => {

    const token = await AsyncStorage.getItem('token');

    if (!token) {
        console.error("Auth Token is not available; You must Login again!");
        showMsg("Unauthorized", "Auth Token is not available; You must Login again!");
        router.push("/(entry)/Sign-in");
        return;           
    }

    const API_URL = getPurchaseApiUrl("purchaseitems");
    
    try {
        const response = await axios.post<PurchaseApiResponse>(
            API_URL,
            { items },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
                },
            }
        );

        if (response.data.success) {
            showMsg("Success:", response.data.ServerNote);
        } else {
            showMsg("Failed:", response.data.ServerNote);
        }
    } catch (error) {
        console.error("API error:", error);
        showMsg("API Error:", error);
    } finally {
        console.log("Purchase API call completed.");
    }

};


