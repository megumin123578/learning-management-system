"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 1) Chỉ bật hiển thị theo theme sau khi mounted để tránh mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // 2) Khi chưa mounted, giữ trạng thái trung lập giống SSR
  const isDark = mounted ? (resolvedTheme ?? theme) === "dark" : undefined;

  const onToggle = () => {
    const nextTheme: "light" | "dark" =
      isDark === true ? "light" : "dark"; // nếu undefined (chưa mounted) thì coi như đang light
    setTheme(nextTheme);
  };

  // Lớp nền & vị trí nút trượt:
  const trackClass =
    "relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full ring-1 ring-[hsl(var(--border))] transition-colors";
  const trackColor = isDark === true
    ? "bg-sidebar-ring"
    : "bg-neutral-200"; // trước khi mounted cũng dùng màu sáng trung lập

  const knobBase =
    "absolute left-1 top-1 inline-flex items-center justify-center h-6 w-6 rounded-full bg-white shadow-sm transition-transform will-change-transform";
  const knobPos =
    isDark === true ? "translate-x-6" : "translate-x-0"; // trước khi mounted: translate-x-0

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark === true ? true : undefined} // tránh khác biệt aria khi SSR
      aria-label="Toggle theme"
      onClick={onToggle}
      className={`${trackClass} ${trackColor}`}
    >
      <span className={`${knobBase} ${knobPos}`}>
        {mounted ? (
          isDark ? (
            <Moon className="h-4 w-4 text-gray-700" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-500" />
          )
        ) : null}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
