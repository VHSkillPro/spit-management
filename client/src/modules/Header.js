import { Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { logoutAPI } from "../API/authService";

export default function Header({ toggleSideBar }) {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logoutAPI()
            .then(() => {
                logout();
            })
            .catch((error) => {
                alert(error);
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

                <ul className="navbar-nav ms-auto">
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
                                {user.current.username}
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
                                    {user.current.username}
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
                                    Logout
                                </Button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}
