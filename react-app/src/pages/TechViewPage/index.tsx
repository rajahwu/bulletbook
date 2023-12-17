// import { Link, useLoaderData } from 'react-router-dom';
// import { type Technology } from '../lib/technology.types.ts'
import { getTechnologies } from '../../data/technologies.ts'
// import { Link, useLoaderData } from 'react-router-dom'


export async function loader() {
    const technologies = await getTechnologies()
    return { technologies }
}

export default function Page() {
    // const { technologies } = useLoaderData()
    // console.log(technologies)
    return (
        <div>
            <div>
                <ul>
                    <li>tech group 1</li>
                    <li>tech group 2</li>
                    <li>tech group 1</li>
                    <li>tech group 1</li>
                </ul>
            </div>
            <div>
                <p>Selected Tech Briefing</p>
            </div>
        </div>
    )
}