import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getAllRoles } from "../../API/roleService";
import TableRole from "./TableRole";

export default function DisplayRole() {
    // State `roles` lưu danh sách roles
    const [roles, setRoles] = useState([]);

    // Cập nhật dữ liệu mỗi 5s một lần
    useEffect(() => {
        handleGetRoles();
        const interval = setInterval(() => {
            handleGetRoles();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Xử lý việc lấy danh sách users từ API
    const handleGetRoles = () => {
        getAllRoles()
            .then((response) => {
                const rolesFromAPI = response.data.data.roles;

                // Thêm index cho user
                const newRoles = rolesFromAPI.map((role, idx) => {
                    role.idx = idx + 1;
                    return role;
                });

                setRoles(newRoles);
            })
            .catch(() => {});
    };

    return (
        <Card>
            <CardHeader className="d-flex align-items-center">
                <CardTitle className="fw-bold fs-5">
                    Danh sách chức vụ
                </CardTitle>
                <div className="ms-auto">
                    <NavLink
                        to={`/role/add`}
                        className="btn btn-primary btn-sm"
                        title="Thêm chức vụ"
                    >
                        <i className="bi bi-plus-lg"></i>
                    </NavLink>
                </div>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <TableRole roles={roles} onChange={handleGetRoles} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dataTables_info">
                            {`Hiển thị ${roles.length} chức vụ`}
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
