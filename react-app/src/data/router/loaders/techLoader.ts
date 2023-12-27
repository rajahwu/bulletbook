import { getTechnologies } from "../../technologies";

export async function loader() {
  const technologies = await getTechnologies();
  return { technologies };
}