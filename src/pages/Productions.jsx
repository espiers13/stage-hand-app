import { useUser } from "../context/UserContext";

function Productions() {
  const { user, token, logout } = useUser();
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12">
      <h1 className="font-bold text-xl">My Productions</h1>
      <h1 className="font-bold text-xl">Create new production</h1>
    </div>
  );
}

export default Productions;
