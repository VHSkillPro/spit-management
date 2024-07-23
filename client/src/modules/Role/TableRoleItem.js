import { Button } from "react-bootstrap";
import { ToastStatus } from "../../components/Toast";
import { useMessage } from "../../contexts/MessageContext";
import { NavLink } from "react-router-dom";

export default function TableRoleItem({ role, onChange }) {
    const { handleAddMessage } = useMessage();

    const handleDelete = () => {
        // if (window.confirm("Bạn có chắc chắn xoá ?")) {
        //     destroyUser(username)
        //         .then(() => {
        //             handleAddMessage(
        //                 "Thành công",
        //                 "Xoá thành công",
        //                 ToastStatus.SUCCESS
        //             );
        //             onChange();
        //         })
        //         .catch(() => {
        //             handleAddMessage(
        //                 "Thất bại",
        //                 "Xoá thất bại",
        //                 ToastStatus.DANGER
        //             );
        //         });
        // }
    };

    return (
        <tr className={role.idx % 2 ? "odd" : "even"}>
            <td>{role.idx}</td>
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
