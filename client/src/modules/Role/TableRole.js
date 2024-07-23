import { Table } from "react-bootstrap";
import TableRoleItem from "./TableRoleItem";

export default function TableRole({ roles, onChange }) {
    // Tạo ra giao diện của danh sách users
    const renderRoles = () => {
        return roles.map((role) => {
            return (
                <TableRoleItem
                    key={role.id}
                    role={role}
                    onChange={onChange}
                ></TableRoleItem>
            );
        });
    };

    return (
        <Table bordered hover striped>
            <thead>
                <tr>
                    <th className="text-truncate">STT</th>
                    <th className="text-truncate">Tên chức vụ</th>
                    <th className="text-truncate">Hành động</th>
                </tr>
            </thead>
            <tbody>{renderRoles()}</tbody>
            <tfoot>
                <tr>
                    <th className="text-truncate">STT</th>
                    <th className="text-truncate">Tên chức vụ</th>
                    <th className="text-truncate">Hành động</th>
                </tr>
            </tfoot>
        </Table>
    );
}
