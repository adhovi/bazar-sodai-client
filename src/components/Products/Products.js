import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Spinner from "../Spinner/Spinner";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://bazar-sodai.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="container mbb-5 pb-5">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="row mx-md-5 mx-4">
          {products.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
