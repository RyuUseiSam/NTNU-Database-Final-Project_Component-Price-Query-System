import React from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

type CartItemType = {
    product_id: number;
    product_type: string;
    name: string;
    quantity: number;
    price: number;
};

const getData = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/getPurchaseList/");
    let Data = await response.json();
    return Data;
  };
let Data = await getData();
console.log(Data['Product']);

const Order = () => {
    //For django, we need to send a request to the server to get the order history
    const [cartItems, setCartItems] = React.useState<CartItemType[]>(Data['Product']);

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
