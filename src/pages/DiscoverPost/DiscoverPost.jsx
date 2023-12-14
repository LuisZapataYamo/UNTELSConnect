import "./DiscoverPost.css";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalStateContext";
import { useNavigate, useParams } from "react-router-dom";

const DiscoverPost = () => {
  const { setUser, setTitlePage } = useContext(GlobalContext);
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();
  const {q} = useParams()

  useEffect(() => {
    setTitlePage("Descubrir");
    const tokenLocal = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (tokenLocal) {
          axios.defaults.headers.common["authorization"] = tokenLocal;
          const response = await axios.get("/user/detail");
          const userDetail = response.data;
          setUser(userDetail);
        } else {
          navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
        navigate("/");
      }

      const optainPosts = async () => {
        axios.defaults.headers.common["authorization"] = tokenLocal;
        let endpoint = "/post/all";
        if (q) {
          endpoint = `/post/search?search=${q}`;
        }
        console.log(endpoint);
        await axios
          .get(endpoint)
          .then((response) => {
            console.log(response.data);
            setPosts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      optainPosts();
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {}, [posts]);

  const handleClickPost = (id) => {
    navigate(`/post/${id}`)
  }

  return (
    <div className="index-discover">
      <div className="posts">
        {posts?.map((post, index) => (
          <div key={index} className="post">
            <img src={post.user.avatar} alt="" />
            <div className="info-user" onClick={() => handleClickPost(post.id)}>
              <div className="name">
                {post.user.firstName} {post.user.lastName}
              </div>
              <div className="post-title">{post.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPost;
