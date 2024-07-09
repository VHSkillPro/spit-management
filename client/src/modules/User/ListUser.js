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

export default function ListUser() {
    const pageSize = 10;
    const noPages = useRef(0);

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    const displayUsers = () => {
        getAllUsers()
            .then((response) => {
                const usersFromAPI = response.data.data.users;
                noPages.current = Math.floor(usersFromAPI.length / pageSize);
                setUsers(usersFromAPI);
                setIsLoading(false);
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => {
                displayUsers();
            }, 5000);

            return () => clearTimeout(timeout);
        } else {
            displayUsers();
        }
    });

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
                    onChange={displayUsers}
                ></ListUserItem>
            );
        return usersData;
    };

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
                            <Button className="ms-auto">
                                <i className="bi bi-person-plus me-2"></i>
                                Thêm tài khoản
                            </Button>
                        </CardHeader>

                        <CardBody>
                            <div className="dataTables_wrapper dt-bootstrap4">
                                <Row>
                                    <Col sm={12}>
                                        <Table bordered hover striped>
                                            <thead>
                                                <tr>
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
