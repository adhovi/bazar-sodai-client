import React from "react";
import "./Sidebar.css";
import ManageIcon from "../../icons/grid 1.png";
import AddIcon from "../../icons/plus 1.png";
import EditIcon from "../../icons/edit 1.png";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const { active, setActive } = props;
  return (
    <div className="text-center menu-item">
      <Link className="my-link" to="/">
        <h2>Bazar-Sodai</h2>
      </Link>
      <ul className="mt-5 text-center p-0 ">
        <li
          onClick={() => setActive("manage")}
          className={active === "manage" ? `active-bg` : ``}
        >
          <img src={ManageIcon} alt="" />
          Manage Products
        </li>
        <li
          onClick={() => setActive("add")}
          className={active === "add" ? `active-bg` : ``}
        >
          <img src={AddIcon} alt="" />
          Add Product
        </li>
        <li
          onClick={() => setActive("edit")}
          className={active === "edit" ? `active-bg` : ``}
        >
          <img src={EditIcon} alt="" />
          Edit Product
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
