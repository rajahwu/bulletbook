import supabase from "../database";

export default async function getProjects() {
    const user = await supabase.auth.getUser();
    if (!user) {
        return [];
    }
    const userId = user?.data?.user?.id ?? "";

    const { data, error } = await supabase
        .from('projects')
        .select(`*, project_urls(*)`)
        .eq('user_id', userId)
    if (error) {
        console.log(error);
        return [];
    }
    if (data) {
        console.log(data);
        return data;
    }
}