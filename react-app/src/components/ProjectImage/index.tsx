import { useState } from "react";
import { Form, useLocation } from "react-router-dom";

interface ProjectImage {
  id?: string;
  url: string;
}

export default function ProjectImage({
  image,
  projectId,
}: {
  image: ProjectImage;
  projectId: string;
}) {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  return (
    projectId && (
      <div className="flex" key={image.id}>
        <img
          src={`https://mncqloseevstasdpqcuh.supabase.co/storage/v1/object/public/project_images/${image.url}`}
          alt={image.url}
          className="w-1/4"
        />
        {!location.pathname.includes("edit") && (
          <button onClick={() => setShowForm(!showForm)}>show</button>
        )}
        <div className="flex flex-col justify-center">
          {location.pathname.includes("edit") ? (
            <>
              <div>
                <input
                  type="hidden"
                  name="imageId"
                  id="imageId"
                  value={image.id}
                />
                <input
                  type="hidden"
                  name="imageUrl"
                  id="imageUrl"
                  value={image.url}
                />
                <input type="file" name="newImage" id="newImage" />
                <button type="submit">Update</button>
              </div>
              <div>
                <input
                  type="hidden"
                  name="imageId"
                  id="imageId"
                  value={image.id}
                />
                <input
                  type="hidden"
                  name="imageUrl"
                  id="imageUrl"
                  value={image.url}
                />
                <button type="submit">Delete</button>
              </div>
            </>
          ) : (
            <div
              id="image_form"
              style={{ display: showForm ? "flex" : "none" }}
            >
              <Form
                method="PUT"
                className="flex flex-col"
                encType="multipart/form-data"
                action={`/projects/${projectId}/images/edit/${image.id}`}
              >
                <input
                  type="hidden"
                  name="imageId"
                  id="imageId"
                  value={image.id}
                />
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
                <input
                  type="hidden"
                  name="imageId"
                  id="imageId"
                  value={image.id}
                />
                <input
                  type="hidden"
                  name="imageUrl"
                  id="imageUrl"
                  value={image.url}
                />
                <button type="submit">Delete</button>
              </Form>
            </div>
          )}
        </div>
      </div>
    )
  );
}
