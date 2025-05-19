import axios from "axios";
import { getPurchaseApiUrl, showMsg } from "@/Utilities/ApiUtils";

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

export const purchaseItems = async (items: CartItem[], token: string): Promise<void> => {

    const API_URL = getPurchaseApiUrl("purchaseitems");
    
    try {
        const response = await axios.post<PurchaseApiResponse>(
        API_URL,
        { items },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the JWT token in the headers
            },
        }
        );

        if (response.data.success) {
            showMsg("Success:", response.data.success);
        } else {
            showMsg("Failed:", response.data.ServerNote);
        }
    } catch (error) {
        console.error("API error:", error);
        showMsg("API Error:", error);
    }

};

