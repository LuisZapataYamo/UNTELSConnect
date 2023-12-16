import "./EditPost.css"
import axios from "axios";
import PlusIcon from "../../assets/svg/plus.svg?react";
import DeletedIcon from "../../assets/svg/deleted.svg?react";

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalStateContext";

const SentenceInput = (props) => {
  const { value, onChange, placeholder } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    input.style.width = "6rem";
    input.style.width = `${input.scrollWidth}px`;
  });

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const EditPost = () => {
  const { setUser, setTitlePage, setNewPostID } = useContext(GlobalContext);
  const { postID } = useParams();
  const [tags, setTags] = useState([]);
  const [text, setTextError] = useState(null);
  const [formPost, setFormPost] = useState({
    title: "",
    tags: [],
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setTitlePage("Crear Post");
    const tokenLocal = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (tokenLocal) {
          axios.defaults.headers.common["authorization"] = tokenLocal;
          const response = await axios.get("/user/detail");
          const userDetail = response.data;
          setUser(userDetail);

          const responsePost = await axios.get(`/post/${postID}/`);

          setFormPost({
            title: responsePost.data.title,
            tags: responsePost.data.tags,
            content: responsePost.data.content,
          });
          setTags(responsePost.data.tags);
        
        } else {
          navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
        navigate("/");
      }
    };

    fetchData();

    

  }, [setNewPostID]);

  useEffect(() => {
    const { current: current1 } = contentPostRef;
    console.log(current1);
    if (current1) {
      current1.style.height = "100%";
      console.log(current1.style.height);
      current1.style.height = current1.scrollHeight + "px";
    }

    const { current: current2 } = textareaRef;
    if (current2) {
      current2.style.height = "8rem";
      current2.style.height = current2.scrollHeight + "px";
      console.log(current2.scrollHeight);
    }

  }, [formPost])
  

  const textareaRef = useRef(null);
  const contentPostRef = useRef(null);

  const handleAddTag = () => {
    if (tags.length < 4) {
      setTags([...tags, ""]); // Agregamos una nueva etiqueta al estado
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index && _ !== "");
    setTags(newTags);
    setFormPost({
      ...formPost,
      ["tags"]: newTags,
    });
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
    setFormPost({
      ...formPost,
      ["tags"]: newTags,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postID)
    axios
      .post(`/post/${postID}/`, formPost)
      .then((response) => {
        setNewPostID(response.data.postID);
        console.log(response.data.postID);
        navigate(`/post/${response.data.postID}`);
      })
      .catch((error) => {
        console.log("Error al publicar el Post", error);
        if (error.response.status == 401) {
          navigate("/");
        }
      });
  };

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    const { current } = textareaRef;
    if (current) {
      current.style.height = "6rem";
      current.style.height = current.scrollHeight + "px";
    }
    setFormPost({
      ...formPost,
      [name]: value,
    });
  };

  const handleContentPostChange = (e) => {
    const { name, value } = e.target;
    const { current } = contentPostRef;
    if (current) {
      current.style.height = "100%";
      current.style.height = current.scrollHeight + "px";
    }
    setFormPost({
      ...formPost,
      [name]: value,
    });
  };
  return (
    <div className="index-newpost">
      <div className="content-post">
        {/* <h1>Crear nuevo Post</h1> */}
        <form onSubmit={handleSubmit}>
          <div className="title">
            <textarea
              ref={textareaRef}
              type="text"
              name="title"
              value={formPost.title}
              placeholder="Titulo del Post"
              onChange={handleTitleChange}
            />
          </div>
          <div className="tags">
            <h2>Añade etiquetas</h2>
            <div className="content-tags">
              {tags.map((tag, index) => (
                <div key={index} className="tag">
                  <SentenceInput
                    value={tag}
                    placeholder="Etiqueta"
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <DeletedIcon onClick={() => handleRemoveTag(index)} />
                </div>
              ))}
              <PlusIcon onClick={handleAddTag} />
            </div>
          </div>
          <div className="text-post">
            <textarea
              ref={contentPostRef}
              type="text"
              name="content"
              value={formPost.content}
              placeholder="Escribe el contenido de tu post"
              onChange={handleContentPostChange}
            />
          </div>
          <button className="button-public" type="submit">
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
