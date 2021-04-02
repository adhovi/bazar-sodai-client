import React, { useEffect, useState } from "react";
import "./ManageProduct.css";
import edit from "../../icons/Group 307.png";
import deleteIcon from "../../icons/Group 33150.png";
import Spinner from "../Spinner/Spinner";

const ManageProduct = () => {
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

  const deleteItem = (id) => {
    fetch(`https://bazar-sodai.herokuapp.com/deleteProduct/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === true) {
          const remainingProduct = products.filter(
            (product) => product._id !== id
          );
          setProducts(remainingProduct);
        }
      });
  };

  const editItem = (id) => {
    console.log("Editing Feature Will Come soon", id);
  };
  return (
    <div>
      <h3 className="bg-white p-3 rounded text-md-start text-center">
        Manage Product
      </h3>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <div className="add-product p-4 px-md-5 px-4 mt-3 text-md-start text-center">
            <div className="row title p-2 pt-3 mb-2">
              <div className="col-md-4">
                <h6>Product Name</h6>
              </div>
              <div className="col-md-3">Weight</div>
              <div className="col-md-3">Price</div>
              <div className="col-md-2 text-center">Action</div>
            </div>
            {products.map((product) => {
              return (
                <div className="row mt-md-4 mt-1 p-2" key={product._id}>
                  <div className="col-md-4">
                    <h6>{product.name}</h6>
                  </div>
                  <div className="col-md-3">{product.weight}</div>
                  <div className="col-md-3">${product.price}</div>
                  <div className="col-md-2 d-flex justify-content-center px-3">
                    <div>
                      <button
                        onClick={() => {
                          editItem(product._id);
                        }}
                        className="icon-btn m-0 p-0"
                      >
                        <img className="w-50" src={edit} alt="Edit"></img>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          deleteItem(product._id);
                        }}
                        className="icon-btn m-0 p-0"
                      >
                        <img className="w-50" src={deleteIcon} alt="Edit"></img>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
