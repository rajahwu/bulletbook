import { Form } from "react-router-dom";

export default function ProfilePage() {
  return (
    <div className="m-5">
      <h1>Profile Page</h1>
      <Form method="PUT" className="flex flex-col">
        <div>
          <input
            placeholder="username"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          <input placeholder="email" type="email" name="email" id="email" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </Form>
    </div>
  );
}
