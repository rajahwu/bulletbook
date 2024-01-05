import { redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import supabase from "../database";


export default async function createProjectImage(formData: FormData) {
        const userId = formData.get("userId")?.toString() ?? "";
        const projectId = formData.get("projectId")?.toString() ?? "";
        const image = formData.get("image") as File;
        const imageId = uuidv4();
        const imageUrl = userId + "/" + projectId + "/" + imageId;
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
                .insert({ id: imageId,  user_id: userId, project_id: projectId, url: imageUrl })
                .select();
            if (error) {
                console.log(error);
                return [];
            }
            if (data) {
                return redirect("/projects/" + projectId);
            }
        }
}