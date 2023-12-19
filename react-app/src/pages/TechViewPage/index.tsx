import { useLoaderData } from "react-router-dom";
import TechViewLayout from "./Layout.tsx";

interface TechData {
  TECH_CATEGORIES: string[];
  TECHNOLOGIES: Technology[];
}

export default function Page() {
  const { technologies } = useLoaderData() as { technologies: TechData };

  return <TechViewLayout technologies={ technologies }></TechViewLayout>;
}
