import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { lazy } from "react";
import AuthGuard from "./guards/AuthGuard";
import MessageProvider from "./contexts/MessageContext";
import Message from "./components/Message";
// import ListMember from "./modules/Member/ListMember";
import NotFound from "./pages/NotFound";
// import Dashboard from "./modules/Dashboard";
import BreadcrumbProvider from "./contexts/BreadcrumbContext";
// import FormAddUser from "./modules/User/FormAddUser";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const User = lazy(() => import("./modules/User"));
const DisplayUser = lazy(() => import("./modules/User/DisplayUser"));

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
