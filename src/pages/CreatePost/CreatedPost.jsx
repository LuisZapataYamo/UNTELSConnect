import "./CreatedPost.css";
import PlusIcon from "../../assets/svg/plus.svg?react";
import DeletedIcon from "../../assets/svg/deleted.svg?react";
import { useState } from "react";

const CreatedPost = () => {
  const [tags, setTags] = useState([""]);

  const handleAddTag = () => {
    if (tags.length < 3) {
      setTags([...tags, ""]); // Agregamos una nueva etiqueta al estado
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="index-newpost">
      <div className="content-post">
        <h1>Crear nuevo Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="title">
            <input type="text" placeholder="Titulo del Post" />
          </div>
          <div className="tags">
            <h2>Añade etiquetas</h2>
            <div className="content-tags">
              {tags.map((tag, index) => (
                <div key={index} className="tag">
                  <input
                    type="text"
                    placeholder="Etiqueta"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <DeletedIcon onClick={() => handleRemoveTag(index)} />
                </div>
              ))}
              <PlusIcon onClick={handleAddTag} />
            </div>
          </div>
          <div className="text-post">
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatedPost;
