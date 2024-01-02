import supabase from "../database";
import createProjectImage from "./createProjectImage";
import createProjectUrls from "./createProjectUrls";

export default async function createProject(formData: FormData) {

    const user = await supabase.auth.getUser();
    if (!user) {
        return [];
    }
    
    const userId = user?.data?.user?.id ?? "";

    const name = formData.get("name")?.toString() ?? null;
    const description = formData.get("description")?.toString() ?? null;
    const image = formData.get("image");

    console.log(name, description, image);

    const newProject = {
        user_id: userId,
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
        const project = data[0];
        createProjectUrls(formData, project.id);
        createProjectImage({ userId, image: image as File, imageId: image.id, projectId: project.id })
        return data[0] ?? null;
    }
}