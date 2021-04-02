import React, { useState } from "react";
import AddProduct from "../AddProduct/AddProduct";
import EditProduct from "../EditProduct/EditProduct";
import ManageProduct from "../ManageProduct/ManageProduct";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [active, setActive] = useState("add");
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 menubar p-0 pt-4 position-sticky">
          <Sidebar active={active} setActive={setActive}></Sidebar>
        </div>
        <div className="col-md-9 pt-4 px-md-5 px-3 bg-clr mb-5 pb-5">
          {active === "add" && <AddProduct></AddProduct>}
          {active === "manage" && <ManageProduct></ManageProduct>}
          {active === "edit" && <EditProduct></EditProduct>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
