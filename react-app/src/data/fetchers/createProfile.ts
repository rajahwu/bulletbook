import { v4 as uuidv4 } from "uuid";
import { Profile } from "../../lib/user.types";
import supabase from "../database";

export default async function createProfile(newProfileData) {
  const user = await supabase.auth.getUser();
  if (!user) {
    return [];
  }

  const username = newProfileData.get("username")?.toString() ?? null;
  const email = newProfileData.get("email")?.toString() ?? null;
  const avatar = newProfileData.get("avatar") ?? null;

  const userId = user?.data?.user?.id ?? "";

  const newProfile = {
    id: userId,
    username,
    email
  } as Profile;

  if (avatar instanceof File) {
    const avatarUrl = userId + "/" + uuidv4();

    const { data, error } = await supabase.storage
      .from("profiles")
      .upload(avatarUrl, avatar, { upsert: true });
    if (error) {
      console.log(error);
      return [];
    }
    if (data) {
      newProfile.avatar = avatarUrl;
    }
  }


  const { data, error } = await supabase
    .from("profiles")
    .insert(newProfile)
    .select();
  if (error) {
    console.log(error);
    return [];
  }
  if (data) {
    return data[0] ?? null;
  }
}