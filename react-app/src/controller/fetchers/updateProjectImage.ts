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
  
  const deleteProjectImage = async (formData: FormData) => {
    const url = formData.get("imageUrl")?.toString() ?? ""; 
    const imageId = formData.get("imageId")?.toString() ?? "";   
    const { data, error } = await supabase.storage
      .from("project_images")
      .remove([url]);
    if (error) {
      console.log(error);
    }
  
    if (data) {
      const { data, error } = await supabase
        .from("project_images")
        .delete()
        .eq("id", imageId)
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data[0]);
        return data[0] ?? null;
      }
    }
  };

export { deleteProjectImage, updateProjectImage };
