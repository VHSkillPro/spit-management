import { ToastContainer } from "react-bootstrap";
import { useMessage } from "../contexts/MessageContext";
import MyToast from "./Toast";

export default function Message() {
    const { messages } = useMessage();

    return (
        <ToastContainer
            position="top-end"
            className="m-3"
            style={{ position: "fixed" }}
        >
            {messages.map((data, index) => (
                <MyToast
                    key={messages.length - index - 1}
                    title={data.title}
                    autoHide={true}
                    message={data.message}
                    status={data.status}
                ></MyToast>
            ))}
        </ToastContainer>
    );
}
