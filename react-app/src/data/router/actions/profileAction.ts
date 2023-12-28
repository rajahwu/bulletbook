
export default async function action({ request, params }) {
    switch (request.method) {
      case "POST": {
        const formData = await request.formData();
        const username = formData.get("username");
        const email = formData.get("email");
        console.log(username, email);
        return () => console.log("POST");
      }
      case "PUT": {
        console.log("PUT");
        return () => console.log("PUT" + params.id);
      }
      case "DELETE": {
        return () => console.log("DELETE " + params.id);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }
  