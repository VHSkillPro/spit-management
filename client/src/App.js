import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}
