import supabase from "../../database";
import { createProfile } from "../../fetchers";

export default async function action({ request, params }) {
  const user = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
    switch (request.method) {
      case "POST": {
        const formData = await request.formData();
        const username = formData.get("username");
        const email = formData.get("email");
        return createProfile({ username, email });
      }
      case "PUT": {
        const formData = await request.formData();
        const username = formData.get("username");
        const email = formData.get("email");
        return supabase
          .from("profiles")
          .update({ username, email })
          .eq("id", user?.data?.user?.id ?? "");
      }
      case "DELETE": {
        return () => console.log("DELETE " + params.id);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }
  