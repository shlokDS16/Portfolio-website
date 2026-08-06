"use client";

import { useEffect, useState } from "react";

export function Clock({ prefix = "" }: { prefix?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tnum" suppressHydrationWarning>
      {prefix}
      {time ?? "--:--:--"}
    </span>
  );
}
