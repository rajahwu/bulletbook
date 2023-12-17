import { Link } from "react-router-dom"

export default function SiteHeader() {
    return (
        <div>
            <ul>
                <Link to="/home">Home</Link>
                <Link to="/technologies">Technologies</Link>
            </ul>
        </div>
    )
}