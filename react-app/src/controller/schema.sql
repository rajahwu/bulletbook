-- Drop tables if they exist

-- Drop table tech_references if it exists
DROP TABLE IF EXISTS tech_references;

-- Drop table bullet_techs if it exists
DROP TABLE IF EXISTS bullet_techs;

-- Drop table projcet_bullets if it exists
DROP TABLE IF EXISTS projcet_bullets;

-- Drop table project_urls if it exists
DROP TABLE IF EXISTS project_urls;

-- Drop table project_images if it exists
DROP TABLE IF EXISTS project_images;

-- Drop table projects if it exists
DROP TABLE IF EXISTS projects;

-- Drop table technologies if it exists
DROP TABLE IF EXISTS technologies;

-- Drop table profiles if it exists
DROP TABLE IF EXISTS profiles;

-- Create the profiles table with UUID
CREATE TABLE profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR,
    email VARCHAR
);

-- Create the technologies table with UUID
CREATE TABLE technologies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR,
    icon VARCHAR,
    description TEXT,
    category VARCHAR
);

-- Create the tech_references table with UUID
CREATE TABLE tech_references (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    technology_id UUID REFERENCES technologies(id),
    title VARCHAR,
    url VARCHAR
);

-- Create the projects table with UUID
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    name VARCHAR,
    description TEXT
);

-- Create the project_images table with UUID
CREATE TABLE project_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    url VARCHAR
);

-- Create the project_urls table with UUID
CREATE TABLE project_urls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    live VARCHAR,
    github VARCHAR
);

-- Create the projcet_bullets table with UUID
CREATE TABLE projcet_bullets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    title VARCHAR,
    text VARCHAR
);

-- Create the bullet_techs table with UUID
CREATE TABLE bullet_techs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    bullet_id UUID REFERENCES projcet_bullets(id),
    tech_id UUID REFERENCES technologies(id)
);
