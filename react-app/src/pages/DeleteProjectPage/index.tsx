import { Form, Link, useParams } from "react-router-dom";

export default function DeleteProjectPage() {
  const { projectId } = useParams();


  return (
    <Form 
    method="DELETE" 
    className="flex flex-col" 
    >
      <fieldset>
        <legend>Are you sure you want to delete this project?</legend>
        <div>
          <input type="hidden" name="projectId" value={projectId} />
          <input type="submit" value="delete" />
          <Link to={`/projects/${projectId}`}>cancel</Link>
        </div>
      </fieldset>
    </Form>
  );
}
