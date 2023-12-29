import supabase from "../database";

export default async function getProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select()
    if (error) {
        console.log(error);
        return [];
    }
    if (data) {
        return data;
    }
}