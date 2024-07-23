import api from "./api";

export const getAllUsers = (params) => {
    let uri = "v1/users";
    if (params && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams(params);
        uri += "?" + searchParams.toString();
    }
    return api.get(uri);
};

export const getUserByUsername = (username) => {
    return api.get(`v1/users/${username}`);
};

export const createUser = (data) => {
    return api.post("v1/users", data);
};

export const updateUser = (username, data) => {
    return api.patch(`v1/users/${username}`, data);
};

export const destroyUser = (username) => {
    return api.delete(`v1/users/${username}`);
};
