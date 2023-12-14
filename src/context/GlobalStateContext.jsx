import { createContext, useState } from "react";


export const GlobalContext = createContext();

const GlobalStateContext = ({ children = "" }) => {
  const [user, setUser] = useState(null);
  const [titlePage, setTitlePage] = useState("Inicio");
  const [newPostID, setNewPostID] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        titlePage,
        setTitlePage,
        newPostID,
        setNewPostID
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateContext;
