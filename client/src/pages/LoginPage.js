import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import {
    Button,
    Card,
    CardBody,
    Form,
    FormControl,
    FormGroup,
    FormText,
    InputGroup,
} from "react-bootstrap";
import { ToastStatus } from "../components/Toast";
import { useAuth } from "../contexts/AuthContext";
import { loginAPI } from "../API/authService";
import { useMessage } from "../contexts/MessageContext";

const cookies = new Cookies(null, { path: "/" });

export default function LoginPage() {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { handleAddMessage } = useMessage();

    // Handle login
    const handleLogin = (data) => {
        const { username, password } = data;

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
            .catch(function () {
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
                            <Form onSubmit={handleSubmit(handleLogin)}>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <FormControl
                                            {...register("username", {
                                                required: true,
                                            })}
                                            type="text"
                                            placeholder="Tên đăng nhập"
                                        ></FormControl>
                                        <InputGroupText>
                                            <span className="bi bi-person" />
                                        </InputGroupText>
                                    </InputGroup>
                                    {errors.username?.type === "required" && (
                                        <FormText className="text-danger">
                                            Tên tài khoản không được để trống
                                        </FormText>
                                    )}
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <FormControl
                                            {...register("password", {
                                                required: true,
                                            })}
                                            type="password"
                                            placeholder="Mật khẩu"
                                        ></FormControl>
                                        <InputGroupText>
                                            <span className="bi bi-lock-fill" />
                                        </InputGroupText>
                                    </InputGroup>
                                    {errors.password?.type === "required" && (
                                        <FormText className="text-danger">
                                            Mật khẩu không được để trống
                                        </FormText>
                                    )}
                                </FormGroup>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Đăng nhập
                                    </Button>
                                </div>
                                <div className="mt-3">
                                    <a
                                        href="#"
                                        className="text-decoration-none"
                                    >
                                        Quên mật khẩu
                                    </a>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}
