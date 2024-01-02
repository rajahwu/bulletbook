import React from "react";
const TECH_CATEGORIES = ["database", "orm", "backend_framework", "frontend_library", "ui_ux", "data_management", "dev_team", "third_party_api"] as const;

type IconType = React.ComponentType | string;

interface ResourceURL {
    title: string
    url: string
}

interface Reference {
    title: string;
    url: string;
}


interface Technology {
    id?: string
    name: string
    icon: IconType
    description: string
    references: Reference[]
    category: typeof TECH_CATEGORIES[number];
    images?: ResourceURL[]
    keywords?: string[]
}

interface TechData {
    TECH_CATEGORIES: string[];
    TECHNOLOGIES: Technology[];
}

interface Deployment {
    name: string
    url: string
}

interface ProjectURLs {
    live: string
    github: string
}

interface ProjectImage {
    id: string
    url: string
}

interface Project {
    id?: string
    name: string
    images: ResourceURL[]
    project_urls: ProjectURLs[]
    project_images: ProjectImage[]
    description: string
    deployment?: Deployment
    project_bullets: Bullet[]
}

interface Bullet {
    id?: string
    title: string
    text: string
    category?: typeof TECH_CATEGORIES[number];
    technologies?: Technology[]
}

export type { Bullet, Deployment, IconType, Project, ProjectImage, ProjectURLs, Reference, ResourceURL, TechData, Technology };

    export { TECH_CATEGORIES };

