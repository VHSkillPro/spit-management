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
import { useForm } from "react-hook-form";

export default function FormSearchUser({ onFind }) {
    const [roles, setRoles] = useState([]);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        getAllRoles()
            .then((response) => {
                const rolesFromAPI = response.data.data.roles;
                setRoles(rolesFromAPI);
            })
            .catch(() => {});
    }, []);

    /// Xử lý submit form
    const onSubmit = (data) => {
        console.log(data);
        const params = {};

        if (data.username) {
            params.username = data.username;
        }

        if (data.roleId !== "0") {
            params.roleId = parseInt(data.roleId);
        }

        onFind(params);
    };

    return (
        <Card className="rounded-0 shadow-none">
            <CardHeader className="py-2">
                <CardTitle className="fw-bold">Tìm kiếm tài khoản</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <FormLabel className="fs-6">Tên tài khoản</FormLabel>
                        <FormControl
                            {...register("username")}
                            type="text"
                            placeholder="Nhập tên tài khoản tìm kiếm"
                        ></FormControl>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FormLabel className="fs-6">
                            Chức vụ trong hệ thống
                        </FormLabel>
                        <Form.Select {...register("roleId")}>
                            <option key={0} value={0}>
                                Chọn chức vụ cần tìm kiếm
                            </option>
                            {roles.map((role, idx) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-center">
                        <Button size="sm" type="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Group>
                </Form>
            </CardBody>
        </Card>
    );
}
