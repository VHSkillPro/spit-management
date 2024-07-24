import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormText,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createRole } from "../../API/roleService";
import { useMessage } from "../../contexts/MessageContext";
import { ToastStatus } from "../../components/Toast";
import { useNavigate } from "react-router-dom";

export default function FormAddRole() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { handleAddMessage } = useMessage();
    const navigate = useNavigate();

    const handleAddRole = (role) => {
        createRole(role)
            .then(() => {
                handleAddMessage(
                    "Thành công",
                    "Thêm chức vụ thành công",
                    ToastStatus.SUCCESS
                );
                navigate("/role");
            })
            .catch(() => {
                handleAddMessage(
                    "Thành công",
                    "Thêm chức vụ thất bại",
                    ToastStatus.DANGER
                );
            });
    };

    return (
        <Card>
            <CardHeader className="d-flex align-items-center">
                <CardTitle className="fw-bold fs-5">Thêm chức vụ</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(handleAddRole)}>
                    <FormGroup className="mb-3">
                        <FormLabel className="fs-6">Tên chức vụ</FormLabel>
                        <FormControl
                            placeholder="Nhập tên chức vụ"
                            {...register("name", {
                                required: "Tên chức vụ không được để trống",
                            })}
                        ></FormControl>
                        {errors.name?.type === "required" && (
                            <FormText className="text-danger">
                                {errors.name.message}
                            </FormText>
                        )}
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-center">
                        <Button type="submit">
                            <i className="bi bi-plus-circle me-2"></i>
                            Thêm
                        </Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
}
