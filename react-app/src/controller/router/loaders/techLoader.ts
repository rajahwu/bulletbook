import { getProjects, getTechnologies } from "../../fetchers";

export default async function loader() {
  const technologies = await getTechnologies();
  const projects = await getProjects();
  return { technologies, projects };
}
