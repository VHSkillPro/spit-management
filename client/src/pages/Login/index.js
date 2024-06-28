import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleLogin = async () => {
        axios
            .post("//localhost:3000/api/v1/auth/login", {
                username,
                password,
            })
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.refreshToken);
                }
            })
            .catch(function (error) {
                alert(error);
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
                                            setUsername(e.target.value)
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
                                            setPassword(e.target.value)
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
            </div>
        </>
    );
}
