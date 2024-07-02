import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Cookies from "universal-cookie";
import { meAPI } from "../API/authService";

const cookies = new Cookies();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = useRef({ username: null });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            return;
        }

        meAPI()
            .then((response) => {
                user.current = {
                    username: response.data.data.username,
                };

                setIsAuthenticated(true);
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

        user.current = {
            username: username,
        };

        setIsAuthenticated(true);
    };

    const logout = () => {
        cookies.remove("access_token");
        cookies.remove("refresh_token");

        user.current = {
            username: null,
        };

        setIsAuthenticated(false);
    };

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
