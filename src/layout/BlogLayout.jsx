import "./BlogLayout.css"

import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalStateContext";

const BlogLayout = () => {
  const { user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const tokeIsValid = localStorage.getItem("tokenIsValid");
    if (tokeIsValid === "false") {
      navigate("/");
    }
  }, []);

  return (
    <div className="home-blog">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default BlogLayout;
