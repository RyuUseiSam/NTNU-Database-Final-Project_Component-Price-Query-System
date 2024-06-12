import React, { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import AddToCollectionButton from "../../components/AddToCollectionButton/AddToCollectionButton";

import "./Product.scss";

import RamData from "../../assets/ram_info.json";

// import ssdDate from "../assets/ssd_info.json";
// import hhdData from "../assets/hdd_info.json";

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
          {/* <option value="All">All</option>
          <option value="Type">Type</option>
          <option value="Brand">Brand</option>
          <option value="DDR_GEN">DDR GEN</option>
          <option value="Channel">Channel</option>
          <option value="Capacity">Capacity</option>
          <option value="Clock_Rate">Clock Rate</option>
          <option value="Remark">Remark</option>
          <option value="Price">Price</option> */}
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

export default function Ram() {
  const productCateTypeList = {
    Ram: [
      "type",
      "brand",
      "ddr_gen",
      "channel",
      "capacity",
      "clock_rate",
      "remark",
      "price",
    ],
    ssd: [
      "type",
      "brand",
      "capacity",
      "read_speed",
      "write_speed",
      "warranty",
      "price",
    ],
    hdd: [
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
  const [currentCate, setCurrentCate] = useState("Ram");
  const [cateSearch, setcateSearch] = useState([]);
  const [search1Terms, setSearch1Terms] = useState([]);

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
          <tr>
            {productCateTypeList[currentCate].map((key) => (
              <th key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
              </th>
            ))}
            <th
              style={{
                textAlign: "center",
              }}
              key={"addToCollection"}
            >
              Add to <br /> Collection / Cart
            </th>
          </tr>
        </thead>
        <tbody>
          {RamData.filter((item) => {
            // const lowerCaseItem = {
            //   type: item.type.toLowerCase(),
            //   brand: item.brand.toLowerCase(),
            //   ddr_gen: item.ddr_gen.toLowerCase(),
            //   channel: item.channel.toLowerCase(),
            //   capacity: item.capacity.toLowerCase(),
            //   clock_rate: item.clock_rate.toLowerCase(),
            //   remark: item.remark.toLowerCase(),
            //   price: item.price.toLowerCase(),
            // };
            const lowerCaseItem = {};
            productCateTypeList[currentCate].forEach((key) => {
              lowerCaseItem[key] = item[key].toLowerCase();
            });
            // return (
            //   search1Terms.length === 0 ||
            //   search1Terms.every(([category, term]) => {
            //     if (category === "All") {
            //       return Object.values(lowerCaseItem).some((value) =>
            //         value.includes(term.toLowerCase())
            //       );
            //     } else {
            //       const currentCategory = category.toLowerCase();
            //       return lowerCaseItem[currentCategory].includes(
            //         term.toLowerCase()
            //       );
            //     }
            //   })
            // );
            return (
              search1Terms.length === 0 ||
              search1Terms.every(([category, term]) => {
                if (category === "All") {
                  // return (
                  //   lowerCaseItem.type.includes(term.toLowerCase()) ||
                  //   lowerCaseItem.brand.includes(term.toLowerCase()) ||
                  //   lowerCaseItem.ddr_gen.includes(term.toLowerCase()) ||
                  //   lowerCaseItem.channel.includes(term.toLowerCase()) ||
                  //   lowerCaseItem.capacity.includes(term.toLowerCase()) ||
                  //   lowerCaseItem.clock_rate.includes(term.toLowerCase()) ||
                  //   lowerCaseItem.remark.includes(term.toLowerCase()) ||
                  //   lowerCaseItem.price.includes(term.toLowerCase())
                  // );
                  return Object.values(lowerCaseItem).some((value) =>
                    value.includes(term.toLowerCase())
                  );
                } else {
                  return lowerCaseItem[category.toLowerCase()].includes(
                    term.toLowerCase()
                  );
                  // switch (category) {
                  //   case "Type":
                  //     return lowerCaseItem.type.includes(term.toLowerCase());
                  //   case "Brand":
                  //     return lowerCaseItem.brand.includes(term.toLowerCase());
                  //   case "DDR GEN":
                  //     return lowerCaseItem.ddr_gen.includes(
                  //       term.toLowerCase()
                  //     );
                  //   case "Channel":
                  //     return lowerCaseItem.channel.includes(
                  //       term.toLowerCase()
                  //     );
                  //   case "Capacity":
                  //     return lowerCaseItem.capacity.includes(
                  //       term.toLowerCase()
                  //     );
                  //   case "Clock Rate":
                  //     return lowerCaseItem.clock_rate.includes(
                  //       term.toLowerCase()
                  //     );
                  //   case "Remark":
                  //     return lowerCaseItem.remark.includes(
                  //       term.toLowerCase()
                  //     );
                  //   case "Price":
                  //     return lowerCaseItem.price.includes(term.toLowerCase());

                  //   // 添加其他類別的判定條件
                  //   default:
                  //     return false;
                  // }
                }
              })
            );
          }).map((item) => (
            // <tr key={item.id}>
            //   <td>{item.type}</td>
            //   <td>{item.brand}</td>
            //   <td>{item.ddr_gen}</td>
            //   <td>{item.channel}</td>
            //   <td>{item.capacity}</td>
            //   <td>{item.clock_rate}</td>
            //   <td>{item.remark}</td>
            //   <td>{item.price}</td>
            // </tr>
            <tr key={uuidv4()}>
              {productCateTypeList[currentCate].map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              {/* Add to Collection Button */}
              {/* <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddToCollectionButton/>
              </td> */}
              {/* Add to Chart Button */}
              <td
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <AddToCollectionButton />
                </div>
                <AddToCartButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
