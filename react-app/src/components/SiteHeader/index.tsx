import { Link } from "react-router-dom"
import SignOutButton from "../SignOutButton"

export default function SiteHeader({ session }) {
    return (
        <div className="flex justify-between">
            <ul>
                <Link to="/home">Home</Link>
                <Link to="/technologies">Technologies</Link>
            </ul>
            {session && <SignOutButton />}
        </div>
    )
}