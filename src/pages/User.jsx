import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import { useState } from "react";

function User() {
  const { username } = useParams();
  const [user, setUser] = useState({ username: "Emily", type: "actor" });

  return (
    <div>
      <p>{username}</p>
      <UserCard user={user} />
    </div>
  );
}

export default User;
