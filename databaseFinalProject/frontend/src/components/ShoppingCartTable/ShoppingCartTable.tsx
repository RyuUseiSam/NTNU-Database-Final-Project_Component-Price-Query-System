import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import './ShoppingCartTable.scss';

const getData = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/getPurchaseList/");
    let Data = await response.json();
    return Data;
  };
let Data = await getData();
console.log(Data['Product']);

type ShoppingCartTableProps = {
    changable: boolean;
    cartItems: CartItemType[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
    tableTitle: string;
};

type CartItemType = {
    product_id: number;
    product_type: string;
    name: string;
    quantity: number;
    price: number;
}

const ShoppingCartTable = ({
    changable,
    cartItems,
    setCartItems,
    tableTitle
}: ShoppingCartTableProps) => {
    if(Data['Total_Price'] === 0){
        return(
            <>
            <div style={{fontSize:"20px"}}>You don't have anything to checkout</div>
            </>
        )
    }
    //const [cartItems, setCartItems] = React.useState<CartItemType[]>(Data['Product']);

    const getImg = (product_type: string) => {
        return product_type === 'RAM' ? "http://localhost:5173/static/src/assets/images/ram.png" : product_type === 'HDD' ? "http://localhost:5173/static/src/assets/images/hdd.png" : "http://localhost:5173/static/src/assets/images/ssd.png";
    }

    const handleDelete = (id: number) => {
        //For django, we need to send a request to the server to delete the item from the database
        const newCartItems = cartItems.filter((cartItem) => cartItem.product_id !== id);
        setCartItems(newCartItems);
    };

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
                {cartItems.map((item) => (
                        <tr key={item.product_id}>
                            <td><img className='shoppingCartTable__img' src={getImg(item.product_type)} alt="product-view" /></td>
                            <td>{item.name}</td>
                            <td>{item.price.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</td>
                            <td>{item.quantity}</td>
                            <td>{(item.price * item.quantity).toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
                        <td>{calculateTotal()}</td>
                    </tr>
                </tfoot>
            </table>
            <div className='checkoutButtonContainer'>
                <form action="../api/removePurchaseList/" role="form" method="post">
                    <button className='checkoutButton' name="confirm" value="1">Check Out</button>
                    <button className='checkoutButton'name="confirm" value="0">Cancel</button>
                </form>
            </div>
        </>
    );
};

export default ShoppingCartTable;

