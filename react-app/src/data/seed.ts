// seed.ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

const supabaseUrl = "https://mncqloseevstasdpqcuh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uY3Fsb3NlZXZzdGFzZHBxY3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MjgyNjcsImV4cCI6MjAxNDEwNDI2N30.g2-qbOEk6GTcZD2XJmiBJpWrZDzFAOgQ58t-cMvXAKQ";

console.log(supabaseUrl, supabaseKey);

const supabase = createClient<Database>(
    supabaseUrl,
    supabaseKey
  );

export default supabase;

const userId = "7a540267-12e1-4274-9445-45ce2ebf5cac";

const projects = [
  {
    user_id: userId,
    name: "E-commerce Website",
    description: "A full-stack e-commerce website built with React and Node.js",
  },
  {
    user_id: userId,
    name: "Portfolio Website",
    description: "A full-stack portfolio website built with React and Node.js",
  },
  {
    user_id: userId,
    name: "Blog Website",
    description: "A full-stack blog website built with React and Node.js",
  },
];

for (const project of projects) {
  const { data, error } = await supabase.from("projects").insert(project).select('id');

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);

    const projectId = data[0].id; // Assuming the data is an array and we take the first item

    // Inserting sample bullets for each project
    const bullets = [
      {
        project_id: projectId,
        content: "Implemented product search functionality",
        category: "Development",
        action_verb: "Implemented",
        feature: "Product Search",
        benefit: "Improved user experience by allowing users to quickly find products.",
        technologies: [{ name: "React", version: "17" }, { name: "Node.js", version: "14" }],
      },
      {
        project_id: projectId,
        content: "Designed and developed responsive UI",
        category: "Design",
        action_verb: "Designed and Developed",
        feature: "Responsive UI",
        benefit: "Ensured seamless user experience across various devices.",
        technologies: [{ name: "CSS", version: "3" }, { name: "React", version: "17" }],
      },
      // Add more bullets as needed
    ];

    for (const bullet of bullets) {
      await supabase.from("bullets").insert(bullet);
    }

    // Inserting sample URLs for each project
    await supabase.from("project_urls").insert({ project_id: projectId, live: "https://www.google.com", github: "https://www.google.com" });

    // Inserting sample images for each project
    await supabase.from("project_images").insert({ project_id: projectId, url: "https://www.google.com", user_id: userId });
  }
}
