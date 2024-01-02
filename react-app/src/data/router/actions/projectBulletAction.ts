import { ActionFunction } from "react-router-dom";
// import supabase from "../../database";
import { createProjectBullet, deleteProjectBullet, updateProjectBullet } from "../../fetchers";

const action: ActionFunction =  async ({ request }) => {
 
    switch (request.method) {
      case "POST": {
        const formData = await request.formData();
        console.log("bullet action", formData);
        console.log("bullet action request", request);
        return createProjectBullet(formData) ?? null;
      }
      case "PUT": {
        const formData = await request.formData();
        console.log("bullet action", request);
        return updateProjectBullet(formData) ?? null;
      }
      case "DELETE": {
        const formData = await request.formData();
        return deleteProjectBullet(formData) ?? null;
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }
  
  export default action;
  