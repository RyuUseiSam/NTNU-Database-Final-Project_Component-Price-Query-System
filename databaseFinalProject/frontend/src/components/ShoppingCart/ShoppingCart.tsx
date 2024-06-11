import { Offcanvas, Stack } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";
import React, { useState } from 'react'
import { useShoppingCart } from '../../contexts/shoppingCartContext';
import CartItems from '../CartItems/CartItems';
import './ShoppingCart.scss'

type ShoppingCartProps = {
    isOpen: boolean;
}

type CartItemType = {
    id: number;
    type: string;
    name: string;
    quantity: number;
    price: number;
}

export default function ShoppingCart({ isOpen }) {
    const { closeCart } = useShoppingCart();
    const [cartItems, setCartItems] = useState<CartItemType[]>([
        { id: 1, type: "hdd", name: 'Item 1', quantity: 1, price: 10 },
        { id: 2, type: "ssd", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
        { id: 2, type: "ram", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
        { id: 2, type: "ram", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
        { id: 2, type: "ram", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
        { id: 2, type: "ram", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
    ]);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Offcanvas className='shoppingCart' show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={0}>
                    <div className='shoppingCart__listBar'><FaShoppingCart /> Shopping Cart</div>
                    <div style={{
                        overflowY: 'auto',
                        height: 'calc(100vh - 196px)',
                    }}>
                        {cartItems.map((item) => (
                            <CartItems
                                // key={item.id}
                                id={item.id}
                                type={item.type}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                            />
                        ))}
                    </div>
                    <div className='checkoutButton'>
                        <button onClick={() => setCartItems([])}>
                            Checkout <small>（Total: ${totalAmount.toFixed(2)}）</small>
                        </button>
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
