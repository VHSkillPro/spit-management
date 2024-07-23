import { useEffect, useState } from "react";
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
import MyPagination from "../../components/MyPagination";
import { NavLink } from "react-router-dom";

export default function DisplayUser() {
    // Số lượng user của mỗi trang
    const pageSize = 10;

    // State `page` thể hiện đang xem page nào
    const [page, setPage] = useState(1);

    // State `total` thể hiện tổng số lượng user trong database
    const [total, setTotal] = useState(0);

    // State `users` lưu danh sách users
    const [users, setUsers] = useState([]);

    // State `displaySearch` lưu trạng thái ẩn/hiện của bảng tìm kiếm
    const [displaySearch, setDisplaySearch] = useState(false);

    // State `isLoading` thể hiễn đã lấy được danh sách users chưa
    const [isLoading, setIsLoading] = useState(true);

    // State `paramsSearch` lưu thông tin tìm kiếm
    const [paramsSearch, setParamsSearch] = useState({});

    // Cập nhật dữ liệu mỗi 5s một lần
    useEffect(() => {
        handleGetUsers();
        const interval = setInterval(() => {
            handleGetUsers();
        }, 5000);
        return () => clearInterval(interval);
    }, [page, paramsSearch]);

    // Xử lý việc lấy danh sách users từ API
    const handleGetUsers = () => {
        const params = paramsSearch;
        params.offset = Math.max((page - 1) * pageSize, 0);
        params.limit = pageSize;

        getAllUsers(params)
            .then((response) => {
                const usersFromAPI = response.data.data.users;
                const totalUsers = response.data.data.total;

                // Thêm index cho user
                usersFromAPI.map((user, idx) => {
                    user.idx = (page - 1) * pageSize + idx;
                    return user;
                });

                if (totalUsers === 0) {
                    setPage(1);
                } else {
                    // Nếu page hiện tại lớn hơn số trang tối đa
                    if (page > Math.ceil(totalUsers / pageSize)) {
                        setPage(Math.ceil(totalUsers / pageSize));
                    }

                    // Nếu page hiện tại nhỏ hơn 1
                    if (page < 1) {
                        setPage(1);
                    }
                }

                setTotal(totalUsers);
                setUsers(usersFromAPI);
                setIsLoading(false);
            })
            .catch(() => {});
    };

    // Xử lý tìm kiếm
    const handleFind = (params) => {
        setParamsSearch(params);
    };

    // Hàm xử lý hiển thị nội dung
    const renderContent = () => {
        const tableUser = <TableUser users={users} onChange={handleGetUsers} />;

        if (displaySearch) {
            return (
                <Row>
                    <Col xl={9}>{tableUser}</Col>
                    <Col xl={3}>
                        <FormSearchUser onFind={handleFind} />
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
                    <NavLink
                        to={`/user/add`}
                        className="btn btn-primary btn-sm"
                        title="Thêm tài khoản"
                    >
                        <i className="bi bi-person-plus"></i>
                    </NavLink>
                    <Button
                        title="Tìm kiếm"
                        size="sm"
                        className="ms-2"
                        onClick={() => setDisplaySearch(!displaySearch)}
                    >
                        <i className="bi bi-search"></i>
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <Row>{renderContent()}</Row>
                <Row>
                    <Col sm={12} md={5}>
                        <div className="dataTables_info">
                            {`Hiển thị ${Math.max(
                                (page - 1) * pageSize + 1,
                                0
                            )} đến ${Math.min(
                                page * pageSize,
                                total
                            )} trong ${total} tài khoản`}
                        </div>
                    </Col>
                    <Col sm={12} md={7}>
                        <MyPagination
                            page={page}
                            onChangePage={setPage}
                            noPages={Math.ceil(total / pageSize)}
                        ></MyPagination>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
