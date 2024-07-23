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
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../contexts/MessageContext";
import { ToastStatus } from "../../components/Toast";
import { getAllRoles } from "../../API/roleService";
import { createUser } from "../../API/userService";
import { useForm } from "react-hook-form";

export default function FormAddUser() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState();
    const { handleAddMessage } = useMessage();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getAllRoles()
            .then((response) => {
                const roles = response.data.data.roles;
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
    }, []);

    // Hàm xử lý khi nhấn nút thêm
    const handleAddUser = (data) => {
        // Kiểm tra xem mật khẩu và nhập lại mật khẩu có khớp nhau không
        if (data.password !== data.repassword) {
            handleAddMessage(
                "Thất bại",
                "Mật khẩu không khớp",
                ToastStatus.DANGER
            );
            return;
        }

        // Tạo object user
        const user = {};

        // Gắn dữ liệu của các trường có kiểu string
        const stringField = ["username", "password", "repassword"];
        for (let field of stringField) {
            if (data[field]) {
                user[field] = data[field];
            }
        }

        // Nếu roleId khác 0 thì gán vào user
        if (parseInt(data.roleId)) {
            user.roleId = parseInt(data.roleId);
        }

        // Gọi API thêm tài khoản
        createUser(user)
            .then(() => {
                handleAddMessage(
                    "Thành công",
                    "Đã thêm tài khoản thành công",
                    ToastStatus.SUCCESS
                );
                navigate("/user");
            })
            .catch((error) => {
                let message = "Thông tin không hợp lệ, vui lòng kiểm tra lại";
                if (error.response.status === 409) {
                    message = "Tên tài khoản đã tồn tại";
                }
                handleAddMessage("Thất bại", message, ToastStatus.DANGER);
            });
    };

    return (
        <Card>
            <CardHeader className="d-flex align-items-center">
                <CardTitle className="fw-bold fs-5">Thêm tài khoản</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(handleAddUser)}>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">Tên tài khoản</FormLabel>
                        <FormControl
                            placeholder="Nhập tên tài khoản"
                            {...register("username", {
                                required: true,
                                minLength: 5,
                                maxLength: 255,
                            })}
                        ></FormControl>
                        <ul>
                            {errors.username?.type === "required" && (
                                <li>
                                    <FormText className="text-danger">
                                        Tên tài khoản không được để trống
                                    </FormText>
                                </li>
                            )}
                            <li>
                                <FormText
                                    className={
                                        errors.username?.type === "minLength" ||
                                        errors.username?.type === "maxLength"
                                            ? "text-danger"
                                            : ""
                                    }
                                >
                                    Tên tài khoản phải có độ dài từ 5 đến 255 ký
                                    tự.
                                </FormText>
                            </li>
                        </ul>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">Mật khẩu</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="Nhập mật khẩu"
                            {...register("password", {
                                required: true,
                                minLength: 5,
                                maxLength: 255,
                                pattern: /^[a-zA-Z0-9@.#$!%*?&^]+$/,
                            })}
                        ></FormControl>
                        <ul>
                            {errors.password?.type === "required" && (
                                <li>
                                    <FormText className="text-danger">
                                        Mật khẩu không được để trống
                                    </FormText>
                                </li>
                            )}
                            <li>
                                <FormText
                                    className={
                                        errors.password?.type === "minLength" ||
                                        errors.password?.type === "maxLength"
                                            ? "text-danger"
                                            : ""
                                    }
                                >
                                    Mật khẩu phải có độ dài từ 6 đến 255 ký tự.
                                </FormText>
                            </li>
                            <li>
                                <FormText
                                    className={
                                        errors.password?.type === "pattern"
                                            ? "text-danger"
                                            : ""
                                    }
                                >
                                    Mật khẩu chỉ chứa các ký tự in thường (a-z),
                                    in hoa (A-Z), ký tự số (0-9) và ký tự đặc
                                    biệt (@.#$!%*?&^).
                                </FormText>
                            </li>
                        </ul>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">
                            Nhập lại mật khẩu
                        </FormLabel>
                        <FormControl
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            {...register("repassword", {
                                required: true,
                            })}
                        ></FormControl>
                        {errors.repassword?.type === "required" && (
                            <ul>
                                <li>
                                    <FormText className="text-danger">
                                        Mật khẩu không được để trống
                                    </FormText>
                                </li>
                            </ul>
                        )}
                    </FormGroup>
                    {roles && (
                        <FormGroup className="mb-3">
                            <FormLabel className="fs-6">
                                Chức vụ trong hệ thống
                            </FormLabel>
                            <FormSelect
                                {...register("roleId", {
                                    validate: (value) => value > 0,
                                })}
                            >
                                <option value={0}>Chọn chức vụ</option>
                                {roles.map((role, idx) => (
                                    <option key={idx} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </FormSelect>
                            {errors.roleId?.type === "validate" && (
                                <ul>
                                    <li>
                                        <FormText className="text-danger">
                                            Vui lòng chọn chức vụ
                                        </FormText>
                                    </li>
                                </ul>
                            )}
                        </FormGroup>
                    )}
                    <FormGroup className="d-flex justify-content-center">
                        <Button type="submit">
                            <i className="bi bi-plus-circle me-2"></i>
                            Thêm
                        </Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
}
