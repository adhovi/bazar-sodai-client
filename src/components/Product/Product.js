import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const { name, weight, price, img, _id } = props.product;
  return (
    <div className="col-md-3">
      <div className="card my-card p-3">
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body my-body">
          <h6 className="card-title">
            {name} - {weight}
          </h6>
        </div>
        <div className="card-footer my-footer mt-auto d-flex justify-content-between align-items-center">
          <h3 className="ml-auto text-danger">${price}</h3>
          <Link to={`/checkout/${_id}`} className="btn btn-danger my-btn">
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
