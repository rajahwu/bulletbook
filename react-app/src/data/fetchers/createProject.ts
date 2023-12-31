import supabase from "../database";
import createProjectUrls from "./createProjectUrls";

export default async function createProject(formData: FormData) {

    const user = await supabase.auth.getUser();
    if (!user) {
      return [];
    }
    const id = user?.data?.user?.id ?? "";
  

    const name = formData.get("name")?.toString() ?? null;
    const description = formData.get("description")?.toString() ?? null;

    console.log(name, description);

    const newProject = {
        user_id: id,
        name,
        description
    }

    const { data, error } = await supabase
        .from("projects")
        .insert(newProject)
        .select();
    if (error) {
        console.log(error);
        return [];
    }
    if (data) {
        createProjectUrls(formData, data[0].id);
        return data[0] ?? null;
    }
}