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
import { useMessage } from "../../contexts/MessageContext";
import { ToastStatus } from "../../components/Toast";
import { getRoleById } from "../../API/roleService";
import { useForm } from "react-hook-form";
import { getAllPermissions } from "../../API/permissionService";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

export default function FormUpdateRole() {
    const params = useParams();
    const navigate = useNavigate();
    const { handleAddMessage } = useMessage();

    const [role, setRole] = useState({});
    const [permissions, setPermissions] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (parseInt(params.roleId) === 1) {
            handleAddMessage(
                "Có lỗi xảy ra",
                "Không thể chỉnh sửa chức vụ này",
                ToastStatus.DANGER
            );
            navigate("/role");
        }

        Promise.all([getRoleById(params.roleId), getAllPermissions()])
            .then((values) => {
                const role = values[0].data.data.role;
                const permissions = values[1].data.data.permissions;
                console.log(values[1]);
                setRole(role);
                setPermissions(permissions);
            })
            .catch((error) => {
                handleAddMessage(
                    "Có lỗi xảy ra",
                    error.response.data
                        ? error.response.data.message
                        : "Lỗi hệ thống",
                    ToastStatus.DANGER
                );
                navigate("/role");
            });
    }, [params]);

    // const handleUpdate = (data) => {
    //     if (window.confirm("Xác nhận cập nhật thông tin tài khoản?")) {
    //         const user = {};
    //         if (data.password) {
    //             user.password = data.password;
    //         }
    //         if (parseInt(data.roleId)) {
    //             user.roleId = parseInt(data.roleId);
    //         }
    //         updateUser(params.username, user)
    //             .then(() => {
    //                 handleAddMessage(
    //                     "Thành công",
    //                     "Cập nhật thông tin tài khoản thành công",
    //                     ToastStatus.SUCCESS
    //                 );
    //                 navigate("/user");
    //             })
    //             .catch(() => {
    //                 handleAddMessage(
    //                     "Thất bại",
    //                     "Cập nhật thông tin tài khoản thất bại",
    //                     ToastStatus.DANGER
    //                 );
    //             });
    //     }
    // };
    return (
        <Card>
            <CardHeader className="d-flex align-items-center">
                <CardTitle className="fw-bold fs-5">
                    Thông tin chức vụ
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">Tên chức vụ</FormLabel>
                        <FormControl value={role.name}></FormControl>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">
                            Dach sách quyền của chức vụ
                        </FormLabel>
                        <DualListBox
                            options={permissions.map((permission) => {
                                return {
                                    value: permission.id,
                                    label: permission.name,
                                };
                            })}
                            selected={selected}
                            onChange={(newValue) => setSelected(newValue)}
                        ></DualListBox>
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
