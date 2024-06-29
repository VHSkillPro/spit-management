import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./guards/AuthGuard";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthGuard>
                                <Home />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <AuthGuard>
                                <LoginPage />
                            </AuthGuard>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
