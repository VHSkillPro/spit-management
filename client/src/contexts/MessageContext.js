import { createContext, useContext, useState } from "react";

export const MessageContext = createContext();

export default function MessageProvider({ children }) {
    const [messages, setMessages] = useState([]);

    const handleAddMessage = (message) => {
        const newMessages = [message, ...messages];
        setMessages(newMessages);
    };

    return (
        <MessageContext.Provider value={{ messages, handleAddMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

export const useMessage = () => {
    return useContext(MessageContext);
};
