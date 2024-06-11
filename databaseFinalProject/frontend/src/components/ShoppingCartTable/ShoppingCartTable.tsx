import React from 'react';
import { MdDeleteForever } from "react-icons/md";

import ramImg from '../../assets/images/ram.png';
import hddImg from '../../assets/images/hdd.png';
import ssdImg from '../../assets/images/ssd.png';
import './ShoppingCartTable.scss';

type ShoppingCartTableProps = {
    changable: boolean;
    cartItems: CartItemType[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
    tableTitle: string;
};

type CartItemType = {
    id: number;
    type: string;
    name: string;
    quantity: number;
    price: number;
};

const ShoppingCartTable = ({
    changable,
    cartItems,
    setCartItems,
    tableTitle
}: ShoppingCartTableProps) => {

    const getImg = (type: string) => {
        return type === 'ram' ? ramImg : type === 'hdd' ? hddImg : ssdImg;
    };

    const handleDelete = (id: number) => {
        //For django, we need to send a request to the server to delete the item from the database
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
        setCartItems(newCartItems);
    };

    const calculateTotal = () => {
        //For django, we need to send a request to the server to calculate the total price
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });
    };

    return (
        <>
            <table className='shoppingCartTable'>
                <caption>{tableTitle}</caption>
                <thead>
                    <tr>
                        <th>View</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {changable && <th>Action</th>}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td><img className='shoppingCartTable__img' src={getImg(item.type)} alt="product-view" /></td>
                            <td>{item.name}</td>
                            <td>{item.price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</td>
                            <td>
                                <select
                                    className='shoppingCartTable__quantity'
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newCartItems = cartItems.map((cartItem) =>
                                            cartItem.id === item.id
                                                ? { ...cartItem, quantity: Number(e.target.value) }
                                                : cartItem
                                        );
                                        setCartItems(newCartItems);
                                    }}
                                    disabled={!changable}
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            {changable &&
                                <td>
                                    <MdDeleteForever className='shoppingCartTable__removeItem' onClick={() => handleDelete(item.id)} />
                                </td>
                            }
                            <td>{(item.price * item.quantity).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={changable ? 5 : 4} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
                        <td>{calculateTotal()}</td>
                    </tr>
                </tfoot>
            </table>
            <div className='checkoutButtonContainer'>
                {changable && <button className='checkoutButton'>Check Out</button>}
            </div>
        </>
    );
};

export default ShoppingCartTable;
