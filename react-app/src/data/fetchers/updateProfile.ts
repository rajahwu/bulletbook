import { Profile } from "../../lib/user.types";
import supabase from "../database";


export default async function updateProfile(newProfile: Profile) {
    const user = await supabase.auth.getUser();
    if (!user) {
      return [];
    }

  const { data, error } = await supabase
  .from("profiles")
  .update(newProfile)
  .eq("id",  user?.data?.user?.id ?? "")
  .select();
  if (error) {
    console.log(error);
    return [];
  }
  if (data) {
    return data[0] ?? null;
  }
}