import { Form, Link, useNavigate, useParams } from "react-router-dom";

export default function DeleteProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      navigate(`/projects`);
  };
  return (
    <Form 
    method="DELETE" 
    className="flex flex-col" 
    // onSubmit={handleSubmit}
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
