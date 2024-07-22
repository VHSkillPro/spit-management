import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./guards/AuthGuard";
import MessageProvider from "./contexts/MessageContext";
import Message from "./components/Message";
import NotFound from "./pages/NotFound";
import BreadcrumbProvider from "./contexts/BreadcrumbContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import User from "./modules/User";
import DisplayUser from "./modules/User/DisplayUser";
import { PermissionProvider } from "./contexts/PermissionContext";
import PermissionGuard, { PERMISSIONS } from "./guards/PermissionGuard";

export default function App() {
    return (
        <MessageProvider>
            <AuthProvider>
                <BreadcrumbProvider>
                    <BrowserRouter>
                        <AuthGuard>
                            <PermissionProvider>
                                <App2 />
                            </PermissionProvider>
                        </AuthGuard>
                    </BrowserRouter>
                </BreadcrumbProvider>
            </AuthProvider>
            <Message></Message>
        </MessageProvider>
    );
}

function App2() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route path="/user" element={<User />}>
                    <Route
                        index
                        element={
                            <PermissionGuard route={PERMISSIONS.user}>
                                <DisplayUser />
                            </PermissionGuard>
                        }
                    />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}
