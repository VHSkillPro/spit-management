import { Col, Container, Row } from "react-bootstrap";

export default function Forbidden() {
    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-center align-content-center">
                    Bạn không có quyền truy cập trang này
                </Col>
            </Row>
        </Container>
    );
}
