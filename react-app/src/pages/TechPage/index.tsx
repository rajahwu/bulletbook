import TechPageLayout from './Layout';
import { type Technology } from '../lib/techology.types.ts'
import { getTechnologies } from '../../data/technologies.ts'
import { Link, useLoaderData } from 'react-router-dom'

interface TechGroup {
    groupName: string,
    technologies: string[]
}

export async function loader() {
    const technologies = await getTechnologies()
    return { technologies }
}

const TechCard = ({technology} : {technology: Technology}) => (
    <div className="p-2">
        <p>{technology.name}</p>
    </div>
)

const TechGroupCard = ({technologies} : {technologies: Technology[]}) => {

    const category = technologies[0]?.category || "";
    return (
        <Link to={`/technologies/${category}`} className="p-5 m-2 outline-black bg-black text-white uppercase text-xl">
        <h2 className="text-teal-500">{category}</h2>
        {technologies.map(technology => {
            return <TechCard technology={technology} key={technology.name} />
        }
        )}
    </Link>
)
}

export default function Page({techgroups} : {techGroups: TechGroup[]}) {
    const { technologies } = useLoaderData()
    return (
            <TechPageLayout>
                {technologies["TECH_CATEGORIES"]?.map((techCategory, i) => {
        const techGroupArea = technologies["TECHNOLOGIES"].filter(
          (tech) => tech.category === techCategory
        );
        return (
          <TechGroupCard
            technologies={techGroupArea}
            key={techCategory} 
          />
        );
      })}
            </TechPageLayout>
    )
}