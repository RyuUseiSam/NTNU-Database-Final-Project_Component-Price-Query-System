import React, { useState, useEffect } from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'
import { MdDeleteForever } from "react-icons/md";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import './Collection.scss'

type CartItemType = {
    product_id: number;
    product_type: string;
    name: string;
    price: number;
    capacity: string;
};

const getData = async () => {
    let response = await fetch("/api/get_collection_products/");
    let Data = await response.json();
    return Data;
  };
let Data = await getData();
console.log(Data[0]["Favorites"]);

const Collectoin = () => {
    //For django, we need to send a request to the server to get the order history
    const [userCollections, setUserCollections] = useState(["Favorites", "Wishlist", "Others"])
    const getImg = (product_type: string) => {
        return product_type === 'RAM' ? "https://1xb0tgjf-5173.asse.devtunnels.ms/static/src/assets/images/ram.png" : product_type === 'HDD' ? "https://1xb0tgjf-5173.asse.devtunnels.ms/static/src/assets/images/hdd.png" : "https://1xb0tgjf-5173.asse.devtunnels.ms/static/src/assets/images/ssd.png";
    }
    //------------------For Django API-------------------/

    // Initialize the userCollections when the page loads
    if(Data[0]["Favorites"]!="no item"){
        const [cartItems, setCartItems] = React.useState<CartItemType[]>(Data[0]["Favorites"]);
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
            <>
                <h1>Favorite</h1><br></br>
                <table className='shoppingCartTable'>
                <thead>
                    <tr>
                        <th>view</th>
                        <th>Product Type</th>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Price</th>
                        <th>Add to Cart</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                        <tr key={item.product_id}>
                            <td><img className='shoppingCartTable__img' src={getImg(item.product_type)} alt="product-view" /></td>
                            <td>{item.product_type}</td>
                            <td>{item.name}</td>
                            <td>{item.capacity}</td>
                            <td>{item.price}</td>
                            <td>
                            <form action="/api/add_to_cart/" role="form" method="post">
                                <input type="text" name="ProductID" style={{display: 'none'}} value={item.product_id} />
                                <input type="text" name="page" style={{display: 'none'}} value="hdd" />
                                <AddToCartButton />
                            </form>
                            </td>
                            <td>
                            <form action="/api/remove_from_collection/" role="form" method="post">
                                <input type="text" name="collection_name" style={{display: 'none'}} value="Favorites" />
                                <input type="text" name="ProductID" style={{display: 'none'}} value={item.product_id} />
                                <button style={{border: "none", background: "none", fontSize:"large"}}><MdDeleteForever /></button>
                            </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </>
        </div>

    )}
    else{
        return(
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
            <h1>No collections (Favorite) found</h1>
        </div>
        )
        
    }
}

export default Collectoin
