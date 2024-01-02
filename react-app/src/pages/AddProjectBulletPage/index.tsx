import { Form, useParams } from "react-router-dom";

export default function AddProjectBulletPage() {
    const { projectId } = useParams<{projectId: string}>()
  return (
    <div>
      <h1>Add Project Bullets</h1>
      <Form>
        <input type="hidden" name="projectId" value={projectId} />
        <div>
          <label htmlFor="actionVerb">Powerful Action Verb</label>
          <input type="text" id="actionVerb" name="actionVerb" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="feature">
            What specific (user facing or tech) feature did you implement?
          </label>
          <textarea id="feature" name="feature"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="technologies">
            Which specific technologies did you utilize to implement this
            feature (demonstrate inside knowledge, give an example)?
          </label>
          <textarea id="technologies" name="technologies"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="benefit">
            Why specifically did these technologies benefit the implemented
            feature/application as a whole (user experience, future developers,
            or scalability) ?{" "}
          </label>
          <textarea id="benefit" name="benefit"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="challenge">
            What was the biggest challenge you faced while implementing this
            feature?{" "}
          </label>
          <textarea id="challenge" name="challenge">
            {" "}
          </textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="solution">
            How did you overcome this challenge?{" "}
          </label>
          <textarea id="solution" name="solution"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="result">
            What was the result of your implementation?{" "}
          </label>
          <textarea id="result" name="result">
            {" "}
          </textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="learned">
            What did you learn from this experience?{" "}
          </label>
          <textarea id="learned" name="learned">
            {" "}
          </textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="next">
            What is the next step for this feature/application?{" "}
          </label>
          <textarea id="next" name="next">
            {" "}
          </textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="projectBullet">Final Bullet</label>
          <textarea id="projectBullet" name="projectBullet"></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  );
}
