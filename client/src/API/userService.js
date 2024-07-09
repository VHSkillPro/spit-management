import api from "./api";

export const getAllUsers = () => {
    return api.get("v1/users");
};

export const destroyUser = (username) => {
    return api.delete(`v1/users/${username}`);
};
