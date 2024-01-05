import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { getTechnologies } from "../../controller/fetchers";
import { TechData } from "../../lib/technology.types";

export default function AddProjectBulletPage() {
  const [technologies, setTechnologies] = useState<TechData>({
    TECH_CATEGORIES: [],
    TECHNOLOGIES: [],
  });

  useEffect(() => {
    getTechnologies().then((technologies) => {
      setTechnologies(
        technologies ?? { TECH_CATEGORIES: [], TECHNOLOGIES: [] }
      );
    });
  }, []);

  const { projectId } = useParams<{ projectId: string }>();
  const categories = technologies.TECH_CATEGORIES;
  const techs = technologies.TECHNOLOGIES;
  // const submit = useSubmit();

  return (
    <div>
      <h1>Add Project Bullets</h1>
      <Form method="POST">
        <input type="hidden" name="project_id" value={projectId} />
        <div>
          <label htmlFor="actionVerb">Powerful Action Verb</label>
          <input type="text" id="actionVerb" name="action_verb" />
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
          <textarea id="challenge" name="challenge"></textarea>
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
          <textarea id="result" name="result"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="learned">
            What did you learn from this experience?{" "}
          </label>
          <textarea id="learned" name="learned"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="next">
            What is the next step for this feature/application?{" "}
          </label>
          <textarea id="next" name="next"></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="projectBullet">Final Bullet</label>
          <textarea id="projectBullet" name="content"></textarea>
        </div>
        <h4>Technologies</h4>
        <div className="flex">
          {categories.map((category) => (
            <div key={category} className="p-2 border m-2">
              <h3>{category}</h3>
              {techs
                .filter((tech) => tech.category === category)
                .map((tech) => (
                  <div key={tech.id} className="m-2">
                    <input
                      type="checkbox"
                      name={`tech-${tech.id}`}
                      value={tech.id}
                      id={`techs-${tech.id}`}
                    />
                    <label htmlFor={`tech-${tech.id}`}>{tech.name}</label>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div>
          <input type="submit" />
        </div>
      </Form>
    </div>
  );
}
