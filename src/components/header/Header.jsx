import "./Header.css";

import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalStateContext";
import FacebookIcon from "../../assets/svg/facebook.svg?react";
import InstagramIcon from "../../assets/svg/instagram.svg?react";
import UniversityIcon from "../../assets/svg/university.svg?react";
import WhatsappIcon from "../../assets/svg/whatsapp.svg?react";
import PlusIcon from "../../assets/svg/plus.svg?react";

const Header = () => {
  const { user, setUser } = useContext(GlobalContext);
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
        <div className="perfil-menu">
          <img src={user?.avatar} alt="img-avatar" />
          <span>Hola, {user?.firstName}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
