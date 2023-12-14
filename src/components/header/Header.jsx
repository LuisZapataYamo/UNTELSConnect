import "./Header.css";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalStateContext";
import FacebookIcon from "../../assets/svg/facebook.svg?react";
import InstagramIcon from "../../assets/svg/instagram.svg?react";
import UniversityIcon from "../../assets/svg/university.svg?react";
import WhatsappIcon from "../../assets/svg/whatsapp.svg?react";
import PlusIcon from "../../assets/svg/plus.svg?react";
import UNTELSPNG from "../../assets/png/untels_escudo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser, titlePage, setTitlePage } = useContext(GlobalContext);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
  const [contentSearch, setContentSearch] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setMenuVisible(false);
    if (titlePage == "Crear Post") {
      setIsNewPost(true);
    } else {
      setIsNewPost(false);
    }
  }, [titlePage]);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleClickLogo = () => {
    navigate("/discover");
  }

  const handleCreatedPost = () => {
    navigate("/newPost");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenIsValid");
    // localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSettings = () => {
    // TODO: Falta realizar logica para settings
    // Lógica para ir a la página de configuración o mostrar un modal de configuración
    console.log("Go to Settings");
  };


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/discover/${contentSearch}`);
      console.log("Se presionó Enter");
    }
  };

  return (
    <div className="header-home">
      <ul className="list-icon-social">
        <li className="icon-page" onClick={handleClickLogo}>
          <img src={UNTELSPNG} alt="" />
          UC
        </li>
        <li className="title-page">{titlePage}</li>
      </ul>
      {!isNewPost && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="UNTELSConnect"
            onKeyUp={handleKeyPress}
            onChange={(e) => setContentSearch(e.target.value)}
          />
        </div>
      )}

      <div className="hi">
        {!isNewPost && (
          <i onClick={handleCreatedPost}>
            <PlusIcon />
            Post
          </i>
        )}

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
