import React from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

import './Home.scss'
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'

type CartItemType = {
    order_id: number;
    Product: string;
    Order_Time: string;
    Total_Price: number;
}


const getData = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/getOrderHistory/");
    let Data = await response.json();
    return Data;
  };
let Data = await getData();

export default function Home() {
    if (Data[0]['Total_Price'] === 0){
        return(
            <div className='homePage'>
            <UserProfileCard></UserProfileCard>
        </div>
        )
    }
    const [cartItems, setCartItems] = React.useState<CartItemType[]>(Data);
    const renderList = (item) => {
        const listItems = [];
        let len = item.length;
        for (let i = 0; i<len; i++) {
          listItems.push(
            <li>{item[i]['name']} ({item[i]['quantity']})</li>
        );}
        return listItems;
      };
    return (
        <div className='homePage'>
            <UserProfileCard></UserProfileCard>
            <table className='shoppingCartTable'>
                <thead>
                    <tr>
                        <th>Order History List</th>
                        <th>Product</th>
                        <th>Order Time</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                        <tr key={item.order_id}>
                            <td>{item.order_id}</td>
                            <td><ul>{renderList(item.Product)}</ul></td>
                            <td>{item.Order_Time}</td>
                            <td>{item.Total_Price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
