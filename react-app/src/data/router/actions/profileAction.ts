import { ActionFunction } from "react-router-dom";
import supabase from "../../database";
import { createProfile, updateProfile } from "../../fetchers";

const action: ActionFunction =  async ({ request, params }) => {
  const user = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
    switch (request.method) {
      case "POST": {
        const formData = await request.formData();
        const username = formData.get("username")?.toString() ?? null;
        const email = formData.get("email")?.toString() ?? null;
        const avatar = formData.get("avatar") ?? null;
        return createProfile({ username, email, avatar }) ?? null;
      }
      case "PUT": {
        const formData = await request.formData();
        return updateProfile(formData) ?? null;
      }
      case "DELETE": {
        return () => console.log("DELETE " + params.id);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }
  
  export default action;
  