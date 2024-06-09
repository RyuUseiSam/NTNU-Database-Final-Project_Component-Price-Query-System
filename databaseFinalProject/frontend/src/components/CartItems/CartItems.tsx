import React from 'react'
import { MdDeleteForever } from "react-icons/md";

import ramImg from '../../assets/images/ram.png';
import hddImg from '../../assets/images/hdd.png';
import ssdImg from '../../assets/images/ssd.png';

import './CartItems.scss'



const CartItems = ({ id, type, name, quantity, price }) => {
    const [cartQuantity, setCartQuantity] = React.useState(quantity);
    const img = type === 'ram' ? ramImg : type === 'hdd' ? hddImg : ssdImg;
    const formattedPrice = price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });

    return (
        <div className='CartItem'>
            <div className="CartItem__detail-container">
                <img className='CartItem__Img' src={img} alt="" />
                <div className="CartItem__name">{name}</div>
            </div>
            <div>{formattedPrice}</div>


            <select className='CartItem__quantity' value={cartQuantity} onChange={(e) => setCartQuantity(e.target.value)}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <div>{(price * quantity).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</div>
            <div className='CartItem__remove-btn'>
                <MdDeleteForever />
            </div>
        </div>
    )
}

export default CartItems
