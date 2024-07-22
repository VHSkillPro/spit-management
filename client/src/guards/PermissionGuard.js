import { usePermission } from "../contexts/PermissionContext";
import Forbidden from "../pages/Forbidden";

export const PERMISSIONS = {
    user: "user.index",
};

const PermissionGuard = ({ children, route }) => {
    const { permissions } = usePermission();

    if (!permissions[route]) {
        return <Forbidden />;
    }

    return children;
};

export default PermissionGuard;
