import api from "./api";

export const getAllRoles = () => {
    return api.get("v1/roles");
};

export const getPermissionsOfRole = (roleId) => {
    return api.get(`v1/roles/${roleId}`);
};

export const createRole = (role) => {
    return api.post("v1/roles", role);
};

export const destroyRole = (roleId) => {
    return api.delete(`v1/roles/${roleId}`);
};
