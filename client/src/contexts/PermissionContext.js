import { createContext, useContext, useEffect, useState } from "react";
import { getPermissionsOfRole } from "../API/roleService";
import { useAuth } from "./AuthContext";

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
    const { user } = useAuth();
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        if (user.roleId) {
            getPermissionsOfRole(user.roleId)
                .then((response) => {
                    const permissionsOfRole = response.data.data.permissions;
                    const permissions = permissionsOfRole.reduce((acc, cur) => {
                        acc[cur.route] = true;
                        return acc;
                    }, {});
                    setPermissions(permissions);
                })
                .catch(() => {});
        }
    }, [user]);

    return (
        <PermissionContext.Provider value={{ permissions }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => {
    return useContext(PermissionContext);
};
