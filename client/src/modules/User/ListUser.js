import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../../API/userService";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Row,
    Table,
} from "react-bootstrap";
import MyPagination from "../../components/MyPagination";
import ListUserItem from "./ListUserItem";
import { useMessage } from "../../contexts/MessageContext";
import { ToastStatus } from "../../components/Toast";

export default function ListUser() {
    // Số lượng user của mỗi trang
    const pageSize = 10;

    // Số lượng trang
    const noPages = useRef(0);

    // State `isLoading` thể hiễn đã lấy được danh sách users chưa
    const [isLoading, setIsLoading] = useState(true);

    // State `users` lưu danh sách users
    const [users, setUsers] = useState([]);

    // State `page` thể hiện đang xem page nào
    const [page, setPage] = useState(1);

    // State `chooseUsers` lưu các users được chọn
    const [chooseUsers, setChooseUsers] = useState({});

    const { handleAddMessage } = useMessage();

    // Xử lý việc lấy danh sách users từ API
    const handleGetUsers = () => {
        getAllUsers()
            .then((response) => {
                const usersFromAPI = response.data.data.users;
                noPages.current = Math.ceil(usersFromAPI.length / pageSize);
                if (page > noPages.current) {
                    setPage(noPages.current);
                }
                setUsers(usersFromAPI);
                setIsLoading(false);
            })
            .catch((error) => {
                handleAddMessage(
                    "Lỗi",
                    error.response.data.message,
                    ToastStatus.DANGER
                );
            });
    };

    // Cập nhật dữ liệu mỗi 5s một lần
    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                handleGetUsers();
            }, 5000);

            return () => clearTimeout(timeout);
        } else {
            handleGetUsers();
        }
    });

    // Hàm xử lý sự kiện chọn users
    const handleToggleUserItem = (id) => {
        const newChooseUsers = { ...chooseUsers };
        if (!newChooseUsers[id]) {
            newChooseUsers[id] = true;
        } else {
            delete newChooseUsers[id];
        }
        setChooseUsers(newChooseUsers);
    };

    // Hàm xử lý chọn tất cả users
    const handleToggleAllUsers = () => {
        if (Object.keys(chooseUsers).length === users.length) {
            setChooseUsers({});
        } else {
            const newChooseUsers = {};
            for (const user of users) {
                newChooseUsers[user.id] = true;
            }
            setChooseUsers(newChooseUsers);
        }
    };

    // Tạo ra giao diện của danh sách users
    const renderUsers = () => {
        const usersData = [];
        for (
            let i = (page - 1) * pageSize;
            i < Math.min(page * pageSize, users.length);
            ++i
        )
            usersData.push(
                <ListUserItem
                    key={i}
                    id={i}
                    username={users[i].username}
                    password={users[i].password}
                    role={users[i].role}
                    onChange={handleGetUsers}
                    isChoose={chooseUsers[users[i].id]}
                    onChoose={() => handleToggleUserItem(users[i].id)}
                ></ListUserItem>
            );
        return usersData;
    };

    // Nếu chưa có danh sách users
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <CardHeader className="d-flex align-items-center">
                            <CardTitle>Danh sách tài khoản</CardTitle>
                            <div className="ms-auto">
                                <Button title="Thêm tài khoản">
                                    <i className="bi bi-person-plus"></i>
                                </Button>
                                {Object.keys(chooseUsers).length > 0 && (
                                    <>
                                        <Button
                                            variant="danger ms-2"
                                            title="Xoá tài khoản đã chọn"
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </Button>
                                        <Button
                                            variant="danger ms-2"
                                            title="Huỷ chọn"
                                            onClick={() => setChooseUsers({})}
                                        >
                                            <i className="bi bi-x-lg me-2"></i>
                                            Huỷ chọn
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardHeader>

                        <CardBody>
                            <div className="dataTables_wrapper dt-bootstrap4">
                                <Row>
                                    <Col sm={12}>
                                        <Table bordered hover striped>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div className="d-flex justify-content-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                checked={
                                                                    Object.keys(
                                                                        chooseUsers
                                                                    ).length ===
                                                                    users.length
                                                                }
                                                                onClick={
                                                                    handleToggleAllUsers
                                                                }
                                                            ></input>
                                                        </div>
                                                    </th>
                                                    <th>STT</th>
                                                    <th>Tên tài khoản</th>
                                                    <th>Mật khẩu</th>
                                                    <th>Role</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>{renderUsers()}</tbody>
                                            <tfoot>
                                                <tr>
                                                    <th></th>
                                                    <th>STT</th>
                                                    <th>Tên tài khoản</th>
                                                    <th>Mật khẩu</th>
                                                    <th>Role</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </tfoot>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} md={5}>
                                        <div className="dataTables_info">
                                            {`Showing ${
                                                (page - 1) * pageSize + 1
                                            } to ${Math.min(
                                                page * pageSize,
                                                users.length
                                            )} of ${users.length} entries`}
                                        </div>
                                    </Col>
                                    <Col sm={12} md={7}>
                                        <MyPagination
                                            page={page}
                                            onChangePage={setPage}
                                            noPages={noPages.current}
                                        ></MyPagination>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Container>
    );
}
