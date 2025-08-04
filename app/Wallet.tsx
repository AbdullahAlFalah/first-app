import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import { getWallet } from "@/api/GetWallet";
import { addFunds } from "@/api/AddFunds";
import { showMsg } from "@/Utilities/ApiUtils";
import CurrencyCB from "@/components/InputBoxes/CurrencyCB";
import StatusRB from "@/components/InputBoxes/StatusRB";
import { useWalletContext } from "@/hooks/WalletContext";
import { useThemeMode } from "@/hooks/ThemeContext";

export default function Wallet() {

    const [wallet, setWallet] = useState<null | { balance: number; currency: string; status: string }>(null);
    const [currency, setCurrency] = useState<string>("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    // Access the theme context for styling
    const themeContext = useThemeMode();

    const { status, setStatus } = useWalletContext();

    const fetchWallet = async () => {
        setLoading(true);
        const result = await getWallet();
        if (result && result.walletInfo) {
            setWallet(result.walletInfo);
            // Set currency only if not already set or if wallet currency changed
            setCurrency(curr => curr || result.walletInfo.currency);           
            setStatus(result.walletInfo.status); // set global status here           
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWallet();
    }, []);

    const handleAddFunds = async () => {
        if (status !== "active") {
            showMsg("Inactive Wallet Status", "You can only add funds to an active wallet.");
            return;
        }
        const num = parseFloat(amount);
        if (isNaN(num) || num <= 0) {
            showMsg("Invalid amount", "Please enter a valid number greater than 0.");
            return;
        }
        setAdding(true);               
        await addFunds(num, currency);
        setAmount("");                 
        await fetchWallet(); // Refresh wallet info after adding funds
        setAdding(false);
    };

    return (
        <View style={[styles.container, themeContext.container, { padding: themeContext.spacing.lg } ]}>
            <Text style={{ fontSize: (themeContext.fontSize.xxxl+4), fontWeight: "bold", marginBottom: themeContext.spacing.lg }}>Wallet</Text>
            {loading ? (                
                    <ActivityIndicator style={themeContext.loadWrapper as ViewStyle} size="large" color={themeContext.colors.loadIndicator2} />              
            ) : wallet ? (
                <>
                    <Text style={{ fontSize: themeContext.fontSize.xl, marginBottom: themeContext.spacing.sm }}>Balance: {wallet.balance} {wallet.currency}</Text>                   
                    <StatusRB value={status||wallet?.status} onChange={setStatus} themeContext={themeContext} />
                    <CurrencyCB value={currency||wallet?.currency} onChange={setCurrency} themeContext={themeContext} />
                    <TextInput
                        style={{
                            fontSize: themeContext.fontSize.lg,
                            borderWidth: 1, 
                            borderColor: themeContext.colors.border, 
                            borderRadius: themeContext.radius.sm, 
                            padding: (themeContext.spacing.sm-2),
                            marginBottom: themeContext.spacing.md, 
                            width: (themeContext.size.xl+10)*2,                                                         
                        }}
                        placeholder="Amount to add"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        placeholderTextColor={themeContext.colors.primaryText}
                        selectionColor={themeContext.colors.caret}
                    />
                    <Pressable 
                        style={{
                            backgroundColor: "#1e90ff", 
                            borderRadius: themeContext.radius.sm,
                            padding: themeContext.spacing.sm, 
                            marginBottom: themeContext.spacing.md, 
                            width: (themeContext.size.xl+10)*2, 
                            alignItems: "center",
                        }}
                        onPress={handleAddFunds} 
                        disabled={adding}
                    >
                        <Text style={{ color: themeContext.colors.primaryText2, fontSize: themeContext.fontSize.lg, fontWeight: "bold" }}>
                            {adding ? "Adding..." : "Add Funds"}
                        </Text>
                    </Pressable>
                </>
            ) : (
                <Text style={{ fontSize: themeContext.fontSize.xl, marginBottom: themeContext.spacing.sm }}>Could not load wallet info.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",  
    },
});

