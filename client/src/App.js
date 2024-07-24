import { BrowserRouter, Route, Routes } from "react-router-dom";

// Contexts
import AuthProvider from "./contexts/AuthContext";
import MessageProvider from "./contexts/MessageContext";
import BreadcrumbProvider from "./contexts/BreadcrumbContext";
import PermissionProvider from "./contexts/PermissionContext";

// Guards
import AuthGuard from "./guards/AuthGuard";
import PermissionGuard from "./guards/PermissionGuard";

// Pages
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Modules User
import User from "./modules/User";
import DisplayUser from "./modules/User/DisplayUser";
import FormUpdateUser from "./modules/User/FormUpdateUser";
import FormAddUser from "./modules/User/FormAddUser";

// Module Role
import Role from "./modules/Role";

// Components
import Message from "./components/Message";
import DisplayRole from "./modules/Role/DisplayRole";
import FormAddRole from "./modules/Role/FormAddRole";
import FormUpdateRole from "./modules/Role/FormUpdateRole";

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
                            <PermissionGuard route={"user.index"}>
                                <DisplayUser />
                            </PermissionGuard>
                        }
                    />
                    <Route
                        path="/user/add"
                        element={
                            <PermissionGuard route={"user.create"}>
                                <FormAddUser />
                            </PermissionGuard>
                        }
                    />
                    <Route
                        path="/user/detail/:username"
                        element={
                            <PermissionGuard route={"user.show"}>
                                <FormUpdateUser />
                            </PermissionGuard>
                        }
                    />
                </Route>
                <Route path="/role" element={<Role />}>
                    <Route
                        index
                        element={
                            <PermissionGuard route={"role.index"}>
                                <DisplayRole />
                            </PermissionGuard>
                        }
                    />
                    <Route
                        path="/role/add"
                        element={
                            <PermissionGuard route={"role.create"}>
                                <FormAddRole />
                            </PermissionGuard>
                        }
                    />
                    <Route
                        path="/role/detail/:roleId"
                        element={
                            <PermissionGuard route={"role.show"}>
                                <FormUpdateRole />
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
