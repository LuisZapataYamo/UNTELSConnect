import { createContext, useState } from "react";


export const GlobalContext = createContext();

const GlobalStateContext = ({ children = "" }) => {
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateContext;
