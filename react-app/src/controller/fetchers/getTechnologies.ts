import { Technology } from "../../lib/technology.types";
import supabase from "../database";

// const TECH_CATEGORIES = ["database", "orm", "backend_framework", "frontend_library", "ui_ux", "data_management", "dev_team", "third_party_api"] as const;

const getTechnologies = async () => {

const { data, error } = await supabase
        .from("technologies")
        .select()
        .order("name", { ascending: true })
    if (error) {  
        console.log(error);
        return { TECH_CATEGORIES: [], TECHNOLOGIES: [] };
      }
    if (data) {
        const categories = new Set<string>();
        data.forEach((tech: Technology) => {
            categories.add(tech.category);
        });


        return {
            TECH_CATEGORIES: Array.from(categories),
            TECHNOLOGIES: data ?? []
        };
    }
}

export default getTechnologies;