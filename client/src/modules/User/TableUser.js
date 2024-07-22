import TableUserItem from "./TableUserItem";
import { Table } from "react-bootstrap";

export default function TableUser({ users, onChange }) {
    // Tạo ra giao diện của danh sách users
    const renderUsers = () => {
        return users.map((user) => {
            return (
                <TableUserItem
                    key={user.id}
                    id={user.idx}
                    username={user.username}
                    password={user.password}
                    role={user.role.name}
                    onChange={onChange}
                ></TableUserItem>
            );
        });
    };

    return (
        <Table bordered hover striped>
            <thead>
                <tr>
                    <th className="text-truncate">STT</th>
                    <th className="text-truncate">Tên tài khoản</th>
                    <th className="text-truncate">Mật khẩu</th>
                    <th className="text-truncate">Role</th>
                    <th className="text-truncate">Hành động</th>
                </tr>
            </thead>
            <tbody>{renderUsers()}</tbody>
            <tfoot>
                <tr>
                    <th className="text-truncate">STT</th>
                    <th className="text-truncate">Tên tài khoản</th>
                    <th className="text-truncate">Mật khẩu</th>
                    <th className="text-truncate">Role</th>
                    <th className="text-truncate">Hành động</th>
                </tr>
            </tfoot>
        </Table>
    );
}
