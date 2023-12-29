import supabase from "../database";

const TECH_CATEGORIES = ["database", "orm", "backend_framework", "frontend_library", "ui_ux", "data_management", "dev_team", "third_party_api"] as const;

const getTechnologies = async () => {

const { data, error } = await supabase
        .from("technologies")
        .select()
        .order("name", { ascending: true })
    if (error) {  
        console.log(error);
        return [];
      }
    if (data) {
        return {
            TECH_CATEGORIES,
            TECHNOLOGIES: data
        };
    }
}

export default getTechnologies;