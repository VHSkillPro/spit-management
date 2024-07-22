import React, { createContext, useContext, useEffect, useState } from "react";
import { meAPI } from "../API/authService";
import { logoutRef } from "../global";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Kiểm tra xem user đã login trước đó chưa
    useEffect(() => {
        meAPI()
            .then((response) => {
                const user = {
                    username: response.data.data.username,
                    roleId: response.data.data.roleId,
                };
                setUser(user);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // Hàm xử lý đăng nhập
    const login = () => {
        meAPI()
            .then((response) => {
                const user = {
                    username: response.data.data.username,
                    roleId: response.data.data.roleId,
                };
                setUser(user);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    };

    // Hàm xử lý đăng xuất
    const logout = () => {
        setUser({});
        setIsAuthenticated(false);
    };

    // Lưu hàm đăng xuất để truy cập toàn cục
    logoutRef.current = logout;

    // Nếu còn đăng kiểm tra thì hiển thị "Loading..."
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
