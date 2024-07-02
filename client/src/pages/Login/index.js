import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import ToastContainer from "react-bootstrap/ToastContainer";
import MyToast, { ToastStatus } from "../../components/Toast";
import { useAuth } from "../../contexts/AuthContext";
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

const cookies = new Cookies();

export default function LoginPage() {
    const { login } = useAuth();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleLogin = () => {
        axios
            .post("//localhost:3000/api/v1/auth/login", {
                username,
                password,
            })
            .then((response) => {
                const data = response.data.data;
                login(username, data.access_token, data.refresh_token);
            })
            .catch(function (error) {
                const message = {
                    title: `Đăng nhập thất bại`,
                    message: error.response.data.message,
                    status: ToastStatus.DANGER,
                };

                const newMessages = [message, ...messages];
                setMessages(newMessages);
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

                <ToastContainer position="top-end" className="m-3">
                    {messages.map((data, index) => (
                        <MyToast
                            key={messages.length - index - 1}
                            title={data.title}
                            autoHide={true}
                            message={data.message}
                            status={data.status}
                        ></MyToast>
                    ))}
                </ToastContainer>
            </div>
        </>
    );
}
