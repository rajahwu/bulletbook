import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import supabase from "../../data/database.ts";
import { Profile } from "../../lib/user.types.ts";

export default function ProfilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const profile = useLoaderData() as Profile;

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  return (
    <div className="m-5">
      <h1>Profile Page</h1>
      <Form method={profile ? "PUT" : "POST"} className="flex flex-col" encType="multipart/form-data">
        <div>
          <input
            placeholder="username"
            type="text"
            name="username"
            id="username"
            defaultValue={profile?.username ? profile.username : ""}
          />
        </div>
        <div>
          <input
            placeholder="email"
            type="email"
            name="email"
            id="email"
            defaultValue={session?.user ? session.user.email : ""}
          />
        </div>
        <div>
          <input
            placeholder="avatar"
            type="file"
            name="avatar"
            id="avatar"
            // defaultValue={profile?.avatar ? profile.avatar : ""}
          />
        </div>
        <div>
          <input type="submit" />
        </div>
      </Form>
    </div>
  );
}
