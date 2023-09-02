import React, {createContext, useState, useEffect} from "react";

import { onAuthStateChangedListner, signOutUser } from "../utils/firebase/firebase.utils";

// as the actual value you want to access 
export const UserContext = createContext({
    currentUser: null,
    // what is the default value of this setter function well it is the empty function that returns null 
    // basic type of blank function
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}

    signOutUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            console.log(user);
        })
        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}