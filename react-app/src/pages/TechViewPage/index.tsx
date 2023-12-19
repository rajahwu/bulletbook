import { NavLink, useLoaderData } from "react-router-dom";
import { type Technology } from "../../lib/technology.types.ts";
import TechViewLayout from "./Layout.tsx";

import { getProjects } from "../../data/projects.ts";

interface TechData {
  TECH_CATEGORIES: string[];
  TECHNOLOGIES: Technology[];
}

interface ProjectData {
  projects: Project[];
  technologies: TechData;
}

const TechListItem = ({ technology }: { technology: Technology }) => (
  <div>
    <p>{technology.name}</p>
  </div>
);

const TechGroupList = ({ technologies }: { technologies: Technology[] }) => {
  const category = technologies[0]?.category || "";

  return (
    <NavLink to={`/technologies/${category}`}>
      <h2 className="text-teal-500">{category}</h2>
      {technologies.map((technology) => (
        <TechListItem technology={technology} key={technology.name} />
      ))}
    </NavLink>
  );
};

const ProjectListItem = ({ project }: { project: Project }) => (
  <div>
    <p>{project.name}</p>
    {project.bullets.map((bullet) => (
      <ul>
        <li>{bullet.title}</li>
        <li>{bullet.text}</li>
      </ul>
    ))}
  </div>
);

export default function Page() {
  const { technologies } = useLoaderData() as { technologies: TechData };
  const projects = getProjects();

  console.log(projects);

  return (
    <TechViewLayout>
      <div id="techview-left">
        {technologies["TECH_CATEGORIES"]?.map(
          (techCategory: string, i: number) => {
            const techGroupArea = technologies["TECHNOLOGIES"].filter(
              (tech: Technology) => tech.category === techCategory
            );
            return (
              <TechGroupList
                technologies={techGroupArea}
                key={techCategory[i] + i}
              />
            );
          }
        )}
      </div>

      <div id="techview-right">
        <div id="tech-brief" className="flex">
          <div>Tech Image</div>
          <div>Tech Brief</div>
        </div>

        <div id="tech-projects">
          <h2>Projects</h2>
          <div id="projects">
            {projects["PROJECTS"]?.map((project) => (
              <ProjectListItem project={project} key={project.name} />
            ))}
          </div>
        </div>
      </div>
    </TechViewLayout>
  );
}
