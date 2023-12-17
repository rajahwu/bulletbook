import { Link } from 'react-router-dom'
import { supabase } from "../../layouts/root"

export default function SignOutButton() {
    const handleClick =async () => {
        const { error } = await supabase.auth.signOut()
        return error
    }
    return (
        <Link to="/" onClick={handleClick}>Sign Out</Link>
    )
}