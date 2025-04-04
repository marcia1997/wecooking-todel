import React from "react";
import {useContext} from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./topbar.css"

export default function Topbar(){
  const { user,dispatch } = useContext(Context);

   const handleLogout = () => {
     dispatch({type: "LOGOUT"});
   };
    return (
        <div className="top">
        <div className="topLeft">
        <i class="topIcon fab fa-facebook-square"></i>
        <i class="topIcon fab fa-twitter-square"></i>
        <i class="topIcon fab fa-pinterest-square"></i>
        <i class="topIcon fab fa-instagram-square"></i>
        </div>
        <div className="topCenter">
        <ul className="topList">
            <li className="topListItem">
                <Link className ="link" to="/">HOME</Link>
            </li>
            <li className="topListItem"><Link className="link" to="/">
              ABOUT
              </Link>
              </li>
            <li className="topListItem"><Link className="link" to="/">
              CONTACT
              </Link>
              </li>
            <li className="topListItem"><Link className="link" to="/write">
              WRITE
              </Link>
              </li>
              <li className="topListItem" onClick={handleLogout}>
               {user && "LOGOUT"}
          </li>
        </ul>
        </div>
        <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={user.profilePic} alt="" />
          </Link> 
                ) : (
            <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/Login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/Register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}