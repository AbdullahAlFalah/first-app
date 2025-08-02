import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { router } from "expo-router";
import { purchaseItems } from "@/api/PurchasingFullCart";
import { showMsg } from "@/Utilities/ApiUtils";
import RotatingSquareButton from "@/components/RotatingSquareButton";

import { useCart } from "@/hooks/CartContext"; 
import { useWalletContext } from "@/hooks/WalletContext"; 
import { useThemeMode } from "@/hooks/ThemeContext";

export default function Cart() {
    
    const { cart, totalCost } = useCart();
    const { status } = useWalletContext();

    // Access the theme context for styling
    const themeContext = useThemeMode();

    const handleCheckout = () => {
        if (status === "inactive") {
            showMsg("Inactive Wallet Status", "You can only purchase using an active wallet.");
            return;
        }
        purchaseItems(cart);
        console.log("Checkout button pressed");
    };

    const openWallet = () => {
        router.push("/Wallet");
    };

    return (
        <View style={[styles.container, themeContext.container, { padding: themeContext.spacing.md }]}>
            <Text style={[styles.title, { fontSize: themeContext.fontSize.xxxl, marginBottom: themeContext.spacing.md, color: themeContext.colors.primaryText }]}>Your Cart</Text>
            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={[styles.cartItem, themeContext.cartItem]}>
                                <Text style={[styles.cartItemText, { color: themeContext.colors.secondaryText2, fontSize: themeContext.fontSize.md }]}>{item.title}</Text>
                                <Text style={[styles.cartItemText, { color: themeContext.colors.secondaryText2, fontSize: themeContext.fontSize.md }]}>${item.cost}</Text>
                            </View>
                        )}
                    />
                    <View style={[styles.checkoutContainer, { marginRight: (themeContext.spacing.lg+1)*4 }]}>
                        <Text style={[styles.totalCostText, { fontSize: themeContext.fontSize.xl, marginTop: themeContext.spacing.md, color: themeContext.colors.primaryText }]}>Total: ${ totalCost ? totalCost.toFixed(2) : "0.00" }</Text>
                        <Pressable 
                            style={[
                                styles.checkoutButton,
                                {
                                    marginTop: themeContext.spacing.md,
                                    backgroundColor: themeContext.colors.buttonColor2,
                                    paddingVertical: themeContext.spacing.sm,
                                    paddingHorizontal: themeContext.spacing.md,
                                    borderRadius: (themeContext.radius.sm-1),
                                }, 
                            ]} 
                            onPress={handleCheckout}
                        >
                            <Text style={[styles.checkoutButtonText, themeContext.primaryText2]}>Checkout</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Text 
                    style={[
                        styles.emptyCartText,
                        {
                            fontSize: themeContext.fontSize.md,
                            color: themeContext.colors.secondaryText2,
                            marginTop: themeContext.spacing.xl,
                        },
                    ]}
                >
                    Your cart is empty.
                </Text>
            )}
            <RotatingSquareButton 
                icon="wallet" 
                audioSource={require('../../assets/sounds/unlock.mp3')} 
                style={[styles.RSBposition, { bottom: themeContext.spacing.xl, right: themeContext.spacing.xl } ]} 
                onPress={openWallet} 
                themeContext={themeContext}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
    },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cartItemText: {
        fontSize: 16,
    },
    checkoutContainer: {
        alignItems: "flex-start",
        marginRight: 100, // Leaves space for the floating button
        width: "60%",     // Or set a fixed width 
    },
    totalCostText: {
        fontWeight: "bold",
        textAlign: "center",      
    },
    checkoutButton: {
        alignItems: "center",
        width: "100%",
    },
    checkoutButtonText: {
        fontWeight: "bold",
    },
    emptyCartText: {
        textAlign: "center",    
    },
    RSBposition: {
        position: "absolute",
        zIndex: 100,
        overflow: "visible",
    },
});

