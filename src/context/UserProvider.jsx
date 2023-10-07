import React, { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});
    
    const updateUser = (newData) => {
        setUser(newData)
    }
    

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};


//hace falta llamar o userProvider no ambito que necesite 