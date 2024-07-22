import { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
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

export default function FormUpdateUser() {
    const navigate = useNavigate();
    const params = useParams();
    const [roles, setRoles] = useState();
    const { handleAddMessage } = useMessage();

    const [newPassword, setNewPassword] = useState("");
    const [newRoleId, setNewRoleId] = useState();

    useEffect(() => {
        Promise.all([getUserByUsername(params.username), getAllRoles()])
            .then((values) => {
                const user = values[0].data.data;
                const roles = values[1].data.data.roles;
                setRoles(roles);
                setNewRoleId(user.roleId);
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

    const handleUpdate = () => {
        if (window.confirm("Xác nhận cập nhật thông tin tài khoản?")) {
            const data = {};

            if (newPassword) {
                data.password = newPassword;
            }

            if (newRoleId) {
                data.roleId = newRoleId;
            }

            updateUser(params.username, data)
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
                <FormGroup className="mb-3">
                    <FormLabel className="fs-6">Tên tài khoản</FormLabel>
                    <FormControl value={params.username} disabled></FormControl>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel className="fs-6">Mật khẩu mới</FormLabel>
                    <FormControl
                        value={newPassword}
                        placeholder="Nhập mật khẩu mới"
                        onChange={(e) => setNewPassword(e.target.value)}
                    ></FormControl>
                    <FormText>
                        * Để trống trường này nếu không đổi mật khẩu
                    </FormText>
                </FormGroup>
                {roles && (
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">
                            Chức vụ trong hệ thống
                        </FormLabel>
                        <FormSelect
                            name="role"
                            value={newRoleId}
                            onChange={(e) => setNewRoleId(e.target.value)}
                        >
                            {roles.map((role, idx) => (
                                <option key={idx} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </FormSelect>
                    </FormGroup>
                )}
                <FormGroup className="d-flex justify-content-center">
                    <Button size="sm" onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                </FormGroup>
            </CardBody>
        </Card>
    );
}
