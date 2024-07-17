import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";

export default function AppMain() {
    return (
        <main className="app-main">
            <div className="app-content-header">
                <Container fluid>
                    <Row>
                        <Col>
                            <Breadcrumb></Breadcrumb>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="app-content">
                <Outlet></Outlet>
            </div>
        </main>
    );
}

function Breadcrumb() {
    const { breadcrumb } = useBreadcrumb();

    return (
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item active">Dashboard v3</li>
        </ol>
    );
}
