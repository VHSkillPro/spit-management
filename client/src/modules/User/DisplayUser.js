import { useEffect, useReducer, useRef, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
} from "react-bootstrap";
import { getAllUsers } from "../../API/userService";
import TableUser from "./TableUser";
import FormSearchUser from "./FormSearchUser";

export default function DisplayUser() {
    // Số lượng user của mỗi trang
    const pageSize = 10;

    // State `page` thể hiện đang xem page nào
    const [page, setPage] = useState(1);

    // State `displaySearch` lưu trạng thái ẩn/hiện của bảng tìm kiếm
    const [displaySearch, setDisplaySearch] = useState(false);

    // State `chooseUsers` lưu các users được chọn
    const [chooseUsers, setChooseUsers] = useState({});

    // State `isLoading` thể hiễn đã lấy được danh sách users chưa
    const [isLoading, setIsLoading] = useState(true);

    // State `users` lưu danh sách users
    const [users, setUsers] = useState([]);

    // State `paramsSearch` lưu thông tin tìm kiếm
    const paramsSearch = useRef({});

    // Xử lý việc lấy danh sách users từ API
    const handleGetUsers = (params) => {
        getAllUsers(params)
            .then((response) => {
                const usersFromAPI = response.data.data.users;

                if (page > Math.ceil(usersFromAPI.length / pageSize)) {
                    setPage(Math.ceil(usersFromAPI.length / pageSize));
                }

                if (page < 1) {
                    setPage(1);
                }

                setUsers(usersFromAPI);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("handleGetUsers", error);
            });
    };

    // Xử lý tìm kiếm
    const handleFind = (params) => {
        paramsSearch.current = params;
        handleGetUsers(params);
    };

    // Cập nhật dữ liệu mỗi 5s một lần
    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                handleGetUsers(paramsSearch.current);
            }, 5000);
            return () => clearTimeout(timeout);
        } else {
            handleGetUsers(paramsSearch.current);
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

    // Hàm xử lý hiển thị nội dung
    const renderContent = () => {
        const tableUser = (
            <TableUser
                users={users}
                chooseUsers={chooseUsers}
                handleToggleUserItem={handleToggleUserItem}
                handleToggleAllUsers={handleToggleAllUsers}
                handleGetUsers={handleGetUsers}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
            />
        );

        if (displaySearch) {
            return (
                <Row>
                    <Col xl={9}>{tableUser}</Col>
                    <Col xl={3}>
                        <FormSearchUser handleFind={handleFind} />
                    </Col>
                </Row>
            );
        }
        return (
            <Row>
                <Col>{tableUser}</Col>
            </Row>
        );
    };

    // Nếu chưa có danh sách users
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader className="d-flex align-items-center">
                <CardTitle className="fw-bold fs-5">
                    Danh sách tài khoản
                </CardTitle>
                <div className="ms-auto">
                    <Button title="Thêm tài khoản" size="sm">
                        <i className="bi bi-person-plus"></i>
                    </Button>
                    <Button
                        title="Tìm kiếm"
                        size="sm"
                        className="ms-2"
                        onClick={() => setDisplaySearch(!displaySearch)}
                    >
                        <i className="bi bi-search"></i>
                    </Button>
                    {Object.keys(chooseUsers).length > 0 && (
                        <>
                            <Button
                                className="ms-2"
                                variant="danger"
                                title="Xoá tài khoản đã chọn"
                                size="sm"
                            >
                                <i className="bi bi-trash3"></i>
                            </Button>
                            <Button
                                className="ms-2"
                                variant="danger"
                                title="Huỷ chọn"
                                size="sm"
                                onClick={() => setChooseUsers({})}
                            >
                                <i className="bi bi-x-lg me-2"></i>
                                Huỷ chọn
                            </Button>
                        </>
                    )}
                </div>
            </CardHeader>
            <CardBody>{renderContent()}</CardBody>
        </Card>
    );
}
