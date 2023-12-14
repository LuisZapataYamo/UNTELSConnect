import "./Home.css";

import ServerPNG from "../../assets/png/server.png";
import JavaPNG from "../../assets/png/java.png";
import PythonPNG from "../../assets/png/python.png";
import IAPNG from "../../assets/png/machinelearning.png";
import JsPNG from "../../assets/png/js.png";
import untels1PNG from "../../assets/jpg/fondo.jpg";
import untels2PNG from "../../assets/jpg/untels2.jpg";
import untelslogoPNG from "../../assets/png/untels_logo.png";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalStateContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser, titlePage, setTitlePage } = useContext(GlobalContext);
  const tokenIsValid = localStorage.getItem("tokenIsValid");
  const navigate = useNavigate()

  useEffect(() => {
    if (tokenIsValid == "false") {
      navigate("/");
    }
    setTitlePage("Inicio");
  }, [tokenIsValid]);

  const images = [
    { src: ServerPNG, width: 2, height: 4 },
    { src: PythonPNG, width: 4, height: 3 },
    { src: JavaPNG, width: 2, height: 2 },
    { src: IAPNG, width: 3, height: 2 },
    { src: JsPNG, width: 4, height: 2 },
  ];

  const imagenes2 = [
    { src: untels1PNG, width: 2, height: 4 },
    { src: untels2PNG, width: 2, height: 4 },
  ];
  return (
    <div className="index-home">
      <div className="content">
        <div className="presentation">
          <h1>¡Bienvenidos a nuestro blog!</h1>
          <img src={untelslogoPNG} alt="" />
          <p>
            Creado por estudiantes de la UNTELS y dedicado especialmente a
            explorar temas de tecnología. Extendemos una cordial invitación a
            estudiantes y entusiastas externos que compartan nuestro interés.
            Este espacio se presenta como un ambiente acogedor donde todos
            podemos compartir y expresar libremente nuestras ideas. Únete a
            nuestra comunidad para descubrir las últimas novedades, debates
            apasionantes y contribuir al fascinante mundo de la tecnología.
          </p>
        </div>

        <div className="image-grid2">
          {imagenes2.map((image, index) => (
            <div
              key={index}
              className="grid-item"
              style={{
                backgroundImage: `url(${image.src})`,
                gridRow: `span ${image.height}`,
                gridColumn: `span ${image.width}`,
              }}
            />
          ))}
        </div>

        {/* <div className="image-grid">
          {images.map((image, index) => (
            <div
              key={index}
              className="grid-item"
              style={{
                backgroundImage: `url(${image.src})`,
                gridRow: `span ${image.height}`,
                gridColumn: `span ${image.width}`,
              }}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Home;
