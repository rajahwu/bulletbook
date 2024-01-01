import { v4 as uuidv4 } from "uuid";
import supabase from "../database";
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

        if (image instanceof File) {
            const imageUrl = userId + "/" + project.id + "/" + uuidv4();
            const { data, error } = await supabase.storage
                .from("project_images")
                .upload(imageUrl, image, { upsert: true });
            if (error) {
                console.log(error);
                return [];
            }
            if (data) {
                const { data, error } = await supabase
                    .from("project_images")
                    .insert({ project_id: project.id, url: imageUrl })
                    .select();
                if (error) {
                    console.log(error);
                    return [];
                }
                if (data) {
                    console.log(data);
                }
            }
        }

        return data[0] ?? null;
    }
}