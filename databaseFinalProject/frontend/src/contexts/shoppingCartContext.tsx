import React from "react";
import { useContext, createContext, useState, ReactNode } from "react";


type ShoppingCartProviderProps = {
    children: React.ReactNode;
};

type CartItemType = {
    id: number;
    quantity: number;
}

type ShoppingCartContextTpye = {
    getItemQuantity: (id: number) => number;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    removeItem: (id: number) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextTpye);



export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}



export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    const increaseItemQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            }
            else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    }

    const decreaseItemQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id)
            }
            else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    }

    const removeItem = (id: number) => {
        setCartItems((currItems) => currItems.filter((item) => item.id !== id))
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}