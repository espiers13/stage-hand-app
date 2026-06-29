import Menu from "./Menu";
import { useState } from "react";

function Header() {
  const [user, setUser] = useState({ username: "Emily", type: "actor" });

  return (
    <header className="border-gray-100 p-4 text-2xl flex justify-between items-center static border-b-4 shadow-xl">
      <a href="/">
        <h1 className="font-bold">Stage Hand</h1>
      </a>
      <div className="flex items-center gap-4">
        {user && (
          <a href={`/user/${user.username}`}>
            <img src="/profile.svg" className="w-7 hover:w-8 transition-all " />
          </a>
        )}
        <Menu />
      </div>
    </header>
  );
}

export default Header;
