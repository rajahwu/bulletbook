import supabase from "../database";

export default async function updateProjectUrls(formData: FormData, project_id: string) {

    const live = formData.get("live")?.toString() ?? null;
    const github = formData.get("github")?.toString() ?? null;

    if(!live && !github) return;

    const projectUrls = {
        project_id,
        live,
        github
    }

    const { data, error } = await supabase
        .from("project_urls")
        .update(projectUrls)
        .eq("project_id", project_id)
        .select();
    if (error) {
        console.log(error);
        return [];
    }
    if (data) {
        return data[0] ?? null;
    }
}