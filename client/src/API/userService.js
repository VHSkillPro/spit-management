import api from "./api";

export const getAllUsers = (params) => {
    let uri = "v1/users";
    if (params && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams(params);
        uri += "?" + searchParams.toString();
    }
    return api.get(uri);
};

export const destroyUser = (username) => {
    return api.delete(`v1/users/${username}`);
};
