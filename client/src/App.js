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

export default function App() {
    return (
        <AuthProvider>
            <MessageProvider>
                <BreadcrumbProvider>
                    <BrowserRouter>
                        <AuthGuard>
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
                                        <Route
                                            index
                                            element={<DisplayUser />}
                                        ></Route>
                                        {/* <Route
                                            path="/user/add"
                                            element={<FormAddUser />}
                                        ></Route> */}
                                    </Route>
                                </Route>
                                <Route
                                    path="/login"
                                    element={<LoginPage />}
                                ></Route>
                                <Route path="*" element={<NotFound />}></Route>
                            </Routes>
                        </AuthGuard>
                    </BrowserRouter>
                    <Message></Message>
                </BreadcrumbProvider>
            </MessageProvider>
        </AuthProvider>
    );
}
