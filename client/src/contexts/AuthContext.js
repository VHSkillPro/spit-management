import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../API/api";
import Cookies from "universal-cookie";

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

    const login = (username, accessToken, refreshToken) => {
        cookies.set("access_token", accessToken, {
            sameSite: true,
            secure: true,
        });

        cookies.set("refresh_token", refreshToken, {
            sameSite: true,
            secure: true,
        });

        setUsername(username);
        setIsAuthenticated(true);
    };

    const logout = () => {
        cookies.remove("access_token");
        cookies.remove("refresh_token");
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
