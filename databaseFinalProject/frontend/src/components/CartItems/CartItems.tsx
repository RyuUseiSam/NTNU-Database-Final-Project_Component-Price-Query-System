import React from 'react'
import { MdDeleteForever } from "react-icons/md";

//import ramImg from "http://localhost:5173/static/src/assets/images/ram.png";
//import hddImg from "http://localhost:5173/static/src/assets/images/hdd.png";
//import ssdImg from "http://localhost:5173/static/src/assets/images/ssd.png";

import './CartItems.scss'


const CartItems = ({ product_id, product_type, name, quantity, price, left }) => {
    const [cartQuantity, setCartQuantity] = React.useState(quantity);
    const img = product_type === 'RAM' ? "http://localhost:5173/static/src/assets/images/ram.png" : product_type === 'HHD' ? "http://localhost:5173/static/src/assets/images/hdd.png" : "http://localhost:5173/static/src/assets/images/ssd.png";
    const formattedPrice = price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });

    return (
        <div className='CartItem'>
            <div className="CartItem__detail-container">
                <img className='CartItem__Img' src={img} alt="" />
                <div className="CartItem__name">{name}</div>
            </div>
            <div>{formattedPrice}</div>

            <select className='CartItem__quantity' value={cartQuantity} onChange={
                (e) => {
                    const newQuantity = Number(e.target.value)
                    setCartQuantity(newQuantity)}
                }>
                {Array.from({ length: left }, (_, i) => i + 1).map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <input type="text" name={"quantity" + product_id} style={{display: 'none'}} value={cartQuantity}/>

            <form action="../api/remove_from_cart/" role="form" method="post">
                <input type="text" name="ProductID" style={{display: 'none'}} value={product_id}/>
                <button className='CartItem__remove-btn' style={{border: "none", background: "none"}}><MdDeleteForever /></button>
            </form>
        </div>
    )
}

export default CartItems
//<div>{(price * quantity).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</div>
