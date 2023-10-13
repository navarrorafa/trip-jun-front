import React, { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState("");

  //   const updateUser = (newData) => {
  //     setUser(newData);
  //   };

  return (
    <UserContext.Provider value={{ userStatus, setUserStatus }}>
      {children}
    </UserContext.Provider>
  );
};

//hace falta llamar o userProvider no ambito que necesite
