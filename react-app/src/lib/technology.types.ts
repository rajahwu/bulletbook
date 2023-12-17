import React from "react"

type IconType = React.ComponentType | string;
type URL = string;

const TECH_CATEGORIES = [ "database", "orm", "backend_framework", "frontend_library", "ui_ux", "data_management", "dev_team", "third_party_api"] as const;

export interface Technology {
    id?: string
    name: string
    icon: IconType
    description: string
    references: URL[]
    category: typeof TECH_CATEGORIES[number]; 
    images?: URL[]
    keywords?: string[]
}

export { TECH_CATEGORIES }