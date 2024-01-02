import supabase from "../database";
import createProjectImage from "./createProjectImage";
import updateProjectUrls from "./updateProjectUrls";

export default async function updateProject(formData: FormData) {

    const user = await supabase.auth.getUser();
    if (!user) {
      return [];
    }
    const userId = user?.data?.user?.id ?? "";

    const name = formData.get("name")?.toString() ?? null;
    const description = formData.get("description")?.toString() ?? null;
    const projectId = formData.get("projectId")?.toString() ?? null;
    const image = formData.get("image");

    console.log(name, description, projectId);

    const newProject = {
        user_id: userId,
        name,
        description
    }

    const { data, error } = await supabase
        .from("projects")
        .update(newProject)
        .eq("id", projectId)
        .select();
    if (error) {
        console.log(error);
        return [];
    }
    if (data) {
        if(projectId === null) return;
        updateProjectUrls(formData, projectId);
        if(image instanceof File) {
            formData.append("userId", userId);
            createProjectImage(formData)
        }
        return data[0] ?? null;
}
}