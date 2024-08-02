import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import messageIcon from "../../assets/message.png";
import handshakeIcon from "../../assets/handshake.png";
import logoutIcon from "../../assets/logout.png";
import userIcon from "../../assets/user.png";
import userDefaultPic from "../../assets/perfilPic.png";

const Dropdown = () => {
  const getUserFromLS = localStorage.getItem("user");
  const [showDropDown, setShowDropDown] = useState(false);
  const [user, setUser] = useState({});
  const dropdownRef = useRef(null);

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (getUserFromLS) {
      setUser(JSON.parse(getUserFromLS));
    }

    return () => {

    }
  }, [getUserFromLS]);

  console.log(user);


  return (
    <div className="dropdownWrapper" ref={dropdownRef}>
      <div className="userImage">
        <img src={user?.Foto ? user?.Foto : userDefaultPic} alt="" onClick={handleDropDown} />
      </div>
      {
        showDropDown &&
        <div className="dropdown">
          <div>
            <div className="usersSection">
              <img src={user?.Foto ? user?.Foto : userDefaultPic} alt="" />
              {/* <img src={userDefaultPic} alt="" /> */}
              <div className="nameEmail">
                <h6>{user?.Nombre} {user?.Apellido}</h6>
                <p>{user?.Email}</p>
              </div>
            </div>
            <div className="dropdownMenu">
              <div className="dropdownItems">
                <Link to="/" onClick={handleDropDown}>
                  <img src={userIcon} alt="" />
                  Mi cuenta
                </Link>
                <Link to="/convierteenafiliado" onClick={handleDropDown}>
                  <img src={handshakeIcon} alt="" />
                  Conviértete en afiliado
                </Link>
                <Link to="/sugerirunamejora" onClick={handleDropDown}>
                  <img src={messageIcon} alt="" />
                  Sugerir una mejora
                </Link>
                <Link to="/salir" onClick={handleDropDown}>
                  <img src={logoutIcon} alt="" />
                  Salir
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Dropdown;
