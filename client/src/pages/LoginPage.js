import { useState } from "react";
import { ToastStatus } from "../components/Toast";
import { useAuth } from "../contexts/AuthContext";
import {
    Button,
    Card,
    CardBody,
    Col,
    FormControl,
    InputGroup,
    Row,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { loginAPI } from "../API/authService";
import { useMessage } from "../contexts/MessageContext";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function LoginPage() {
    const { login } = useAuth();
    const { handleAddMessage } = useMessage();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    // Handle enter key
    const handleKeyDown = (event) => {
        if (event.key === "Enter") handleLogin();
    };

    // Handle login
    const handleLogin = () => {
        loginAPI(username, password)
            .then((response) => {
                // Set cookies
                const data = response.data.data;

                cookies.set("access_token", data.access_token, {
                    sameSite: true,
                    secure: true,
                });

                cookies.set("refresh_token", data.refresh_token, {
                    sameSite: true,
                    secure: true,
                });

                // Đăng nhập
                login();

                // Show toast
                handleAddMessage(
                    `Đăng nhập thành công`,
                    response.data.message,
                    ToastStatus.SUCCESS
                );
            })
            .catch(function (error) {
                handleAddMessage(
                    `Đăng nhập thất bại`,
                    "Tài khoản hoặc mật khẩu không chính xác",
                    ToastStatus.DANGER
                );
            });
    };

    return (
        <>
            <div className="login-page bg-body-secondary">
                <div className="login-box" style={{ width: "25rem" }}>
                    {/* Logo */}
                    <div className="login-logo mb-5">
                        <a href="#">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/assets/img/logo_spit.png"
                                }
                                className="img-fluid"
                                alt="logo_spit"
                                width="150px"
                            />
                        </a>
                    </div>

                    {/* Login Card */}
                    <Card className="w-100 rounded-3">
                        <CardBody className="login-card-body rounded-3">
                            <div className="mb-3">
                                <InputGroup>
                                    <FormControl
                                        name="username"
                                        type="text"
                                        placeholder="Tên đăng nhập"
                                        onChange={(e) => {
                                            setUsername(e.target.value || null);
                                        }}
                                    ></FormControl>
                                    <InputGroupText>
                                        <span className="bi bi-person" />
                                    </InputGroupText>
                                </InputGroup>
                            </div>
                            <div className="mb-3">
                                <InputGroup>
                                    <FormControl
                                        name="password"
                                        type="password"
                                        placeholder="Mật khẩu"
                                        onChange={(e) => {
                                            setPassword(e.target.value || null);
                                        }}
                                        onKeyDown={handleKeyDown}
                                    ></FormControl>
                                    <InputGroupText>
                                        <span className="bi bi-lock-fill" />
                                    </InputGroupText>
                                </InputGroup>
                            </div>
                            <Row>
                                <Col xs={12}>
                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            onClick={handleLogin}
                                        >
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Đăng nhập
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={6}>
                                    <p>
                                        <a
                                            href="#"
                                            className="text-decoration-none"
                                        >
                                            Quên mật khẩu
                                        </a>
                                    </p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
