import React, { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useShoppingCart } from "../../contexts/shoppingCartContext";

import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

import "./Product.scss";

import HhdData from "../../assets/hdd_info.json";

const TagInput = (props) => {
  const [cate, setCate] = useState("All");
  const [tags, setTags] = useState([]);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    props.setSearch([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "" && tags.length < 10) {
      setTags([...tags, [cate, event.target.value]]);
      props.setSearch([...tags, [cate, event.target.value]]);

      event.target.value = "";
    }
  };

  return (
    <div className="tagInput-area">
      <div className="tagInput-area__input-area">
        <select
          className="tagInput-area__select-cate"
          value={cate}
          onChange={(e) => setCate(e.target.value)}
        >
          <option value="All" key="All">
            All
          </option>
          {props.productCateTypeList[props.currentCate].map((key) => (
            <option value={key} key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <input
          className="tagInput-area__input-box"
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          placeholder={`Press enter to add tags (${tags.length} / 10)`}
        />
      </div>
      <ul className="tags-area">
        {tags.map((tag, index) => (
          <li key={index}>
            <span>
              {tag[0]} {tag[1]}
            </span>
            <i
              className="tags-area__tag uit uit-multiply"
              onClick={() => removeTags(index)}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Hdd() {
  const productCateTypeList = {
    Hdd: [
      "type",
      "brand",
      "series",
      "capacity",
      "memory",
      "model",
      "rpm",
      "warranty",
      "price",
    ],
  };

  const [currentCate, setCurrentCate] = useState("Hdd");
  const [cateSearch, setcateSearch] = useState([]);
  const [search1Terms, setSearch1Terms] = useState([]);
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShoppingCart();

  useEffect(() => {
    if (cateSearch.length !== 0) {
      setSearch1Terms(
        // cateSearch.split(" ").filter((term) => term.trim() !== "")
        cateSearch.map((term) => term)
      );
    } else {
      setSearch1Terms([]);
    }
  }, [cateSearch]);

  return (
    <div
      style={{
        padding: "3rem 3rem 0 3rem",
      }}
    >
      <div className="search-area">
        <TagInput
          setSearch={setcateSearch}
          currentCate={currentCate}
          productCateTypeList={productCateTypeList}
        />
      </div>
      <table className="product-table">
        <thead className="product-table__header">
          {/* Header Of Table */}
          <tr>
            {productCateTypeList[currentCate].map((key) => (
              <th
                style={{
                  textAlign: "center",
                }}
                key={key}
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
              </th>
            ))}
            <th
              style={{
                textAlign: "center",
              }}
              key={"addToCart"}
            >
              Add to Cart
            </th>
          </tr>
        </thead>
        <tbody>
          {HhdData.filter((item) => {
            const lowerCaseItem = {};
            productCateTypeList[currentCate].forEach((key) => {
              lowerCaseItem[key] = item[key].toLowerCase();
            });

            return (
              search1Terms.length === 0 ||
              search1Terms.every(([category, term]) => {
                if (category === "All") {
                  return Object.values(lowerCaseItem).some((value) =>
                    value.includes(term.toLowerCase())
                  );
                } else {
                  return lowerCaseItem[category.toLowerCase()].includes(
                    term.toLowerCase()
                  );
                }
              })
            );
          }).map((item) => (
            <tr key={uuidv4()}>
              {productCateTypeList[currentCate].map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              {/* Add to Chart Button */}
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddToCartButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
