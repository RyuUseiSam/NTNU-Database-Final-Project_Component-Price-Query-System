import React, { useState, useEffect } from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

import './Collection.scss'

type CartItemType = {
    id: number;
    type: string;
    name: string;
    quantity: number;
    price: number;
};

const Collectoin = () => {
    //For django, we need to send a request to the server to get the order history
    const [userCollections, setUserCollections] = useState([

    ])
    const [cartItems, setCartItems] = React.useState<CartItemType[]>([
        // { id: 1, type: "hdd", name: 'Item 1', quantity: 1, price: 10 },
        // { id: 2, type: "ssd", name: 'Item 2', quantity: 2, price: 20 },
        // { id: 3, type: "ssd", name: 'Item 3', quantity: 3, price: 30 }, For testing purposes
    ]);


    //------------------For Django API-------------------//
    const getCollections = async () => {
        try {
            const response = await fetch(`https://127:0.0.1:8000/api/get_user_collections/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const collectionData = await response.json();
            console.log(collectionData);

            // Set the collections of the user
            setUserCollections(collectionData.collections);
        } catch (error) {
            console.log(error);
        }
    }

    const getProductInCollection = async (collectionName) => {
        try {
            fetch(`https://127:0.0.1:8000/api/get_collection_products/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // API Request data 
                body: JSON.stringify({
                    collection_name: collectionName,
                }),
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const products = data.products;
                    setCartItems(products); // I'm not sure if this is correct
                });
        } catch (error) {
            console.log(error);
        }
    }

    // Initialize the userCollections when the page loads

    //Get the collections of the user
    getCollections();

    //Get the products in the first collection
    if (userCollections.length > 0)
        getProductInCollection(userCollections[0])
    else {
        console.log("No collections found");
    }

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

            {userCollections.length > 0 &&
                <>
                    <select className="collectionName" name="" id=""
                        onChange={(e) => getProductInCollection(e.target.value)}
                    >
                        {userCollections.map((collection) => (
                            <option value={collection} key={collection}>{collection}</option>
                        ))}
                    </select>
                    <ShoppingCartTable
                        changable={true}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        tableTitle='Collection'
                    ></ShoppingCartTable>
                </>
            }
            {
                userCollections.length === 0 &&
                <h1>No collections found</h1>
            }
        </div>

    )
}

export default Collectoin
