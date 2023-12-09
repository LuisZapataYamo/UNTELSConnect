import "./Header.css";

import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalStateContext";
import FacebookIcon from "../../assets/svg/facebook.svg?react";
import InstagramIcon from "../../assets/svg/instagram.svg?react";
import UniversityIcon from "../../assets/svg/university.svg?react";
import WhatsappIcon from "../../assets/svg/whatsapp.svg?react";
import PlusIcon from "../../assets/svg/plus.svg?react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenIsValid");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSettings = () => {
    // Lógica para ir a la página de configuración o mostrar un modal de configuración
    console.log("Go to Settings");
  };

  return (
    <div className="header-home">
      <ul className="list-icon-social">
        <li className="icon-social">
          <FacebookIcon />
        </li>
        <li className="icon-social">
          <InstagramIcon />
        </li>
        <li className="icon-social">
          <UniversityIcon />
        </li>
        <li className="icon-social">
          <WhatsappIcon />
        </li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="UNTELSConnect" />
      </div>
      <div className="hi">
        <i>
          <PlusIcon />
          Post
        </i>
        <div className="perfil-menu-container">
          <div className="perfil-menu" onClick={toggleMenu}>
            <img src={user?.avatar} alt="img-avatar" />
            <span>Hola, {user?.firstName}</span>
          </div>
          {isMenuVisible && (
            <div className="menu-options">
              <ul>
                <li onClick={handleSettings}>Settings</li>
                <li onClick={handleSignOut}>Sign Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
