import { Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ toggleSideBar }) {
    const { logout } = useAuth();

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
                                Alexander Pierce
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
                                    Alexander Pierce - Web Developer
                                    <small>Member since Nov. 2023</small>
                                </p>
                            </li>

                            <li className="user-body">
                                <div className="row">
                                    <div className="col-4 text-center">
                                        <a href="#">Followers</a>
                                    </div>
                                    <div className="col-4 text-center">
                                        <a href="#">Sales</a>
                                    </div>
                                    <div className="col-4 text-center">
                                        <a href="#">Friends</a>
                                    </div>
                                </div>
                            </li>

                            <li className="user-footer">
                                <a
                                    href="#"
                                    className="btn btn-default btn-flat"
                                >
                                    Profile
                                </a>
                                <Button className="float-end" onClick={logout}>
                                    Sign out
                                </Button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}
