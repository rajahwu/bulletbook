import { ActionFunction } from "react-router-dom";
import supabase from "../../database";
import { createProject, deleteProject, updateProject } from "../../fetchers";

const action: ActionFunction =  async ({ request }) => {
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
        const formData = await request.formData();
        return deleteProject(formData) ?? null;
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }
  
  export default action;
  