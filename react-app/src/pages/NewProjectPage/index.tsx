import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import { Project } from "../../lib/technology.types";

export default function NewProjectPage() {
  const { id } = useParams<{ id: string }>();
  const projects = useLoaderData() as Project[];

  const project = projects.find((project) => project.id === id);

  return (
    <div className="m-5">
      <h1>{id ? "Edit Project" : "New Project"} Page</h1>
      <Form
        method={id ? "PUT" : "POST"}
        className="flex flex-col"
        encType="multipart/form-data"
      >
        <div>
          <input
            placeholder="Project Title"
            type="text"
            name="name"
            id="name"
            defaultValue={project?.name ? project.name : ""}
          />
        </div>
        <div>
          <textarea
            name="description"
            id="description"
            defaultValue={project?.description ? project.description : ""}
          ></textarea>
        </div>
        <div>
          <input type="submit" />
        </div>
      </Form>
      <Link to="/projects">Back to Projects</Link>
    </div>
  );
}
