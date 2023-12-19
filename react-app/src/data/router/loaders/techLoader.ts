import { getTechnologies } from "../../../data/technologies";

export async function loader() {
    const technologies = await getTechnologies();
    return { technologies };
  }