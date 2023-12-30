import { ActionFunction } from "react-router-dom";
import supabase from "../../database";
import { createProject, updateProject } from "../../fetchers";

const action: ActionFunction =  async ({ request, params }) => {
  const user = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
    switch (request.method) {
      case "POST": {
        const formData = await request.formData();
        return createProject(formData) ?? null;
      }
      case "PUT": {
        const formData = await request.formData();
        return updateProject(formData) ?? null;
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
  