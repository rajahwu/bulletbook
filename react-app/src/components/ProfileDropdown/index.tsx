import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../controller/fetchers";
import SignOutButton from "../SignOutButton";

interface Profile {
  avatar: string;
  // Add other properties if needed
}

export default function ProfileDropdown() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile().then((data) => setProfile(data));
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex items-center mr-3">
      <div className="flex-shrink-0">
        <Link to="/profile">
          {profile?.avatar && (
            <img
              className="w-10 h-10 rounded-full"
              src={`https://mncqloseevstasdpqcuh.supabase.co/storage/v1/object/public/profiles/${profile?.avatar}`}
              alt=""
            />
          )}
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
