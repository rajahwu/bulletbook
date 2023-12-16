import { Link } from "react-router-dom";

export default function LandingPage(params:type) {
    return (
        <div>
            <h1>Bullet Book</h1>
            <Link to="/technologies">techonologies</Link>
        </div>
    )
}