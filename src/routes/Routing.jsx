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
import DiscoverPost from "../pages/DiscoverPost/DiscoverPost.jsx";

const Routing = () => {
  const { user, setUser } = useContext(GlobalContext);

  return (
    <BrowserRouter basename="/UNTELSConnect/">
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route element={<BlogLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/discover/" element={<DiscoverPost />} />
          <Route path="/discover/:q" element={<DiscoverPost />} />
          <Route path="/newPost" element={<CreatedPost />} />
          <Route path="/post/:postID" element={<Post />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
