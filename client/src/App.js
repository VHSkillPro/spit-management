import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./guards/AuthGuard";
import MessageProvider from "./contexts/MessageContext";
import Message from "./components/Message";

export default function App() {
    return (
        <AuthProvider>
            <MessageProvider>
                <BrowserRouter>
                    <AuthGuard>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </AuthGuard>
                </BrowserRouter>
                <Message></Message>
            </MessageProvider>
        </AuthProvider>
    );
}
