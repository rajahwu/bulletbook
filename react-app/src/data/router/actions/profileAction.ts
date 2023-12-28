import supabase from "../../database";
import { createProfile, updateProfile } from "../../fetchers";

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
        return createProfile({ username, email }) ?? null;
      }
      case "PUT": {
        const formData = await request.formData();
        const username = formData.get("username");
        const email = formData.get("email");
        return updateProfile({username, email}) ?? null;
      }
      case "DELETE": {
        return () => console.log("DELETE " + params.id);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }
  