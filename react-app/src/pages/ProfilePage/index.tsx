export default function ProfilePage() {
  return (
    <form className="flex flex-col">
      <div>
        <label htmlFor="username">username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
      </div>
      <input type="submit" />
    </form>
  );
}
