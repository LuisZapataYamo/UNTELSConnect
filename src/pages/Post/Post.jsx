import "./Post.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CodeBlockMarkDown from "../../components/CodeBlockMarkDown/CodeBlockMarkdown";

const Post = () => {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const tokenIsValid = localStorage.getItem("tokenIsValid");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (tokenIsValid == "false" || !token) {
      navigate("/");
    }else{
      axios.defaults.headers.common["authorization"] = token;
      axios
        .get(`/post/${postID}/`)
        .then((response) => {
          console.log(response.data);
          setPost(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);


  return (
    <div className="index-post">
      <div className="container-post">
        <div className="post-info">
          <div className="user-img">
            <img src={post?.user.avatar} alt="" />
          </div>
          <div className="info-text">
            <span className="username">
              {post?.user.firstName} {post?.user.lastName}
            </span>
            <span className="date">Publicado: {post?.createdAt}</span>
          </div>
        </div>
        <h1 className="title">{post?.title}</h1>
        <ReactMarkdown
          children={post?.content}
          components={{ code: CodeBlockMarkDown }}
          remarkPlugins={[remarkExternalLinks]}
        />
      </div>
    </div>
  );
};

export default Post;
