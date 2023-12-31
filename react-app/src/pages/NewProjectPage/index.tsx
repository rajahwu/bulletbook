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
        <fieldset>
          <legend>Project Details</legend>
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
        </fieldset>
        <fieldset>
          <legend>Project Links</legend>
          <div>
            <input
              placeholder="Live Link"
              type="text"
              name="live"
              id="live"
              // defaultValue={project?.link ? project.link : ""}
            />
          </div>
          <div>
            <input
              placeholder="Github Link"
              type="text"
              name="github"
              id="github"
              // defaultValue={project?.link ? project.link : ""}
            />
          </div>
        </fieldset>
        <div>
          <input type="submit" />
        </div>
      </Form>
      <Link to="/projects">Back to Projects</Link>
    </div>
  );
}
