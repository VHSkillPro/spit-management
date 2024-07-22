import { usePermission } from "../contexts/PermissionContext";
import Forbidden from "../pages/Forbidden";

const PermissionGuard = ({ children, route }) => {
    const { permissions } = usePermission();

    if (!permissions[route]) {
        return <Forbidden />;
    }

    return children;
};

export default PermissionGuard;
