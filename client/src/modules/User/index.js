import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import ListUser from "./ListUser";
import { useState } from "react";
import SearchUser from "./SearchUser";

export default function User() {
    // State `chooseUsers` lưu các users được chọn
    const [chooseUsers, setChooseUsers] = useState({});

    // State `displaySearch` lưu trạng thái ẩn/hiện của bảng tìm kiếm
    const [displaySearch, setDisplaySearch] = useState(false);

    const renderContent = () => {
        if (displaySearch) {
            return (
                <Row>
                    <Col xl={9}>
                        <ListUser
                            chooseUsers={chooseUsers}
                            setChooseUsers={setChooseUsers}
                        ></ListUser>
                    </Col>
                    <Col xl={3}>
                        <SearchUser></SearchUser>
                    </Col>
                </Row>
            );
        }

        return (
            <Row>
                <Col>
                    <ListUser
                        chooseUsers={chooseUsers}
                        setChooseUsers={setChooseUsers}
                    ></ListUser>
                </Col>
            </Row>
        );
    };

    return (
        <Container fluid>
            <Row>
                <Col>
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
                                    onClick={() =>
                                        setDisplaySearch(!displaySearch)
                                    }
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
                </Col>
            </Row>
        </Container>
    );
}
