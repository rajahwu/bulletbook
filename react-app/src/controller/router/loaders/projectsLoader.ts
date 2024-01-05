import { getProjects } from "../../fetchers";

export default async function ProjectsLoader() {
   return getProjects();
}
