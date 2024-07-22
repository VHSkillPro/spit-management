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

export default function FormSearchUser({ onFind }) {
    const [roles, setRoles] = useState([]);

    // Dữ liệu của form tìm kiếm
    const [username, setUsername] = useState("");
    const [roleId, setRoleId] = useState(0);

    const handleSubmitForm = () => {
        const params = {};
        if (username.length > 0) params.username = username;
        if (roleId > 0) params.roleId = roleId;
        onFind(params);
    };

    useEffect(() => {
        getAllRoles()
            .then((response) => {
                const rolesFromAPI = response.data.data.roles;
                setRoles(rolesFromAPI);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FormLabel className="fs-6">
                        Chức vụ trong hệ thống
                    </FormLabel>
                    <Form.Select
                        name="role"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                    >
                        <option key={0} value={0}>
                            Chọn chức vụ cần tìm kiếm
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
