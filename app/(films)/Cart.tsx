import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useCart } from "@/hooks/CartContext";
import { router } from "expo-router";
import { purchaseItems } from "@/api/PurchasingFullCart";
import RotatingSquareButton from "@/components/RotatingSquareButton";
 
export default function Cart() {
    
    const { cart, totalCost } = useCart();

    const handleCheckout = () => {
        purchaseItems(cart);
        console.log("Checkout button pressed");
    };

    const openWallet = () => {
        router.push("/Wallet");
    };

    console.log("Total Cost:", totalCost, "Type:", typeof totalCost); // Debugging totalCost

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Text style={styles.cartItemText}>{item.title}</Text>
                                <Text style={styles.cartItemText}>${item.cost}</Text>
                            </View>
                        )}
                    />
                    <View style={styles.checkoutContainer}>
                        <Text style={styles.totalCostContainer}>Total: ${ totalCost ? totalCost.toFixed(2) : "0.00" }</Text>
                        <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            )}
            <RotatingSquareButton 
                icon="wallet" 
                audioSource={require('../../assets/sounds/unlock.mp3')} 
                style={styles.RSBposition} 
                onPress={openWallet} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cartItemText: {
        fontSize: 16,
        color: "#333",
    },
    checkoutContainer: {
        alignItems: "flex-start",
        marginRight: 100, // Leaves space for the floating button
        width: "60%",     // Or set a fixed width 
    },
    totalCostContainer: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 16,
        textAlign: "center",      
    },
    checkoutButton: {
        marginTop: 16,
        backgroundColor: "#1e90ff",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: "center",
        width: "100%",
    },
    checkoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    emptyCartText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 32,
    },
    RSBposition: {
        position: "absolute",
        bottom: 32,
        right: 32,
        zIndex: 100,
        overflow: "visible",
    },
});

