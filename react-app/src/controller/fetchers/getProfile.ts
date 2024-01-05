import supabase from "../database";

export default async function getProfile() {
  const user = await supabase.auth.getUser();
  if (!user) {
    return [];
  }
  const id = user?.data?.user?.id ?? "";

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", id);
  if (error) {
    console.log(error);
    return [];
  }
  if (data) {
    return data[0] ?? null;
  }
}