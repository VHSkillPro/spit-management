import { Link } from "react-router-dom";
import "../404.css";

export default function NotFound() {
    return (
        <div
            className="cont_principal cont_error_active"
            style={{ backgroundColor: "#d4d9ed" }}
        >
            <div className="cont_error d-flex justify-content-center">
                <div>
                    <h1>Oops</h1>
                    <p>The Page you're looking for isn't here.</p>
                    <Link to="/" className="nav-link">
                        <p>Go to home</p>
                    </Link>
                </div>
            </div>
            <div className="cont_aura_1"></div>
            <div className="cont_aura_2"></div>
        </div>
    );
}
