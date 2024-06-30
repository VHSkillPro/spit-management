import axios from "axios";
import Cookies from "universal-cookie";
import { refreshTokens } from "./authService";

const cookies = new Cookies();

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

        if (error.response.status === 401 && !isRefreshTokens) {
            isRefreshTokens = true;
            const refreshToken = cookies.get("refresh_token");

            if (refreshToken) {
                const response = await refreshTokens();

                console.log(response);
                if (response) {
                    cookies.set("access_token", response.data.access_token, {
                        sameSite: true,
                        secure: true,
                    });

                    cookies.set("refresh_token", response.data.refresh_token, {
                        sameSite: true,
                        secure: true,
                    });

                    isRefreshTokens = false;

                    originRequest.headers[
                        "Authorization"
                    ] = `Bearer ${response.data.access_token}`;

                    return api(originRequest);
                }
            }

            isRefreshTokens = false;
        }

        return Promise.reject(error);
    }
);

export default api;
