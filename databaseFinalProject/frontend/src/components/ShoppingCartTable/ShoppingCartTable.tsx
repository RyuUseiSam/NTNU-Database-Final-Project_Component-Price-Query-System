import React from 'react';
import './ShoppingCartTable.scss';

import ramImg from '../../assets/images/ram.png';
import hddImg from '../../assets/images/hdd.png';
import ssdImg from '../../assets/images/ssd.png'

type CartItemType = {
    id: number;
    type: string;
    name: string;
    quantity: number;
    price: number;
}

const ShoppingCartTable = () => {
    const [cartItems, setCartItems] = React.useState<CartItemType[]>([
        { id: 1, type: "hdd", name: 'Item 1', quantity: 1, price: 10 },
        { id: 2, type: "ssd", name: 'Item 2', quantity: 2, price: 20 },
        { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 },
    ]);

    const getImg = (type: string) => {
        return type === 'ram' ? ramImg : type === 'hdd' ? hddImg : ssdImg;
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });
    }

    return (
        <>
            <table className='shoppingCartTable'>
                <thead>
                    <tr>
                        <th>View</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td><img className='shoppingCartTable__img' src={getImg(item.type)} alt="product-view" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</td>
                                    <td>
                                        <select className='shoppingCartTable__quantity' value={item.quantity} onChange={
                                            (e) => {
                                                const newCartItems = cartItems.map((cartItem) => {
                                                    if (cartItem.id === item.id) {
                                                        cartItem.quantity = Number(e.target.value);
                                                    }
                                                    return cartItem;
                                                });
                                                setCartItems(newCartItems);
                                            }
                                        }>
                                            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{(item.price * item.quantity).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
                        <td>{calculateTotal()}</td>
                    </tr>
                </tfoot>
            </table>
            <div className='checkoutButtonContainer'>
                <button className='checkoutButton'>Check Out</button>
            </div>
        </>
    )
}

export default ShoppingCartTable
