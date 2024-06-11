import React from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

type CartItemType = {
    id: number;
    type: string;
    name: string;
    quantity: number;
    price: number;
};

const Order = () => {
    //For django, we need to send a request to the server to get the order history
    const [cartItems, setCartItems] = React.useState<CartItemType[]>([
        { id: 1, type: "hdd", name: 'Item 1', quantity: 1, price: 10 },
        { id: 2, type: "ssd", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
    ]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                minWidth: '400px',

            }}
        >
            <ShoppingCartTable
                changable={true}
                cartItems={cartItems}
                setCartItems={setCartItems}
                tableTitle='Shopping Cart'
            ></ShoppingCartTable>
        </div>

    )
}

export default Order
