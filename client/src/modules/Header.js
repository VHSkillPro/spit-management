import { Button, Container, FormSelect } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { logoutAPI } from "../API/authService";
import { useMessage } from "../contexts/MessageContext";
import { ToastStatus } from "../components/Toast";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export default function Header({ toggleSideBar }) {
    const { user, logout } = useAuth();
    const { handleAddMessage } = useMessage();

    // Hàm xử lý sự kiện đăng xuất
    const handleLogout = () => {
        logoutAPI()
            .then((response) => {
                // Xóa cookies
                cookies.remove("access_token");
                cookies.remove("refresh_token");

                // Đăng xuất
                logout();

                // Hiển thị thông báo
                handleAddMessage(
                    `Đăng xuất thành công`,
                    response.data.message,
                    ToastStatus.SUCCESS
                );
            })
            .catch((error) => {
                // Hiển thị thông báo
                handleAddMessage(
                    `Đăng xuất thất bại`,
                    error.response
                        ? error.response.data.message
                        : "Không thể kết nổi với máy chủ",
                    ToastStatus.DANGER
                );
            });
    };

    return (
        <nav className="app-header navbar navbar-expand bg-body">
            <Container fluid>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            role="button"
                            onClick={toggleSideBar}
                        >
                            <i className="bi bi-list"></i>
                        </a>
                    </li>
                </ul>

                <div className="d-flex align-items-center">
                    <ul className="navbar-nav">
                        <FormSelect>
                            <option>Chọn học kỳ tác nghiệp</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </FormSelect>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown user-menu">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    src="../assets/img/user2-160x160.jpg"
                                    className="user-image rounded-circle shadow"
                                    alt="User Image"
                                />
                                <span className="d-none d-md-inline">
                                    {user.username}
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                                <li className="user-header text-bg-primary">
                                    <img
                                        src="../assets/img/user2-160x160.jpg"
                                        className="rounded-circle shadow"
                                        alt="User Image"
                                    />
                                    <p>
                                        {user.username}
                                        <small>Member since Nov. 2023</small>
                                    </p>
                                </li>

                                <li className="user-footer">
                                    <a
                                        href="#"
                                        className="btn btn-default btn-flat"
                                    >
                                        Profile
                                    </a>
                                    <Button
                                        className="float-end"
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </Button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    );
}
