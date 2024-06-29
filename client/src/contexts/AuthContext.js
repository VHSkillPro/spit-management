import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import api from "../api";

const cookies = new Cookies();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get("v1/auth/me")
            .then((response) => {
                setUsername(response.data.data.username);
                setIsAuthenticated(true);
            })
            .catch((error) => {})
            .finally(() => {
                setIsLoading(false);
            });
    });

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, username, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
