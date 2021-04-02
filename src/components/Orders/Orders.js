import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import deleteIcon from "../../icons/Group 33150.png";
import { UserContext } from "../../App";
import Spinner from "../Spinner/Spinner";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [loggedUserData] = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(
      `https://bazar-sodai.herokuapp.com/orders?email=${loggedUserData.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [loggedUserData.email]);

  const deleteItem = (id) => {
    fetch(`https://bazar-sodai.herokuapp.com/deleteOrder/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === true) {
          const remainingOrder = orders.filter((order) => order._id !== id);
          setOrders(remainingOrder);
        }
      });
  };

  const totalCalculator = (value) => {
    if (orders) {
      const totalValue = orders.reduce((total, order) => {
        total += Number(isNaN(order.product[value]) ? 0 : order.product[value]);
        return total;
      }, 0);
      return totalValue;
    }
  };

  return (
    <div className="container">
      <div className="w-100 d-flex flex-md-row flex-column justify-content-md-between justify-content-center align-items-center p-md-4 p-0 pt-4">
        <h3 className="text-md-start text-center mb-md-0 mb-4">Your Orders</h3>
        <div>
          <h5 className="text-md-start text-center mb-2">
            Name: {loggedUserData.userName}
          </h5>
          <h5 className="text-md-start text-center mt-2">
            Email: {loggedUserData.email}
          </h5>
        </div>
      </div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="add-product p-4 px-md-5 px-4 mt-3 text-md-start text-center">
          <div className="row p-2 pt-3 mb-2">
            <div className="col-md-5">
              <h6>Product Details</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>Quantity</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>Weight</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>Price</h6>
            </div>
            <div className="col-md-2 text-center">
              <h6>Date</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>Time</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>Action</h6>
            </div>
          </div>
          <hr className="mt-0" />
          {orders.map((order) => {
            return (
              <div className="row mt-md-3 mt-3 p-2" key={order._id}>
                <div className="col-md-5 order-details d-flex align-items-center flex-md-row flex-column">
                  <img src={order.product.img} alt="" />
                  <div className="flex-1 ms-md-3 ms-0 mt-2">
                    <h6>{order.product.name}</h6>
                  </div>
                </div>
                <div className="col-md-1 text-center">1</div>
                <div className="col-md-1 text-center">
                  {order.product.weight}
                </div>
                <div className="col-md-1 text-center">
                  ${order.product.price}
                </div>
                <div className="col-md-2 text-center">{order.date}</div>
                <div className="col-md-1 text-center">{order.time}</div>
                <div className="col-md-1 d-flex justify-content-center px-0">
                  <div>
                    <button
                      onClick={() => {
                        deleteItem(order._id);
                      }}
                      className="icon-btn m-0 p-0"
                    >
                      <img
                        className="icon-delete"
                        src={deleteIcon}
                        alt="Edit"
                      ></img>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <hr className="mt-0" />
          <div className="row p-2 pt-0 mb-0">
            <div className="col-md-5 ps-md-4 px-0">
              <h5 className="ps-md-5 ps-0">Total</h5>
            </div>
            <div className="col-md-1 text-center">
              <h6>{orders.length}</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>{}</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>${orders && totalCalculator("price")}</h6>
            </div>
            <div className="col-md-2 text-center">
              <h6>{}</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>{}</h6>
            </div>
            <div className="col-md-1 text-center">
              <h6>{}</h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
