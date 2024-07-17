import { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormLabel,
} from "react-bootstrap";
import { getAllRoles } from "../../API/roleService";

export default function FormSearchUser({ handleFind }) {
    const [roles, setRoles] = useState([]);

    // Dữ liệu của form tìm kiếm
    const [paramUsername, setParamUsername] = useState("");
    const [paramRole, setParamRole] = useState(0);

    // State `isLoading` thể hiễn đã lấy được danh sách roles chưa
    const [isLoading, setIsLoading] = useState(true);

    const handleGetRoles = () => {
        getAllRoles()
            .then((response) => {
                const rolesFromAPI = response.data.data.roles;
                setRoles(rolesFromAPI);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmitForm = () => {
        const params = {};
        if (paramUsername.length > 0) params.username = paramUsername;
        if (paramRole > 0) params.roleId = paramRole;
        handleFind(params);
    };

    // Cập nhật dữ liệu mỗi 10s một lần
    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                handleGetRoles();
            }, 10000);
            return () => clearTimeout(timeout);
        } else {
            handleGetRoles();
        }
    });

    return (
        <Card className="rounded-0 shadow-none">
            <CardHeader className="py-2">
                <CardTitle className="fw-bold">Tìm kiếm tài khoản</CardTitle>
            </CardHeader>
            <CardBody>
                <Form.Group className="mb-3">
                    <FormLabel className="fs-6">Tên tài khoản</FormLabel>
                    <FormControl
                        name="username"
                        type="text"
                        placeholder="Nhập tên tài khoản tìm kiếm"
                        value={paramUsername}
                        onChange={(e) => setParamUsername(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FormLabel className="fs-6">Role</FormLabel>
                    <Form.Select
                        name="role"
                        value={paramRole}
                        onChange={(e) => setParamRole(e.target.value)}
                    >
                        <option key={0} value={0}>
                            Chọn role cần tìm kiếm
                        </option>
                        {roles.map((role, idx) => (
                            <option key={idx} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="d-flex justify-content-center">
                    <Button size="sm" onClick={handleSubmitForm}>
                        Tìm kiếm
                    </Button>
                </Form.Group>
            </CardBody>
        </Card>
    );
}
