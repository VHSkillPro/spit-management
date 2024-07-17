import { useState } from "react";
import TableUserItem from "./TableUserItem";
import { Col, Row, Table } from "react-bootstrap";
import MyPagination from "../../components/MyPagination";

export default function TableUser({
    users,
    chooseUsers,
    handleToggleUserItem,
    handleToggleAllUsers,
    handleGetUsers,
    pageSize,
    page,
    setPage,
}) {
    // Tạo ra giao diện của danh sách users
    const renderUsers = () => {
        const usersData = [];
        for (
            let i = (page - 1) * pageSize;
            i < Math.min(page * pageSize, users.length);
            ++i
        )
            usersData.push(
                <TableUserItem
                    key={i}
                    id={i}
                    username={users[i].username}
                    password={users[i].password}
                    role={users[i].role.name}
                    onChange={handleGetUsers}
                    isChoose={chooseUsers[users[i].id]}
                    onChoose={() => handleToggleUserItem(users[i].id)}
                ></TableUserItem>
            );
        return usersData;
    };

    return (
        <>
            <Row>
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
            </Row>
            <Row>
                <Col sm={12} md={5}>
                    <div className="dataTables_info">
                        {`Hiển thị ${(page - 1) * pageSize + 1} đến ${Math.min(
                            page * pageSize,
                            users.length
                        )} trong ${users.length} tài khoản`}
                    </div>
                </Col>
                <Col sm={12} md={7}>
                    <MyPagination
                        page={page}
                        onChangePage={setPage}
                        noPages={Math.ceil(users.length / pageSize)}
                    ></MyPagination>
                </Col>
            </Row>
        </>
    );
}
