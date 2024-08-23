import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Load the current user from localStorage, defaulting to null if not found
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Function to update the current user in the context
    const updateUser = (data) => {
        setCurrentUser(data);
    };

    // Update localStorage whenever currentUser changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    // Function to get the role of the current user
    const getRole = () => currentUser?.role;

    return (
        <AuthContext.Provider value={{ currentUser, updateUser, getRole }}>
            {children}
        </AuthContext.Provider>
    );
};
