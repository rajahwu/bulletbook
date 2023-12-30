import supabase from "../database";

export default async function getProjects() {
    const user = await supabase.auth.getUser();
    if (!user) {
        return [];
    }
    const userId = user?.data?.user?.id ?? "";

    const { data, error } = await supabase
        .from('projects')
        .select()
        .eq('user_id', userId)
    if (error) {
        console.log(error);
        return [];
    }
    if (data) {
        return data;
    }
}