import React, { useContext, createContext, useState, useEffect } from "react";
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';

type ShoppingCartProviderProps = {
    children: React.ReactNode;
};

type CartItemType = {
    id: number;
    quantity: number;
};

type ShoppingCartContextType = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    removeItem: (id: number) => void;
    cartItems: CartItemType[];
    cartQuantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartQuantity(quantity);
    }, [cartItems]);

    const openCart = () => setIsOpen(true);


    const closeCart = () => setIsOpen(false);

    const getItemQuantity = (id: number) => {
        // For django, we need the code below and send a GET request to the server to get the cart
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

    const increaseItemQuantity = (id: number) => {
        // For django, we need the code below and send a POST request to the server to update the cart
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseItemQuantity = (id: number) => {
        // For django, we need the code below and send a POST request to the server to update the cart
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeItem = (id: number) => {
        // For django, we need the code below and send a POST request to the server to update the cart
        setCartItems((currItems) => currItems.filter((item) => item.id !== id));
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                openCart,
                closeCart,
                getItemQuantity,
                increaseItemQuantity,
                decreaseItemQuantity,
                removeItem,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
