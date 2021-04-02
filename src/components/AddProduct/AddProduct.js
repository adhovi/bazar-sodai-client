import React, { useState } from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const [productAdded, setProductAdded] = useState(false);
  const [productDetail, setProductDetail] = useState({
    name: null,
    weight: null,
    price: null,
    img: null,
  });

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    if (name && weight && price && img) {
      fetch("https://bazar-sodai.herokuapp.com/addProduct", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productDetail),
      }).then((res) => {
        if (res.ok === true) {
          const newProduct = { ...productDetail };
          newProduct.name = null;
          newProduct.weight = null;
          newProduct.price = null;
          newProduct.img = null;
          setProductDetail(newProduct);
        }
        res.ok && setProductAdded(true);
      });
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "img") {
      const imageData = new FormData();
      imageData.set("key", "cab69cdca5cf6c27b8fde98ad6de678b");
      imageData.append("image", e.target.files[0]);
      fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imageData,
      })
        .then((res) => res.json())
        .then((data) => {
          const newDetail = { ...productDetail };
          newDetail.img = data.data.image.url;
          setProductDetail(newDetail);
        });
    } else {
      const newDetail = { ...productDetail };
      newDetail[e.target.name] = e.target.value;
      setProductDetail(newDetail);
    }
    setProductAdded(false);
  };
  const { name, weight, price, img } = productDetail;
  return (
    <div>
      <h3 className="bg-white p-3 rounded text-md-start text-center">
        Add Product
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="py-3">
        <div className="add-product p-3 text-md-start text-center">
          <div className="row">
            <div className="col-md-6 form-group px-4 py-2">
              <h6>Product Name</h6>
              <input
                name="name"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={name}
                placeholder="Enter Product Name"
                onChange={handleChange}
              />
              {errors.name && (
                <span className="error">This Option is required</span>
              )}
            </div>
            <div className="col-md-6 form-group px-4 py-2">
              <h6>Product Weight</h6>
              <input
                name="weight"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={weight}
                placeholder="Enter Product Weight"
                onChange={handleChange}
              />
              {errors.name && (
                <span className="error">This Option is required</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group px-4 py-2">
              <h6>Product Price</h6>
              <input
                name="price"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={price}
                placeholder="Enter Product Price"
                onChange={handleChange}
              />
              {errors.price && (
                <span className="error">This Option is required</span>
              )}
            </div>
            <div className="col-md-6 form-group px-4 py-2">
              <h6>Product Image</h6>
              <input
                type="file"
                name="img"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={img}
                placeholder="Enter Product Image"
                onChange={handleChange}
              />
              {errors.name && (
                <span className="error">This Option is required. </span>
              )}
              {img ? (
                <span className="success">Image added Successfully.</span>
              ) : (
                <span className="error">
                  After Selection Image wait the upload confirmation.
                </span>
              )}
            </div>
          </div>
        </div>
        {productAdded && (
          <span className="success mt-3">Product added Successfully.</span>
        )}
        <div className="form-group d-flex justify-content-md-end justify-content-center mt-4">
          <button className="btn btn-danger my-btn" type="submit">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
