import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from "../pages/Login/Login.jsx";
import BlogLayout from "../layout/BlogLayout.jsx";

import Home from "../pages/Home/Home.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalStateContext.jsx";

const Routing = () => {
  const { user, setUser } = useContext(GlobalContext);
  const tokenLocal = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (tokenLocal) {
          // Si hay token, intentar obtener el detalle del usuario
          axios.defaults.headers.common["authorization"] = tokenLocal;
          const detailUserResponse = await axios.get("/user/detail");
          const userDetail = detailUserResponse.data;
          localStorage.setItem("user", JSON.stringify(userDetail));
          localStorage.setItem("tokenIsValid", "true");
          setUser(userDetail);
        }
      } catch (error) {
        // En caso de error, manejar de manera adecuada (redirección, mensaje de error, etc.)
        console.error("Error al verificar el token:", error);
      }
    };

    checkToken();
  }, [setUser, tokenLocal]);

  return (
    <BrowserRouter basename="/UNTELSConnect/">
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route element={<BlogLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
