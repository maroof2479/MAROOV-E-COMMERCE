
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/components/admin/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle
      aria-label="Toggle theme"
      className="border-0"
      pressed={theme === "dark"}
      onPressedChange={() => toggleTheme()}
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Toggle>
  );
}
