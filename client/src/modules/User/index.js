import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function User() {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Outlet></Outlet>
                </Col>
            </Row>
        </Container>
    );
}
