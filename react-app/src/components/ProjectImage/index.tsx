import { Form } from "react-router-dom";
import supabase from "../../data/database";

interface ProjectImage {
  id?: string;
  url: string;
}

const updateProjectImage = async ({
  newImage,
  url,
}: {
  newImage: File;
  url: string;
}) => {
  const { data, error } = await supabase.storage
    .from("project_images")
    .update(url, newImage, {
      cacheControl: "3600",
      upsert: true,
    });
  return { data, error };
};

const deleteProjectImage = async ({ url, id }: ProjectImage) => {
  console.log({ url, id });
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
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }
  return { data, error };
};

const handleDelete = async (projectImage: ProjectImage) => {
  const res = await deleteProjectImage(projectImage);
  console.log("delete", res);
};

export default function ProjectImage({
  image,
  projectId,
}: {
  image: ProjectImage;
  projectId: string;
}) {
  return (
    projectId && (
      <div className="flex" key={image.id}>
        <img
          src={`https://mncqloseevstasdpqcuh.supabase.co/storage/v1/object/public/project_images/${image.url}`}
          alt={image.url}
          className="w-1/4"
        />
        <div className="flex flex-col justify-center">
          <Form
            method="PUT"
            className="flex flex-col"
            encType="multipart/form-data"
            action={`/projects/${projectId}/images/edit/${image.id}`}
          >
            <input type="hidden" name="imageId" id="imageId" value={image.id} />
            <input
              type="hidden"
              name="imageUrl"
              id="imageUrl"
              value={image.url}
            />
            <input type="file" name="newImage" id="newImage" />
            <button type="submit">Update</button>
          </Form>
          <Form
            method="DELETE"
            className="flex flex-col"
            action={`/projects/${projectId}/images/delete/${image.id}`}
          >
            <input type="hidden" name="imageId" id="imageId" value={image.id} />
            <input
              type="hidden"
              name="imageUrl"
              id="imageUrl"
              value={image.url}
            />
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    )
  );
}