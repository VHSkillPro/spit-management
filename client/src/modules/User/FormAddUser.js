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
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../contexts/MessageContext";
import { ToastStatus } from "../../components/Toast";
import { getAllRoles } from "../../API/roleService";
import { createUser } from "../../API/userService";

export default function FormAddUser() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState();
    const { handleAddMessage } = useMessage();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [roleId, setRoleId] = useState(0);

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
    const handleAddUser = () => {
        // Kiểm tra xem mật khẩu và nhập lại mật khẩu có khớp nhau không
        if (password !== repassword) {
            handleAddMessage(
                "Thất bại",
                "Mật khẩu không khớp",
                ToastStatus.DANGER
            );
            return;
        }

        // Tạo object user
        const user = {};

        // Nếu username không rỗng thì gán vào user
        if (username) {
            user.username = username;
        }

        // Nếu password không rỗng thì gán vào user
        if (password) {
            user.password = password;
        }

        // Nếu repassword không rỗng thì gán vào user
        if (repassword) {
            user.repassword = repassword;
        }

        // Nếu roleId khác 0 thì gán vào user
        if (roleId) {
            user.roleId = parseInt(roleId);
        }

        console.log(user);

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
                <FormGroup className="mb-3">
                    <FormLabel className="fs-6">Tên tài khoản</FormLabel>
                    <FormControl
                        value={username}
                        placeholder="Nhập tên tài khoản"
                        onChange={(e) => setUsername(e.target.value)}
                    ></FormControl>
                    <ul>
                        <li>
                            <FormText>
                                Tên tài khoản phải có độ dài từ 5 đến 255 ký tự.
                            </FormText>
                        </li>
                    </ul>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel className="fs-6">Mật khẩu</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                    <ul>
                        <li>
                            <FormText>
                                Mật khẩu chỉ chứa các ký tự in thường (a-z), in
                                hoa (A-Z), ký tự số (0-9) và ký tự đặc biệt
                                (@.#$!%*?&^).
                            </FormText>
                        </li>
                        <li>
                            <FormText>
                                Mật khẩu phải có độ dài từ 6 đến 255 ký tự.
                            </FormText>
                        </li>
                    </ul>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel className="fs-6">Nhập lại mật khẩu</FormLabel>
                    <FormControl
                        type="password"
                        value={repassword}
                        placeholder="Nhập lại mật khẩu"
                        onChange={(e) => setRepassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                {roles && (
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">
                            Chức vụ trong hệ thống
                        </FormLabel>
                        <FormSelect
                            name="role"
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                        >
                            <option value={0}>Chọn chức vụ</option>
                            {roles.map((role, idx) => (
                                <option key={idx} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </FormSelect>
                    </FormGroup>
                )}
                <FormGroup className="d-flex justify-content-center">
                    <Button onClick={handleAddUser}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Thêm
                    </Button>
                </FormGroup>
            </CardBody>
        </Card>
    );
}
