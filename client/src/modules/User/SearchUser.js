import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormLabel,
} from "react-bootstrap";

export default function SearchUser() {
    return (
        <Card className="rounded-0 shadow-none">
            <CardHeader className="py-2">
                <CardTitle className="fw-bold">Tìm kiếm tài khoản</CardTitle>
            </CardHeader>
            <CardBody>
                <Form.Group className="mb-3">
                    <FormLabel className="fs-6">Tên tài khoản</FormLabel>
                    <FormControl
                        name="username"
                        type="text"
                        placeholder="Nhập tên tài khoản tìm kiếm"
                    ></FormControl>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FormLabel className="fs-6">Role</FormLabel>
                    <Form.Select aria-label="Default select example">
                        <option>Chọn role cần tìm kiếm</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="d-flex justify-content-center">
                    <Button size="sm">Tìm kiếm</Button>
                </Form.Group>
            </CardBody>
        </Card>
    );
}
