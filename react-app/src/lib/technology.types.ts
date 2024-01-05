import React from "react";
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
    icon: IconType | string
    description: string
    references?: Reference[]
    category: string;
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
    project_id: string
    content: string
    category: string;
    action_verb: string
    feature: string
    benefit: string
    challenge?: string
    solution?: string
    result?: string
    learned?: string
    next?: string
    technologies?: Technology[]

}

export type { Bullet, Deployment, IconType, Project, ProjectImage, ProjectURLs, Reference, ResourceURL, TechData, Technology };
