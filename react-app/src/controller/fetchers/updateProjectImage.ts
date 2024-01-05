import supabase from "../database";

  const updateProjectImage = async (formData: FormData) => {
    console.log(formData);
    const url = formData.get("imageUrl")?.toString() ?? "";
    const newImage = formData.get("image") as File

    console.log("updateProjectImage", url, newImage);
    
    const { data, error } = await supabase.storage
      .from("project_images")
      .update(url, newImage, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) {
      console.log(error);
      return [];
    }
    if (data) {
      console.log("data update project image", data);
      return data ?? null;
    }
  };

export default updateProjectImage ;
