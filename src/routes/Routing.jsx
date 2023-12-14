import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from "../pages/Login/Login.jsx";
import BlogLayout from "../layout/BlogLayout.jsx";

import Home from "../pages/Home/Home.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalStateContext.jsx";
import CreatedPost from "../pages/CreatePost/CreatedPost.jsx";
import Post from "../pages/Post/Post.jsx";

const Routing = () => {
  const { user, setUser } = useContext(GlobalContext);

  useEffect((e) => {
    const tokenLocal = localStorage.getItem("token");
    const checkToken = async() => {
      console.log("Routing ejecutandose")
      if (tokenLocal) {
        // Si hay token, intentar obtener el detalle del usuario
        axios.defaults.headers.common["authorization"] = tokenLocal;
        await axios
          .get("/user/detail")
          .then((response) => {
            const userDetail = response.data;
            localStorage.setItem("tokenIsValid", "true");
            setUser(userDetail);
          })
          .catch((error) => {
            console.log("Error al verificar el token:", error.response.error);
            localStorage.setItem("tokenIsValid", "false");
            localStorage.removeItem("token")
          });
      }
    };

    checkToken();

  }, [setUser]);

  return (
    <BrowserRouter basename="/UNTELSConnect/">
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route element={<BlogLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/newPost" element={<CreatedPost />} />
          <Route path="/post/:postID" element={<Post />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
