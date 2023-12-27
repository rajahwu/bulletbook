import { NavLink, useLoaderData, useLocation } from "react-router-dom";
import { getProjects } from "../../data/projects.ts";
import {
  TECH_CATEGORIE_IMAGE_MAP,
  TECH_IMAGE_MAP,
} from "../../data/techImageMap.ts";
import { Bullet, Project, Technology } from "../../lib/technology.types.ts";
import TechViewLayout from "./Layout.tsx";

interface TechData {
  TECH_CATEGORIES: string[];
  TECHNOLOGIES: Technology[];
}

// interface ProjectData {
//   projects: Project[];
//   technologies: TechData;
// }

const TechListItem = ({ technology }: { technology: Technology }) => (
  <div>
    <NavLink to={`/technologies/${technology.category}/${technology.name}`}>
      {technology.name}
    </NavLink>
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

const TechCard = () => {
  const location = useLocation();

  const currentCategory = location.pathname.split("/")[2];
  const currentTech = location.pathname.split("/")[3];

  const imageMap = currentTech ? TECH_IMAGE_MAP : TECH_CATEGORIE_IMAGE_MAP;

  const { technologies } = useLoaderData() as { technologies: TechData };
  // console.log(technologies);

  const [tech] = currentTech
    ? technologies["TECHNOLOGIES"].filter(
        (tech: Technology) => tech.name === currentTech
      )
    : [];

  return (
    <div id="tech-brief" className="flex flex-col p-5 border">
      <div className="flex">
        <h2>{tech?.name}</h2>
        <p>{tech?.category}</p>
      </div>
      <div className="flex">
        <img
          src={
            (currentTech
              ? imageMap[currentTech as keyof typeof imageMap]
              : imageMap[currentCategory as keyof typeof imageMap]) || ""
          }
        />
        <div>{tech?.description}</div>
      </div>
    </div>
  );
};

const ProjectListItem = ({ project }: { project: Project }) => (
  <div className="p-3 m-2">
    <p>Name: {project.name}</p>
    {project.bullets.map((bullet: Bullet, i: number) => (
      <ul key={i}>
        <li>
          <p>{bullet.title}</p>
          <p>{bullet.text}</p>
        </li>
      </ul>
    ))}
  </div>
);

export default function Page() {
  const { technologies } = useLoaderData() as { technologies: TechData };
  const projects = getProjects();

  return (
    <TechViewLayout>
      <div id="techview-left" className="ml-2 mr-9">
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
        <TechCard />

        <div id="tech-projects">
          <h2>Projects</h2>
          <div id="projects" className="p-5 m-2 border">
            {projects["PROJECTS"]?.map((project) => (
              <ProjectListItem project={project} key={project.name} />
            ))}
          </div>
        </div>
      </div>
    </TechViewLayout>
  );
}
