import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import { Project } from "../../lib/technology.types";

export default function ProjectsPage() {
  const projects = useLoaderData() as Project[];
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const path =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div>
      <h1>Project Page</h1>
      {path === "projects" ? (
        <ul>
          {projects.map((project: Project) => (
            <li key={project.id} className="m-2 border p-2">
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2>Single Project</h2>
          {id && (
            <div>
              {/* Find the project with the matching ID */}
              {projects
                .filter((project) => project.id === id)
                .map((project) => (
                  <div key={project.id} className="m-3 border p-3">
                    <h3>{project.name}</h3>
                    {/* Display other details of the project */}
                    <p>Description: {project.description}</p>
                    {/* Add more details as needed */}
                    <Link to={`/projects/edit/${project.id}`}>Edit</Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
      {path === "projects" ? (
        <Link to="/projects/new">Add New Project</Link>
      ) : (
        <Link to="/projects">Back to Projects</Link>
      )}
    </div>
  );
}
