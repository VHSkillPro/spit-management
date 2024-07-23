import { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
    FormText,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername, updateUser } from "../../API/userService";
import { useMessage } from "../../contexts/MessageContext";
import { ToastStatus } from "../../components/Toast";
import { getAllRoles } from "../../API/roleService";
import { useForm } from "react-hook-form";

export default function FormUpdateUser() {
    const params = useParams();
    const navigate = useNavigate();
    const { handleAddMessage } = useMessage();

    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({});

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        Promise.all([getUserByUsername(params.username), getAllRoles()])
            .then((values) => {
                const user = values[0].data.data;
                const roles = values[1].data.data.roles;
                setUser(user);
                setRoles(roles);
            })
            .catch((error) => {
                handleAddMessage(
                    "Có lỗi xảy ra",
                    error.response.data
                        ? error.response.data.message
                        : "Lỗi hệ thống",
                    ToastStatus.DANGER
                );
                navigate("/user");
            });
    }, [params]);

    const handleUpdate = (data) => {
        if (window.confirm("Xác nhận cập nhật thông tin tài khoản?")) {
            const user = {};

            if (data.password) {
                user.password = data.password;
            }

            if (parseInt(data.roleId)) {
                user.roleId = parseInt(data.roleId);
            }

            updateUser(params.username, user)
                .then(() => {
                    handleAddMessage(
                        "Thành công",
                        "Cập nhật thông tin tài khoản thành công",
                        ToastStatus.SUCCESS
                    );
                    navigate("/user");
                })
                .catch(() => {
                    handleAddMessage(
                        "Thất bại",
                        "Cập nhật thông tin tài khoản thất bại",
                        ToastStatus.DANGER
                    );
                });
        }
    };

    return (
        <Card>
            <CardHeader className="d-flex align-items-center">
                <CardTitle className="fw-bold fs-5">
                    Thông tin tài khoản
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(handleUpdate)}>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">Tên tài khoản</FormLabel>
                        <FormControl
                            value={params.username}
                            disabled
                        ></FormControl>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">Mật khẩu mới</FormLabel>
                        <FormControl
                            placeholder="Nhập mật khẩu mới"
                            {...register("password")}
                        ></FormControl>
                        <ul>
                            <li>
                                <FormText>
                                    Để trống trường này nếu không đổi mật khẩu
                                </FormText>
                            </li>
                        </ul>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">
                            Chức vụ trong hệ thống
                        </FormLabel>
                        <FormSelect value={user.roleId} {...register("roleId")}>
                            {roles.map((role, idx) => (
                                <option key={idx} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </FormSelect>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-center">
                        <Button type="submit">
                            <i className="bi bi-pencil-square me-2"></i>
                            Cập nhật
                        </Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
}
