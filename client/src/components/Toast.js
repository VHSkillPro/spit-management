import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

export const ToastStatus = {
    SUCCESS: "success",
    DANGER: "danger",
    WARNING: "warning",
    INFO: "info",
};

function MyToast({ title, message, status, autoHide }) {
    const [showToast, setShowToast] = useState(true);
    const [age, setAge] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAge(age + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const renderSwitch = (status) => {
        switch (status) {
            case ToastStatus.SUCCESS:
                return <i className="bi bi-check-circle text-success fs-4"></i>;

            case ToastStatus.DANGER:
                return <i className="bi bi-x-circle text-danger fs-4"></i>;

            case ToastStatus.WARNING:
                return (
                    <i className="bi bi-exclamation-circle text-warning fs-4"></i>
                );

            case ToastStatus.INFO:
                return <i className="bi bi-info-circle text-primary fs-4"></i>;

            default:
                break;
        }
    };

    return (
        <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            autohide={autoHide}
            bg={status}
        >
            <Toast.Header className="border border-0 py-1">
                <div className="me-2">{renderSwitch(status)}</div>
                <strong className="me-auto">{title}</strong>
                <small>{age}s ago</small>
            </Toast.Header>
            <Toast.Body className="bg-body-tertiary rounded-bottom-2 py-2">
                {message}
            </Toast.Body>
        </Toast>
    );
}

export default MyToast;
