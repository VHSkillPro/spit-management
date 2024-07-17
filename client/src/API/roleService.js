import api from "./api";

export const getAllRoles = () => {
    return api.get("v1/roles");
};
