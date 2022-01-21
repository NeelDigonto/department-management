import React from "react";

const UserContext = React.createContext(null);

const useUserContext = () => {
  return React.useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState<any>(null);
  const providerValue = React.useMemo(
    () => ({ user, setUser }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider, useUserContext };
