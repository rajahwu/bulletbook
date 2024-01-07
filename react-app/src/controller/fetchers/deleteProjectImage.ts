import supabase from "../database";
 
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
export default deleteProjectImage;