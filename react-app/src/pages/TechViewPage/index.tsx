import { Link, NavLink, useLoaderData, useLocation } from "react-router-dom";
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
    <div className="flex flex-col">
      <NavLink to="/technologies/all">All</NavLink>
      <NavLink to={`/technologies/${category}`} className="text-teal-500">{category}</NavLink>
      {technologies.map((technology) => (
        <TechListItem technology={technology} key={technology.id} />
      ))}
    </div>
  );
};

const TechCard = () => {
  const location = useLocation();

  const currentCategory = location.pathname.split("/")[2];
  const currentTech = location.pathname.split("/")[3];

  const imageMap = currentTech ? TECH_IMAGE_MAP : TECH_CATEGORIE_IMAGE_MAP;

  const { technologies } = useLoaderData() as { technologies: TechData };

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
    <Link to={`/projects/${project.id}`}>Name: {project.name}</Link>
    {project.project_bullets.map((bullet: Bullet, i: number) => (
      <ul key={bullet.id}>
        <li className="flex">
          <p className="mr-2">{`Bullet ${String(i + 1)}:`}</p>
          <p>{bullet.content}</p>
        </li>
      </ul>
    ))}
  </div>
);

export default function Page() {
  const {  technologies, projects } = useLoaderData() as { technologies: TechData, projects: Project[]  };

  return (
    <TechViewLayout>
      <div id="techview-left" className="ml-2 mr-9">
        {technologies["TECH_CATEGORIES"]?.map(
          (techCategory: string) => {
            const techGroupArea = technologies["TECHNOLOGIES"].filter(
              (tech: Technology) => tech.category === techCategory
            );
            return (
              <TechGroupList
                technologies={techGroupArea}
                key={techCategory}
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
            {projects?.map((project) => (
              <ProjectListItem project={project} key={project.id} />
            ))}
          </div>
        </div>
      </div>
    </TechViewLayout>
  );
}
