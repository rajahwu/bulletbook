import { Profile } from "../../lib/user.types";
import supabase from "../database";

export default async function createProfile(newProfile: Profile) {
    const user = await supabase.auth.getUser();
    if (!user) {
      return [];
    }
    newProfile.id =  user?.data?.user?.id ?? "";  
    console.log(newProfile);

  const { data, error } = await supabase
  .from("profiles")
  .insert(newProfile);
  if (error) {
    console.log(error);
    return [];
  }
  if (data) {
    return data[0] ?? null;
  }
}