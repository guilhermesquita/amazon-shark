import Link from "next/link";
import { useState, useRef, useEffect, MouseEvent } from "react";
import { MdOutlineVerified } from "react-icons/md";

type DropdownMenuProps = {
  onLogout: (event: MouseEvent<HTMLButtonElement>) => void;
  userName: string;
  verified: boolean;
};

export default function DropdownMenu({
  onLogout,
  userName,
  verified,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover flex items-center gap-2"
        onClick={handleToggle}
      >
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
          {userName[0].toUpperCase()}
        </div>
        <div className="flex gap-1">
          <span>{userName}</span>
          {verified && <MdOutlineVerified size={"20px"} color="#4db7ff" />}
        </div>
      </button>
      {isOpen && (
        <div className="absolute animate-slide-down bg-white right-0 mt-2 w-48 border rounded-md shadow-lg fadeInDown"
        style={{
          zIndex: 1
        }}>
          <Link
            href="/dashboard"
            className="block text-left py-2 px-4 hover:bg-gray-400 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/chat"
            className="block text-left py-2 px-4 hover:bg-gray-400 rounded"
          >
            Conversas
          </Link>
          <button
            className="w-full text-left py-2 px-4 hover:bg-gray-400 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
