import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://wecooking-back.onrender.com/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT WECOOKING</span>
        <img
          src="https://data.whicdn.com/images/342019590/original.jpg"
          alt="About"
        />
        <p>
          Hello! Welcome to our blog. Every week we’ll share new, easy, and delicious recipes that you're going to love.
          You’ll also be able to upload and share your own creations!
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category) => (
            <Link
              to={`/?cat=${category.name}`}
              className="link"
              key={category._id}
            >
              <li className="sidebarListItem">{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <div className="facebook">
            <i className="sidebarIcon fab fa-facebook-square"></i>
          </div>
          <div className="twitter">
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </div>
          <div className="pinterest">
            <i className="sidebarIcon fab fa-pinterest-square"></i>
          </div>
          <div className="instagram">
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
