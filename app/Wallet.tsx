import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { getWallet } from "@/api/GetWallet";
import { addFunds } from "@/api/AddFunds";
import { showMsg } from "@/Utilities/ApiUtils";
import CurrencyCB from "@/components/InputBoxes/CurrencyCB";
import StatusRB from "@/components/InputBoxes/StatusRB";
import { useWalletContext } from "@/hooks/WalletContext";

export default function Wallet() {

    const [wallet, setWallet] = useState<null | { balance: number; currency: string; status: string }>(null);
    const [currency, setCurrency] = useState<string>("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

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
        <View style={styles.container}>
            <Text style={styles.title}>Wallet</Text>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : wallet ? (
                <>
                    <Text style={styles.info}>Balance: {wallet.balance} {wallet.currency}</Text>                   
                    <StatusRB value={status||wallet?.status} onChange={setStatus}/>
                    <CurrencyCB value={currency||wallet?.currency} onChange={setCurrency} />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount to add"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <Pressable style={styles.button} onPress={handleAddFunds} disabled={adding}>
                        <Text style={styles.buttonText}>{adding ? "Adding..." : "Add Funds"}</Text>
                    </Pressable>
                </>
            ) : (
                <Text style={styles.info}>Could not load wallet info.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 24, 
        backgroundColor: "#fafafa" 
    },
    title: { 
        fontSize: 28, 
        fontWeight: "bold", 
        marginBottom: 24 
    },
    info: { 
        fontSize: 20, 
        marginBottom: 12 
    },
    input: { 
        borderWidth: 1, 
        borderColor: "#ccc", 
        borderRadius: 6, 
        padding: 10, 
        width: 200, 
        marginBottom: 16, 
        fontSize: 18 
    },
    button: { 
        backgroundColor: "#1e90ff", 
        padding: 12, 
        borderRadius: 6, 
        marginBottom: 16, 
        width: 200, 
        alignItems: "center" 
    },
    buttonText: { color: "#fff", 
        fontSize: 18, 
        fontWeight: "bold" 
    },
});

