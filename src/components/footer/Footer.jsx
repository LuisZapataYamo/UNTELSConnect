import "./Footer.css"
import LovePNG from "../../assets/png/love.png"
import PeruPNG from "../../assets/png/peru.png"
import TahuPNG from "../../assets/png/tahuantinsuyo.png"


const Footer = () => {
  return (
    <div className="footer">
      <div className="content">
        <span>Este Blog esta hecho con amor por y para DEVS</span>
        <i className="icon-love">
          <img src={LovePNG} alt="" />
        </i>
      </div>
      <div className="mark">
        <span>Website Peruano</span>
        <img src={TahuPNG} alt="" />
        <img src={PeruPNG} alt="" />
      </div>
    </div>
  );
}

export default Footer
