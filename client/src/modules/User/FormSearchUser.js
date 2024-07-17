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

export default function FormSearchUser() {
    const [roles, setRoles] = useState([]);

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

    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                handleGetRoles();
            }, 5000);
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
                    ></FormControl>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FormLabel className="fs-6">Role</FormLabel>
                    <Form.Select name="role">
                        <option key={0}>Chọn role cần tìm kiếm</option>
                        {roles.map((role, idx) => (
                            <option key={idx} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="d-flex justify-content-center">
                    <Button size="sm">Tìm kiếm</Button>
                </Form.Group>
            </CardBody>
        </Card>
    );
}
