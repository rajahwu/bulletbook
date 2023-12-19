import React from "react";
export { };

declare global {

    const TECH_CATEGORIES = ["database", "orm", "backend_framework", "frontend_library", "ui_ux", "data_management", "dev_team", "third_party_api"] as const;

    type IconType = React.ComponentType | string;

    interface ResourceURL {
        title: string
        url: string
    }

    interface Technology {
        id?: string
        name: string
        icon: IconType
        description: string
        references: URL[]
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

    interface Project {
        id?: string
        name: string
        images: ResourceURL[]
        urls: {
            live: string
            github: string
        }
        description: string
        deployment?: Deployment
        bullets: Bullet[]
    }

    interface Bullet { 
        title: string
        text: string
        category: typeof TECH_CATEGORIES[number];
        technologies: Technology[]
    }

}