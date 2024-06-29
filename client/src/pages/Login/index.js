import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import ToastContainer from "react-bootstrap/ToastContainer";
import MyToast, { ToastStatus } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const cookies = new Cookies();

export default function LoginPage() {
    const navigate = useNavigate();
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

                cookies.set("access_token", data.accessToken.token, {
                    expires: new Date(
                        Date.now() + data.accessToken.expired * 1000
                    ),
                    sameSite: true,
                    secure: true,
                });

                cookies.set("refresh_token", data.refreshToken.token, {
                    expires: new Date(
                        Date.now() + data.refreshToken.expired * 1000
                    ),
                    sameSite: true,
                    secure: true,
                });

                login(data.username);
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
                <div className="login-box" style={{ width: 25 + "rem" }}>
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
                    <div className="card w-100 rounded-3">
                        <div className="card-body login-card-body rounded-3">
                            <div className="mb-3">
                                <div className="input-group">
                                    <input
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên đăng nhập"
                                        onChange={(e) =>
                                            setUsername(e.target.value || null)
                                        }
                                    />
                                    <div className="input-group-text">
                                        <span className="bi bi-person" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="input-group">
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Mật khẩu"
                                        onChange={(e) =>
                                            setPassword(e.target.value || null)
                                        }
                                    />
                                    <div className="input-group-text">
                                        <span className="bi bi-lock-fill" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="d-grid gap-2">
                                        <button
                                            onClick={handleLogin}
                                            className="btn btn-primary"
                                        >
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Đăng nhập
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-6">
                                    <p>
                                        <a
                                            href="forgot-password.html"
                                            className="text-decoration-none"
                                        >
                                            Quên mật khẩu
                                        </a>
                                    </p>
                                </div>

                                <div className="col-6 d-flex justify-content-end">
                                    <p>
                                        <a
                                            href="register.html"
                                            className="text-center text-decoration-none"
                                        >
                                            Đăng ký tài khoản
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
