'use client'
import React from "react";
import AuthButton from "./AuthButton";
import DeployButton from "./DeployButton";
import MenuButton from "./MenuButton";
import HamburgerMenu from "./hambuger";


export default function Navbar() {

  return (
    <nav className="w-full flex justify-center h-16 bg-transparent">
      <div className="w-full flex justify-around items-center p-10 text-sm">
        <DeployButton />
        <MenuButton />
        <AuthButton />
        <HamburgerMenu/>
      </div>
    </nav>
  );
}
