export default function updateProject(formData: FormData) {
  return fetch("/api/project", {
    method: "PUT",
    body: formData,
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Error updating project");
    }
  });
}