import { ActionFunction } from "react-router-dom";
import supabase from "../../database";
import { deleteProjectImage, updateProjectImage } from "../../fetchers";

const action: ActionFunction =  async ({ request }) => {
  const user = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
    switch (request.method) {
      case "PUT": {
        const formData = await request.formData();
        console.log("update project image", formData)
        return updateProjectImage(formData) ?? null;
      }
      case "DELETE": {
        const formData = await request.formData();
        return deleteProjectImage(formData) ?? null;
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }
  
  export default action;
  