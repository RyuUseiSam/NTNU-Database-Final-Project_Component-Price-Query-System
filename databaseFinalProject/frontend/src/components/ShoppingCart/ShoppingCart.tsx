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
    product_id: number;
    product_type: string;
    name: string;
    quantity: number;
    price: number;
    left: number;
}

const getData = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/get_cart/");
    let Data = await response.json();
    return Data;
  };
let Data = await getData();

export default function ShoppingCart({ isOpen }) {
    const { closeCart } = useShoppingCart();
    if(Data['cart'] === "None"){
        return(
            <Offcanvas className='shoppingCart' show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>

                </Offcanvas.Title>
            </Offcanvas.Header>
                <Offcanvas.Body>
                <Stack gap={0}>
                    <div style={{fontSize: "20px"}}>Your cart is empty.</div>
                </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        )
    }
    const [cartItems, setCartItems] = useState<CartItemType[]>(Data['cart']);
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
                    <form action="../api/addPurchaseList/" role="form" method="post">
                    <div style={{
                        overflowY: 'auto',
                        height: 'calc(100vh - 196px)',

                    }}>

                        {cartItems.map((item) => (
                            <CartItems
                                //key={item.product_id}
                                product_id={item.product_id}
                                product_type={item.product_type}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                                left={item.left}
                            />
                        ))}
                    </div>
                        <button className='checkoutButton' style={{fontSize:"medium", border:"none"}}>Checkout</button>
                    </form>
                </Stack>
            </Offcanvas.Body>



        </Offcanvas>
    )
}
