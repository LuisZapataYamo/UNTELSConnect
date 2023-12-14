import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/");
  })
  return (
    <div className="notfound">
      <div>
        <h2>404 - Página no encontrada</h2>
      </div>
    </div>
  );
}

export default NotFound
