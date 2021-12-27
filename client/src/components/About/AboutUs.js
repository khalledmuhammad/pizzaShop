import React from "react";
import { Categories } from "../../Utils/Data";
import CategorieItem from "./CategorieItem";

function AboutUs() {
  return (
    <div
      className="container"
      id="about"
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        height: "100vh",
        alignItems:"center"
      }}
    >
      {Categories.map((item) => (
        <CategorieItem  item={item} key={item.id} />
      ))}
    </div>
  );
}

export default AboutUs;
