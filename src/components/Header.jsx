import Menu from "./Menu";
import { useState } from "react";
import { useUser } from "../context/UserContext";

function Header() {
  const { user, token, logout } = useUser();
  return (
    <header className="border-gray-100 p-4 text-2xl flex justify-between items-center static border-b-4 shadow-xl">
      <h1 className="font-bold">
        <img
          src="/header.png"
          className="h-16 md:h-30 row-span-1 transition-transform duration-300 hover:scale-110 hover:drop-shadow-md"
        />
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <a href="/">
            <img src="/profile.svg" className="w-7 hover:w-8 transition-all " />
          </a>
        )}
        <Menu />
      </div>
    </header>
  );
}

export default Header;
