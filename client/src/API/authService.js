import api from "./api";

export const meAPI = () => {
    return api.get("v1/auth/me");
};

export const refreshTokensAPI = () => {
    return api.post("v1/auth/refresh_tokens");
};

export const loginAPI = (username, password) => {
    return api.post("v1/auth/login", {
        username,
        password,
    });
};

export const logoutAPI = () => {
    return api.post("v1/auth/logout");
};
