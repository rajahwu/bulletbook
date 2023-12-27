import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Database } from "../../database.types";
import { SiteFooter, SiteHeader } from "../components";
import { Profile, User } from "../lib/user.types.ts";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function Root() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  // const navigate = useNavigate()

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    const handleAuthStateChange = (_event: any, session: Session | null) => {
      setSession(session);
    };

    const fetchUserProfile = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user ?? null);

        if (data.user?.id) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select()
            .eq("id", data.user.id);

          if (profileData?.length) {
            setProfile(profileData[0] ?? null);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (!user) {
      fetchSession();
      fetchUserProfile();
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <SiteHeader session={session} />
      {session && profile ? (
        <Outlet />
      ) : (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      )}
      <SiteFooter />
    </div>
  );
}

export { supabase };
