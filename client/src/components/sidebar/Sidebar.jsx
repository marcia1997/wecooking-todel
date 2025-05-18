import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
   
  useEffect(() => {
    const getCats = async () =>
    {
      const res = await axios.get("/categories");
      setCats(res.data);    
  };
  getCats();
},[]);
   
   return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT WECOOKING</span>
        <img
          src="https://data.whicdn.com/images/342019590/original.jpg"
          alt=""
        />
        <p>
        Hello,welcome to our blog,we are going to post each week differents easy and tasty recipes that you are going to love.
      Also you are going to be able to upload your own recipes.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`}  className="link"> 
            <li className="sidebarListItem">{c.name}</li>
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