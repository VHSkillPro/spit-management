import axios from "axios";
import Cookies from "universal-cookie";
import { refreshTokensAPI } from "./authService";
import { logoutRef } from "../global";

const cookies = new Cookies(null, { path: "/" });

const api = axios.create({
    baseURL: "//localhost:3000/api",
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshTokens = false;

api.interceptors.request.use(
    (config) => {
        const token = cookies.get(
            isRefreshTokens ? "refresh_token" : "access_token"
        );

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originRequest = error.config;

        // Nếu request không phải là refresh_tokens
        if (!isRefreshTokens) {
            // Xác thực thất bại
            if (error.response.status === 401) {
                isRefreshTokens = true;
                const refreshToken = cookies.get("refresh_token");

                // Nếu có refreshToken
                if (refreshToken) {
                    try {
                        const response = await refreshTokensAPI();
                        const newAccessToken = response.data.data.access_token;
                        const newRefreshToken =
                            response.data.data.refresh_token;

                        cookies.set("access_token", newAccessToken, {
                            sameSite: true,
                            secure: true,
                        });

                        cookies.set("refresh_token", newRefreshToken, {
                            sameSite: true,
                            secure: true,
                        });

                        isRefreshTokens = false;
                        return api(originRequest);
                    } catch (error) {
                        isRefreshTokens = false;
                        return logoutRef.current();
                    }
                } else {
                    isRefreshTokens = false;
                    return logoutRef.current();
                }
            }
        } else if (error.response.status === 401) {
            isRefreshTokens = false;
            return logoutRef.current();
        }

        return Promise.reject(error);
    }
);

export default api;
