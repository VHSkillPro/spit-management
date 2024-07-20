import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthGuard from "./guards/AuthGuard";

import MessageProvider from "./contexts/MessageContext";
import Message from "./components/Message";

import NotFound from "./pages/NotFound";
import BreadcrumbProvider from "./contexts/BreadcrumbContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import User from "./modules/User";
import DisplayUser from "./modules/User/DisplayUser";
import { useEffect } from "react";
import { logoutRef } from "./navigate";

export default function App() {
    return (
        <MessageProvider>
            <AuthProvider>
                <BreadcrumbProvider>
                    <BrowserRouter>
                        <AuthGuard>
                            <App2 />
                        </AuthGuard>
                    </BrowserRouter>
                    <Message></Message>
                </BreadcrumbProvider>
            </AuthProvider>
        </MessageProvider>
    );
}

function App2() {
    const { logout } = useAuth();

    useEffect(() => {
        logoutRef.current = logout;
    }, [logout]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
                {/* <Route
                                        index
                                        element={<Dashboard />}
                                    ></Route>
                                    <Route
                                        path="/member"
                                        element{<ListMember />}
                                    ></Route> */}
                <Route path="/user" element={<User />}>
                    <Route index element={<DisplayUser />}></Route>
                    {/* <Route
                                            path="/user/add"
                                            element={<FormAddUser />}
                                        ></Route> */}
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}
