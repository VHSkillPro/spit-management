import { Button } from "react-bootstrap";
import { ToastStatus } from "../../components/Toast";
import { useMessage } from "../../contexts/MessageContext";
import { NavLink } from "react-router-dom";
import { destroyRole } from "../../API/roleService";

export default function TableRoleItem({ role, onChange }) {
    const { handleAddMessage } = useMessage();

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn xoá ?")) {
            destroyRole(role.id)
                .then(() => {
                    handleAddMessage(
                        "Thành công",
                        "Xoá thành công",
                        ToastStatus.SUCCESS
                    );
                    onChange();
                })
                .catch((error) => {
                    let message = "Xoá thất bại";
                    if (error.response.data?.message) {
                        message = error.response.data.message;
                    }
                    handleAddMessage("Thất bại", message, ToastStatus.DANGER);
                });
        }
    };

    return (
        <tr className={role.idx % 2 ? "odd" : "even"}>
            <td width={60}>{role.idx}</td>
            <td>{role.name}</td>
            <td>
                <div className="d-flex justify-content-end">
                    <NavLink
                        to={`/role/detail/${role.id}`}
                        className="me-2 btn btn-primary btn-sm"
                        title="Cập nhật thông tin"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </NavLink>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={handleDelete}
                        title="Xoá"
                    >
                        <i className="bi bi-trash3"></i>
                    </Button>
                </div>
            </td>
        </tr>
    );
}
