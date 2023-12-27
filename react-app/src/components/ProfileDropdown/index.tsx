import { Link } from "react-router-dom";
import SignOutButton from "../SignOutButton";

export default function ProfileDropdown() {
  return (
    <div className="flex items-center mr-3">
      <div className="flex-shrink-0">
        <Link to="/profile">
        <img
          className="w-10 h-10 rounded-full"
          src="https://avatars.githubusercontent.com/u/1333274?v=4"
          alt=""
        />
        </Link>
      </div>
      <div className="ml-3">
        <div className="text-base font-medium text-gray-800">
            <SignOutButton />
        </div>
        <div className="text-sm font-medium text-gray-500">
          <div />
        </div>
      </div>
    </div>
  );
}
