import { Button } from "react-bootstrap";
import { destroyUser } from "../../API/userService";
import { ToastStatus } from "../../components/Toast";
import { useMessage } from "../../contexts/MessageContext";

export default function TableUserItem({
    id,
    username,
    password,
    role,
    onChange,
}) {
    const { handleAddMessage } = useMessage();

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn xoá ?")) {
            destroyUser(username)
                .then(() => {
                    handleAddMessage(
                        "Thành công",
                        "Xoá tài khoản thành công",
                        ToastStatus.SUCCESS
                    );
                    onChange();
                })
                .catch(() => {
                    handleAddMessage(
                        "Thất bại",
                        "Xoá thất bại",
                        ToastStatus.DANGER
                    );
                });
        }
    };

    return (
        <tr className={(id + 1) % 2 ? "odd" : "even"}>
            <td width={50}>{id + 1}</td>
            <td className="text-truncate">{username}</td>
            <td className="text-truncate">{password}</td>
            <td>{role}</td>
            <td width={250}>
                <div className="d-flex justify-content-end">
                    <Button size="sm" className="me-2">
                        Đổi chức vụ
                    </Button>
                    <Button size="sm" className="me-2" title="Đổi mật khẩu">
                        <i className="bi bi-key"></i>
                    </Button>
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
