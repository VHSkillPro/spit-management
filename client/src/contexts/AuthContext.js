import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import api from "../API/api";

const cookies = new Cookies();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            return;
        }

        api.get("v1/auth/me")
            .then((response) => {
                login(response.data.data.username);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    });

    const login = (username) => {
        setUsername(username);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUsername(null);
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
