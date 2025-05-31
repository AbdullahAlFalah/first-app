import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWalletApiUrl, showMsg } from "@/Utilities/ApiUtils";
import { router } from "expo-router";
import { isTokenValid } from "@/Utilities/TokenValidation";

// Define the type for the API response
interface AddFundsApiResponse {
  ServerNote: string;
}

export const addFunds = async (amount: number, currency: string = "USD"): Promise<void> => {

  const token = await AsyncStorage.getItem('token');

  if (!token) {
    console.error("Auth Token is not available; You must Login again!");
    showMsg("Unauthorized", "Auth Token is not available; You must Login again!");
    router.push("/(entry)/Sign-in");
    return;
  }

  // Validate the token before making the API call
  if (!isTokenValid(token)) {
      console.error("Invalid token; You must Login again!");
      showMsg("Unauthorized", "Invalid token; You must Login again!");
      await AsyncStorage.removeItem('token'); // Clear the invalid token
      router.push("/(entry)/Sign-in");
      return;
  }

  const API_URL = getWalletApiUrl('addFunds');

  try {
    const response = await axios.post<AddFundsApiResponse>(
      API_URL,
      { amount, currency },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Funds Added:", response.data.ServerNote);
      showMsg("Funds Added", response.data.ServerNote);     
    } 
  } catch (error: any) {
      console.log("API error:", error);
      // Extract backend error message if available
      const ServerNote = error?.response?.data?.ServerNote || error.message;
      showMsg("Failed Adding Funds", ServerNote);
  }
};


