import { useLoaderData, useParams } from "react-router-dom";

export default function ProjectViewPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const projects = useLoaderData() as Project[];
  console.log(projects)
  const project = projects.find((project) => project.id === projectId);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
}