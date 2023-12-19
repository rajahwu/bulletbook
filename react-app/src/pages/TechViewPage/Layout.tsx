import { NavLink } from "react-router-dom";
import { type Technology } from "../../lib/technology.types.ts";

interface TechData {
  TECH_CATEGORIES: string[];
  TECHNOLOGIES: Technology[];
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

export default function TechViewLayout({
  technologies,
}: Readonly<{
  technologies: TechData;
}>) {

  return (
    <div className="flex">
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
            <div>
              <div>Project one</div>
              <div>
                <ul>
                  <li>Project one bullet one</li>
                  <li>Project one bullet two</li>
                  <li>Project one bullet three</li>
                </ul>
              </div>
            </div>

            <div>
              <div>Project two</div>
              <div>
                <ul>
                  <li>Project two bullet one</li>
                  <li>Project two bullet two</li>
                  <li>Project two bullet three</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
