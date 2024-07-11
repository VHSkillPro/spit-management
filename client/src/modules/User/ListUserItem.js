import { Button } from "react-bootstrap";
import { destroyUser } from "../../API/userService";

export default function ListUserItem({
    id,
    username,
    password,
    role,
    onChange,
    isChoose,
    onChoose,
}) {
    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn xoá ?")) {
            destroyUser(username)
                .then((response) => {
                    onChange();
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    return (
        <tr className={(id + 1) % 2 ? "odd" : "even"}>
            <td>
                <div className="d-flex justify-content-center">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isChoose ? true : false}
                        onClick={onChoose}
                    ></input>
                </div>
            </td>
            <td>{id + 1}</td>
            <td>{username}</td>
            <td>{password}</td>
            <td>{role}</td>
            <td className="w-25">
                <div className="d-flex justify-content-end">
                    <Button size="sm" className="me-2">
                        Đổi mật khẩu
                    </Button>
                    <Button size="sm" className="me-2">
                        Chức vụ
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
