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
        if (!isLoading) {
            return;
        }

        api.get("v1/auth/me")
            .then((response) => {
                setUsername(response.data.data.username);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch((error) => {
                const refreshToken = cookies.get("refresh_token");

                if (!refreshToken) {
                    setIsLoading(false);
                    return;
                }

                api.post("v1/auth/refresh_token", {
                    refreshToken,
                })
                    .then((response) => {
                        const data = response.data.data;

                        cookies.set("access_token", data.accessToken.token, {
                            expires: new Date(
                                Date.now() + data.accessToken.expired * 1000
                            ),
                            sameSite: true,
                            secure: true,
                        });

                        cookies.set("refresh_token", data.refreshToken.token, {
                            expires: new Date(
                                Date.now() + data.refreshToken.expired * 1000
                            ),
                            sameSite: true,
                            secure: true,
                        });

                        setUsername(data.username);
                        setIsAuthenticated(true);
                    })
                    .catch((error) => {})
                    .finally(() => {
                        setIsLoading(false);
                    });
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
