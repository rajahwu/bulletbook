import TechPageLayout from './Layout';

interface TechGroup {
    groupName: String,
    technologies: String[]
}

const TechCard = ({technology} : {technology: String}) => (
    <div>
        <p>{technology}</p>
    </div>
)

const TechGroupCard = ({technologies} : {technologies: String[]}) => (
    <div>
        {technologies.forEach(technology => (
            <TechCard techonology={technology} key={technology} />
        ))}
    </div>
)

export default function Page({techgroups} : {techGroups: TechGroup[]}) {
    return (
            <TechPageLayout>
                {techgroups.forEach(techGroupArea => {
                    <TechGroupCard technologies={techGroupArea.technologies} key={techGroupArea.groupName}/>
                })}
            </TechPageLayout>
    )
}