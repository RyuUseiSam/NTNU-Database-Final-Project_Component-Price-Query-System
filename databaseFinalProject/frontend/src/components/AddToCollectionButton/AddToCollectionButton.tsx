import React, { useState } from "react";
import { MdStar } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import Popup from "../Popup/Popup";


import './AddToCollectionButton.scss'


// @api_view(["POST"])
// def add_to_collection(request):
//     try:
//         try:
//             user_id = request.session["is_login"] 
//         except:
//             messages.warning(request, "You need to log in first")
//             return redirect("/login/") 
//         collection_name = request.data["collection_name"]
//         product_id = request.data["product_id"]

//         # Check if product exists
//         if not Product.objects.filter(product_id=product_id).exists():
//             return Response({"error": "Product does not exist"})

//         # Check if collection exists
//         if not Collection.objects.filter(
//             user_id=user_id, collection_name=collection_name
//         ).exists():
//             return Response({"error": "Collection does not exist"})

//         # Check if product is already in the collection
//         if Collection.objects.filter(
//             user_id=user_id, collection_name=collection_name, product_id=product_id
//         ).exists():
//             return Response({"error": "Product is already in the collection"})

//         # Add product to collection
//         Collection.objects.create(
//             user_id=user_id, collection_name=collection_name, product_id=product_id
//         )

//         return Response({"message": "Product added to collection successfully"})

//     except KeyError:
//         return Response({"error": "Invalid data"})


// @api_view(["POST"])
// def get_all_collections(request):
//     try:
//         try:
//             user_id = request.session["is_login"] 
//         except:
//             messages.warning(request, "You need to log in first")
//             return redirect("/login/")
//         collections = Collection.objects.filter(user_id=user_id)
//         if not collections.exists():
//             return Response({"message": "No collections found for this user"})

//         collection_list = []
//         for collection in collections:
//             collection_list.append(collection.collection_name)

//         return Response({"collections": collection_list})

//     except Exception as e:
//         return Response({"error": str(e)})



// @api_view(["POST"])
// def create_collection(request):
//     try:
//         try:
//             user_id = request.session["is_login"] 
//         except:
//             messages.warning(request, "You need to log in first")
//             return redirect("/login/")
//         collection_name = request.data["collection_name"]
//         product_id = request.data.get("product_id")  # allow empty product_id

//         # Check if collection name already exists
//         if Collection.objects.filter(
//             user_id=user_id, collection_name=collection_name
//         ).exists():
//             return Response({"error": "Collection already exists"})

//         if product_id is not None:
//             # Chek if product exists
//             if not Product.objects.filter(product_id=product_id).exists():
//                 return Response({"error": "Product does not exist"})

//         # create new collection
//         collection = Collection.objects.create(
//             user_id=user_id, collection_name=collection_name, product_id=product_id
//         )
//         return Response(
//             {
//                 "message": "Collection created successfully",
//                 "collection_id": collection.collection_id,
//                 "collection_name": collection.collection_name,
//             }
//         )

//     except KeyError:
//         return Response({"error": "Invalid data"})



const AddToCollectionButton = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
 
    const [userCollections, setUserCollections] = useState(["Favorites", "Wishlist", "Cart"]); // ["Favorites", "Wishlist", "Cart"  
    const temp_user_id = 1;
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

            // return collectionList;
            setUserCollections(collectionData.collections);
        } catch (error) {
            console.log(error);
        }

    }

    const createCollection = async (collectionName, id) => {
        try {
            const response = await fetch(`https://127:0.0.1:8000/api/create_collection/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collection_name: collectionName,
                    product_id: id,
                }),
            });
            const data = await response.json();
            console.log(data);

        } catch (error) {
            alert("Error creating collection");
            console.log(error);
        }
    }


    const addItemInCollection = async (collectionName, id) => {
        try {
            const response = await fetch(`https://127:0.0.1:8000/api/add_to_collection/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collection_name: collectionName,
                    product_id: id,
                }),
            });
            const data = await response.json();
            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    };


    //------------------For Event Handler-------------------//
    // Get all collections
    const popupInit = () => {
        setIsOpen(true);
        getCollections();
    }

    // New Collection Button Event Handler
    const newCollectionAndAddItem = () => {
        const collectionName = prompt("Enter the name of the collection");
        if (collectionName === null || collectionName === "") {
            alert("Please enter a valid collection name");
            return;
        }
        else if (userCollections.includes(collectionName)) {
            addItemInCollection(collectionName, id);
            return;
        }
        createCollection(collectionName, id);
        setIsOpen(false);
    }

    return (
        <>
            <div className="addToCart-btn" onClick={() => popupInit()}>
                <MdStar />
            </div>
            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    <h2 className="collection-heading">Product added to collection</h2>
                    {userCollections.map((collection) => (
                        <button className="collection-button" key={collection} onClick={() => {
                            addItemInCollection(collection, id);
                            setIsOpen(false);
                        }
                        }>
                            {collection}
                        </button>
                    ))}

                    <button
                        className="collection-button"
                        onClick={() => newCollectionAndAddItem()}>
                        New Collection <IoIosAddCircleOutline />
                    </button>
                </div>
            </Popup >
        </>

    );
};

export default AddToCollectionButton;
