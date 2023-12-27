import { Link, useLoaderData } from "react-router-dom";
import { getTechnologies } from "../../data/technologies.ts";
import { type Technology } from "../../lib/technology.types.ts";
import TechPageLayout from "./Layout";

interface TechData {
  TECH_CATEGORIES: string[];
  TECHNOLOGIES: Technology[];
}

export async function loader() {
  const technologies = await getTechnologies();
  return { technologies };
}

const TechCard = ({ technology }: { technology: Technology }) => (
  <div className="p-2">
    <p>{technology.name}</p>
  </div>
);

const TechGroupCard = ({ technologies }: { technologies: Technology[] }) => {
  const category = technologies[0]?.category || "";
  return (
    <Link
      to={`/technologies/${category}`}
      className="p-5 m-2 text-xl text-white uppercase bg-black outline-black"
    >
      <h2 className="text-teal-500">{category}</h2>
      {technologies.map((technology) => {
        return <TechCard technology={technology} key={technology.name} />;
      })}
    </Link>
  );
};

export default function Page() {
  const { technologies } = useLoaderData() as { technologies: TechData };
  // console.log(technologies)
  return (
    <TechPageLayout>
      {technologies["TECH_CATEGORIES"]?.map(
        (techCategory: string, i: number) => {
          const techGroupArea = technologies["TECHNOLOGIES"].filter(
            (tech: Technology) => tech.category === techCategory
          );
          return (
            <TechGroupCard
              technologies={techGroupArea}
              key={techCategory[i] + i}
            />
          );
        }
      )}
    </TechPageLayout>
  );
}
