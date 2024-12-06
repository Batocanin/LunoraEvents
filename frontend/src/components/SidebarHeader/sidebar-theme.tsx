"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function SidebarTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme === "dark" ? (
        <Sun
          className="size-5 cursor-pointer"
          onClick={() => setTheme("light")}
        />
      ) : (
        <Moon
          className="size-5 cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
}

export default SidebarTheme;
