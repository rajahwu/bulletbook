import { getProfile } from "../../fetchers";

export default async function loader() {
    return getProfile();
}
