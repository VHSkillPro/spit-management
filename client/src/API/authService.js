import api from "./api";

export const refreshTokens = async () => {
    try {
        const response = await api.post("v1/auth/refresh_tokens");
        return response.data;
    } catch (error) {
        return null;
    }
};
