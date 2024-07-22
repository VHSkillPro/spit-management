import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { usePermission } from "../contexts/PermissionContext";

export default function SideBar() {
    const { permissions } = usePermission();

    return (
        <aside
            className="app-sidebar bg-body-secondary shadow"
            data-bs-theme="dark"
        >
            <div className="sidebar-brand">
                <a href="./index.html" className="brand-link">
                    <img
                        src={
                            process.env.PUBLIC_URL + "/assets/img/logo_spit.png"
                        }
                        alt="SPIT Logo"
                        className="brand-image opacity-75 shadow"
                    />

                    <span
                        className="brand-text fw-bold"
                        style={{ letterSpacing: "2px" }}
                    >
                        SPIT
                    </span>
                </a>
            </div>

            <div className="sidebar-wrapper" data-overlayscrollbars="host">
                <div className="os-size-observer os-size-observer-appear">
                    <div className="os-size-observer-listener ltr"></div>
                </div>
                <div
                    data-overlayscrollbars-viewport="scrollbarHidden"
                    style={{
                        marginRight: -16 + "px",
                        marginBottom: -16 + "px",
                        marginLeft: 0 + "px",
                        top: -8 + "px",
                        right: "auto",
                        left: -8 + "px",
                        width: "calc(100% + 16px)",
                        padding: 8 + "px",
                        overflowY: "scroll",
                    }}
                >
                    <nav className="mt-2">
                        <Nav className="sidebar-menu flex-column" as="ul">
                            <Nav.Item as="li">
                                <NavLink to="/" className="nav-link">
                                    <i className="nav-icon bi bi-house"></i>
                                    <p>Trang chủ</p>
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <NavLink to="/member" className="nav-link">
                                    <i className="nav-icon bi bi-people"></i>
                                    <p>Thành viên</p>
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <NavLink to="/board" className="nav-link">
                                    <i className="nav-icon bi bi-buildings"></i>
                                    <p>Ban</p>
                                </NavLink>
                            </Nav.Item>
                            {permissions["user.index"] && (
                                <Nav.Item as="li">
                                    <NavLink to="/user" className="nav-link">
                                        <i className="nav-icon bi bi-person"></i>
                                        <p>Tài khoản</p>
                                    </NavLink>
                                </Nav.Item>
                            )}
                        </Nav>
                    </nav>
                </div>
                <div className="os-scrollbar os-scrollbar-horizontal os-theme-light os-scrollbar-auto-hide os-scrollbar-auto-hide-hidden os-scrollbar-handle-interactive os-scrollbar-track-interactive os-scrollbar-cornerless os-scrollbar-unusable">
                    <div className="os-scrollbar-track">
                        <div
                            className="os-scrollbar-handle"
                            style={{ width: 100 + "%" }}
                        ></div>
                    </div>
                </div>
                <div className="os-scrollbar os-scrollbar-vertical os-theme-light os-scrollbar-auto-hide os-scrollbar-auto-hide-hidden os-scrollbar-handle-interactive os-scrollbar-track-interactive os-scrollbar-visible os-scrollbar-cornerless">
                    <div className="os-scrollbar-track">
                        <div
                            className="os-scrollbar-handle"
                            style={{ height: 21.225 + "%" }}
                        ></div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
