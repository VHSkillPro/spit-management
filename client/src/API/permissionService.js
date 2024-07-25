import api from "./api";

export const getAllPermissions = () => {
    return api.get("v1/permissions");
};
