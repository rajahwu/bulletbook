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
        return createProfile(formData) ?? null;
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
  