import { getTechnologies } from "../../fetchers";

export default async function loader() {
   return getTechnologies();
}
