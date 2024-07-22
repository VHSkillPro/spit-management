import TableUserItem from "./TableUserItem";
import { Table } from "react-bootstrap";

export default function TableUser({
    users,
    chooseUsers,
    handleToggleUserItem,
    handleToggleAllUsers,
    handleGetUsers,
}) {
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
                    onChange={handleGetUsers}
                    isChoose={chooseUsers[user.id]}
                    onChoose={() => handleToggleUserItem(user.id)}
                ></TableUserItem>
            );
        });
    };

    return (
        <Table bordered hover striped>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-center">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                    Object.keys(chooseUsers).length ===
                                    users.length
                                }
                                onChange={handleToggleAllUsers}
                            ></input>
                        </div>
                    </th>
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
                    <th>
                        <div className="d-flex justify-content-center">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                    Object.keys(chooseUsers).length ===
                                    users.length
                                }
                                onChange={handleToggleAllUsers}
                            ></input>
                        </div>
                    </th>
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
