"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const rawDate = now
    ? now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })
    : "";
  const date = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  return (
    <div className="topbar">
      <span className="topbar-time">{time}</span>
      <div className="topbar-right">
        <span className="topbar-date">{date}</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
