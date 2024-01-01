import supabase from "../database";

export default async function deleteProject(formData: FormData) {
    const projectId = formData.get("projectId") as string;
    const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .select();
    if (error) {
        console.log(error);
        return false;
    }
    if (data) {
        return data[0] ?? null;
    }
}