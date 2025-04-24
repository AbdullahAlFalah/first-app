import React, { createContext, useContext, useState } from "react";

interface CartItem {
    id: number;
    title: string;
    cost: number;
}

interface CartContextProps {
    cart: CartItem[];
    totalCost: number;
    addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {

        setCart((prevCart) => {

            // Check if the item is already in the cart and prevent duplicate items with the same id
            if (prevCart.some((cartItem) => cartItem.id === item.id)) {
                console.warn("Item with the same id already exists in the cart:", item.id);
                return prevCart; // Do not add duplicate items
            }

            // Validate and convert the cost only for new items
            if (typeof item.cost !== "number" || isNaN(item.cost)) {
                console.log("Invalid cost value:", item.cost, "Type:", typeof item.cost);
                item.cost = Number(item.cost) // Convert cost to a number
                if (typeof item.cost !== "number" || isNaN(item.cost)) {
                    console.log("Cost is still invalid after conversion:", item.cost, "Type:", typeof item.cost);
                    return prevCart; // Exit if cost is still invalid without adding the item to the cart
                }
                else {
                    console.log("Cost converted to number:", item.cost, "Type:", typeof item.cost);
                }
            }

            return [...prevCart, item]
            
        });

    };

    const totalCost = cart.reduce((sum, item) => sum + Number(item.cost), 0); // Default to 0 if cost is undefined

    return (
        <CartContext.Provider value={{ cart, totalCost, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export default CartProvider;

