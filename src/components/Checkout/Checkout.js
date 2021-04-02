import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { UserContext } from "../../App";
import Spinner from "../Spinner/Spinner";
import "./Checkout.css";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [checkoutItem, setCheckoutItem] = useState();
  const [loggedUserData] = useContext(UserContext);
  const { userName, image, email } = loggedUserData;

  const [orderDetail, setOrderDetail] = useState({
    userName,
    image,
    email,
    date: null,
    time: null,
    product: null,
  });

  useEffect(() => {
    fetch(`https://bazar-sodai.herokuapp.com/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCheckoutItem(data[0]);
        const newOrderDetail = { ...orderDetail };
        newOrderDetail.product = { ...data[0] };
        newOrderDetail.date = dateHandle();
        newOrderDetail.time = timeHandle();
        delete newOrderDetail.product._id;
        setOrderDetail(newOrderDetail);
      });
  });

  const timeHandle = () => {
    const dt = new Date();
    let hour = dt.getHours().toString();
    let min = dt.getMinutes().toString();
    let prepend;
    if (hour === 0) {
      hour = 12;
      prepend = "AM";
    } else if (hour === 12) {
      hour = 12;
      prepend = "PM";
    } else if (hour > 12) {
      hour = hour - 12;
      prepend = "PM";
    } else if (hour < 12) {
      prepend = "AM";
    }
    if (min.length < 2) {
      min = "0" + min;
    }
    const fullTime = hour + ":" + min + " " + prepend;
    return fullTime;
  };

  const dateHandle = () => {
    const dt = new Date();
    const year = dt.getFullYear();
    const day = dt.getDay();
    const month = dt.toLocaleString("default", { month: "short" });

    return day + "/" + month + "/" + year;
  };

  const history = useHistory();

  const handleCheckout = () => {
    if (orderDetail.product) {
      fetch("https://bazar-sodai.herokuapp.com/addOrder", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(orderDetail),
      }).then((res) => {
        if (res.ok) {
          history.push("/orders");
        }
      });
    }
  };
  const { name, price } = checkoutItem || {};
  return (
    <div className="container mt-5">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <h3 className="bg-white p-3 rounded text-md-start text-center">
            Checkout
          </h3>
          <div className="add-product p-4 px-md-5 px-4 mt-3 text-md-start text-center">
            <div className="row p-2 pt-3 mb-0">
              <div className="col-md-5">
                <h6>Description</h6>
              </div>
              <div className="col-md-4">
                <h6>Quantity</h6>
              </div>
              <div className="col-md-3">
                <h6>Price</h6>
              </div>
            </div>
            <hr className="mt-0" />
            <div className="row p-2 pt-3 mb-0">
              <div className="col-md-5">
                <h6>{name}</h6>
              </div>
              <div className="col-md-4">
                <h6>1</h6>
              </div>
              <div className="col-md-3">
                <h6>${price}</h6>
              </div>
            </div>
            <hr className="mt-0" />
            <div className="row p-2 pt-3 mb-0">
              <div className="col-md-5">
                <h6>Total</h6>
              </div>
              <div className="col-md-4">
                <h6>1</h6>
              </div>
              <div className="col-md-3">
                <h6>${price}</h6>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-md-end justify-content-center mt-4">
            <button onClick={handleCheckout} className="btn btn-danger my-btn">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
