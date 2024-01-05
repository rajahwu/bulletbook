import { Form, Link, useLoaderData, useParams } from "react-router-dom";
import { ProjectImage } from "../../components";
import { Project } from "../../lib/technology.types";

export default function NewProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const projects = useLoaderData() as Project[];

  const project = projects.find((project) => project.id === projectId);

  return (
    <div className="m-5">
      <h1>{projectId ? "Edit Project" : "New Project"} Page</h1>
      <Form
        method={projectId ? "PUT" : "POST"}
        className="flex flex-col"
        encType="multipart/form-data"
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
          {project && project.project_images.length > 0 && (
            <div className="">
              <h4>Images</h4>
              <div className="flex">
                {project?.project_images.map((image) => (
                  <ProjectImage
                    key={image.id}
                    image={image}
                    projectId={project?.id ?? ""}
                  />
                ))}
              </div>
            </div>
          )}
          <div>
            <label htmlFor="images">Add Images</label>
            <input type="file" name="image" id="images" />
          </div>
        </fieldset>
        <hr />
        <Link to={`/bullets/${project?.id}/add`}>Add Project Bullets</Link>
        <hr />
        <div>
          <input type="submit" />
        </div>
      </Form>
      <Link to="/projects">Back to Projects</Link>
    </div>
  );
}
