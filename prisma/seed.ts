import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.profiles.update({
        where: {
            id: '0c9e6b6a-0163-4ee1-a1b7-5900b6f9362e'
        },
        data: {
            projects: {
                create: [
                    {
                        name: 'Project 1',
                        description: 'Description 1',
                        project_urls: { create: { live: 'https://www.live.com', github: 'https://www.github.com' } },
                        project_bullets: {
                            create: [
                                {
                                    action_verb: 'Implemented',
                                    content: 'Implemented project functionality',
                                    feature: 'Project Functionality',
                                    benefit: 'Improved user experience by adding essential features.',
                                    challenge: 'Faced challenges during implementation.',
                                    solution: 'Found effective solutions to overcome challenges.',
                                    result: 'Successfully implemented the project functionality.',
                                    learned: 'Learned valuable lessons during the process.',
                                    next: 'Planning for further improvements and enhancements.',
                                    bullet_techs: {
                                        create: [
                                            { tech_id: '9a49b8d4-21ef-4973-90a6-095278cb639e' },
                                            { tech_id: 'e5e37098-4c75-4410-94a8-42e2d81bbec4' },
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        name: 'Project 2',
                        description: 'Description 2',
                    }
                ]
            }
        }
    })
    console.log(user);
}

await main();
