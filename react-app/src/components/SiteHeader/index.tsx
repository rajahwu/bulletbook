import { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown";

export default function SiteHeader({ session }: { session: Session | null }) {
  return (
    <div className="flex justify-between">
      <ul>
        <Link to="/home">Home</Link>
        <Link to="/technologies">Technologies</Link>
        <Link to="/projects">Projects</Link>
      </ul>
      {session && <ProfileDropdown />}
    </div>
  );
}
