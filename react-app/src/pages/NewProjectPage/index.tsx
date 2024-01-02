import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Project } from "../../lib/technology.types";

export default function NewProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const projects = useLoaderData() as Project[];

  const project = projects.find((project) => project.id === projectId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // projectId ? navigate(`/projects/${projectId}`) : navigate(`/projects`);
  };

  return (
    <div className="m-5">
      <h1>{projectId ? "Edit Project" : "New Project"} Page</h1>
      <Form
        method={projectId ? "PUT" : "POST"}
        className="flex flex-col"
        encType="multipart/form-data"
        // onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          name="projectId"
          id="projectId"
          value={projectId}
        />
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
        <hr />
        <fieldset>
          <legend>Project Links</legend>
          <div>
            <input
              placeholder="Live Link"
              type="text"
              name="live"
              id="live"
              defaultValue={
                project?.project_urls[0]?.live
                  ? project?.project_urls[0]?.live
                  : ""
              }
            />
          </div>
          <div>
            <input
              placeholder="Github Link"
              type="text"
              name="github"
              id="github"
              defaultValue={
                project?.project_urls[0]?.github
                  ? project?.project_urls[0]?.github
                  : ""
              }
            />
          </div>
        </fieldset>
        <hr />
        <fieldset>
          <legend>Project Images</legend>
          <div>
            <input type="file" name="image" id="images" />
          </div>
        </fieldset>
        <hr />
        <div>
          <input type="submit" />
        </div>
      </Form>
      <Link to="/projects">Back to Projects</Link>
    </div>
  );
}
