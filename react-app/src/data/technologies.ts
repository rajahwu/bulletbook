import { Technology, TECH_CATEGORIES } from "../lib/technology.types.ts"

const databases = [
    {
        name: "PostgreSQL",
        icon: "postgres",
        description: "PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.",
        references: [{ title: "home", url: "https://www.postgresql.org/" }],
        category: "database"
    },
    {
        name: "SQLite3",
        icon: "sqlite",
        description: "SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. SQLite is the most used database engine in the world. SQLite is built into all mobile phones and most computers and comes bundled inside countless other applications that people use every day.",
        references: [{ title: "home", url: "https://www.sqlite.org/index.html" }],
        category: "database"
    },
]

const orms = [
    {
        name: "Sequelize",
        icon: "sequelize",
        description: "Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.",
        references: [{ title: "home", url: "https://sequelize.org/" }],
        category: "orm"
    },
]

const backend_frameworks = [
    {
        name: "Node",
        icon: "node",
        description: "As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.",
        references: [{ title: "home", url: "https://nodejs.org/en/about" }],
        category: "backend_framework"
    },
]

const ui_ux = [
    {
        name: "HTML",
        icon: "html",
        description: "HTML (HyperText Markup Language) is the code that is used to structure a web page and its content. For example, content could be structured within a set of paragraphs, a list of bulleted points, or using images and data tables. As the title suggests, this article will give you a basic understanding of HTML and its functions.",
        references: [{ title: "home", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" }],
        category: "ui_ux"
    },

]

const frontend_libraries = [
    {
        name: "React",
        icon: "react",
        description: "React.js, or simply React, is a JavaScript library for building user interfaces, particularly for single-page applications where the content is updated frequently. It was developed and is maintained by Facebook. React allows developers to create reusable UI components and manage the state of an application efficiently.",
        references: [{ title: "home", url: "https://react.dev/" }],
        category: "frontend_library"
    }, 
]

const data_management = [
    {
        name: "AWS S3",
        icon: "aws",
        description: " Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance.",
        references: [{ title: "home", url: "https://aws.amazon.com/pm/serv-s3/?gclid=CjwKCAiA1fqrBhA1EiwAMU5m_22P_Gb-nRtMasSzbF2mKsl2oDXgl_W3AD3zh2p1fSx10-cyR5_reRoCU-AQAvD_BwE&trk=fecf68c9-3874-4ae2-a7ed-72b6d19c8034&sc_channel=ps&ef_id=CjwKCAiA1fqrBhA1EiwAMU5m_22P_Gb-nRtMasSzbF2mKsl2oDXgl_W3AD3zh2p1fSx10-cyR5_reRoCU-AQAvD_BwE:G:s&s_kwcid=AL!4422!3!536452728638!e!!g!!aws%20s3!11204620052!112938567994" }],
        category: "data_management"
    }, 
]

const third_party_apis = [
    {
        name: "Google Maps",
        icon: "google_maps",
        description: "Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance.",
        references: [{ title: "home", url: "https://developers.google.com/maps" }],
        category: "third_party_api"
    }, 
]

const dev_team = [
    {
        name: "Git Feature Branch",
        icon: "git",
        description: "A feature branch is a temporary branch used for development or testing purposes",
        references: [{ title: "home", url: "https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow "}],
        category: "dev_team"
    }, 
]

const TECHNOLOGIES = [
    ...databases,
    ...orms,
    ...backend_frameworks,
    ...ui_ux,
    ...frontend_libraries,
    ...data_management,
    ...third_party_apis,
    ...dev_team
] as Technology[];

const getTechnologies = () => {return {
    TECHNOLOGIES,
    TECH_CATEGORIES
}};

export { TECHNOLOGIES, getTechnologies }