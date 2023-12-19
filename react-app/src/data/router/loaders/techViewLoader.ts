import { getProjects } from "../../projects";
import { getTechnologies } from "../../technologies";

export async function loader() {
    const technologies = await getTechnologies();
    const projects = await getProjects();
    return { technologies, projects };
  }
