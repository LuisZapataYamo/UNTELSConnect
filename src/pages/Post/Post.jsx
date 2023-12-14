import "./Post.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CodeBlockMarkDown from "../../components/CodeBlockMarkDown/CodeBlockMarkdown";
import { GlobalContext } from "../../context/GlobalStateContext";

const Post = () => {
  const { user, setUser, setTitlePage } = useContext(GlobalContext);
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [commentForm, setCommnetForm] = useState({
    text: "",
  });
  const navigate = useNavigate();

  const comentTextAreaRef = useRef(null);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    setTitlePage("Post");
    const fetchData = async () => {
      try {
        if (tokenLocal) {
          axios.defaults.headers.common["authorization"] = tokenLocal;
          const response = await axios.get("/user/detail");
          const userDetail = response.data;
          setUser(userDetail);
        }else{
          navigate("/")
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
        navigate("/");
      }

      const optainPost = async () => {
        axios.defaults.headers.common["authorization"] = tokenLocal;
        await axios
          .get(`/post/${postID}/`)
          .then((response) => {
            setPost(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      optainPost();
      
    };

    fetchData();
  }, []);

  useEffect(() => {

  }, [post])

  const handleContentPostChange = (e) => {
    const { name, value } = e.target;
    const { current } = comentTextAreaRef;
    if (current) {
      current.style.height = "100%";
      current.style.height = current.scrollHeight + "px";
    }
    setCommnetForm({
      [name]: value,
    });
  };

  const handleSumbitComment = async (e) => {
    e.preventDefault();
    console.log();
    await axios
      .post(`/post/${postID}/comments`, commentForm)
      .catch((error) => {
        console.log(error);
      });
    
      await axios
        .get(`/post/${postID}/comments/all`)
        .then((response) => {
          console.log(response.data);
          setPost({
            ...post,
            comments: response.data.comments,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };

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
        {useMemo(
          () => (
            <ReactMarkdown
              children={post?.content}
              components={{ code: CodeBlockMarkDown }}
              remarkPlugins={[remarkExternalLinks]}
            />
          ),
          [post?.content]
        )}
        <div className="container-comments">
          <form onSubmit={handleSumbitComment}>
            <h2>Comentarios</h2>
            <div className="content">
              <img src={user?.avatar} alt="" />
              <textarea
                ref={comentTextAreaRef}
                type="text"
                name="comment"
                value={commentForm.comment}
                placeholder="Escribe un comentario"
                onChange={handleContentPostChange}
              />
            </div>
            <button type="submit">Comentar</button>
          </form>
          <div className="comments">
            {post?.comments.reverse().map((comment, index) => (
              <div key={index} className="comment">
                <img src={comment.avatar} alt="" />
                <div className="info-user">
                  <div className="name">
                    {comment.firstName} {comment.lastName}
                  </div>
                  <div className="content-comment">{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
