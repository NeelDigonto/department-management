import { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext(null);

const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider, useUserContext };
