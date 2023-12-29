import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SiteFooter, SiteHeader } from "../components";
import supabase from "../data/database.ts";

export default function Root() {
  const [session, setSession] = useState<Session | null>(null);
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

    fetchSession();

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
      {session ? <Outlet /> : <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />}
      <SiteFooter />
    </div>
  );
}

