import React from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

import './Home.scss'
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'


type CartItemType = {
    id: number;
    type: string;
    name: string;
    quantity: number;
    price: number;
};


export default function Home() {
    const [cartItems, setCartItems] = React.useState<CartItemType[]>([
        { id: 1, type: "hdd", name: 'Item 1', quantity: 1, price: 10 },
        { id: 2, type: "ssd", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
    ]);
    return (
        <div className='homePage'>
            <UserProfileCard></UserProfileCard>
            <ShoppingCartTable
                changable={false}
                cartItems={cartItems}
                setCartItems={setCartItems}
                tableTitle='History Order'
            ></ShoppingCartTable>
        </div>
    )
}
