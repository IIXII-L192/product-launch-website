import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): TimeLeft {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown({ target }: { target: number }) {
  const [t, setT] = useState<TimeLeft>(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [string, number][] = [
    ["DAYS", t.days],
    ["HRS", t.hours],
    ["MIN", t.minutes],
    ["SEC", t.seconds],
  ];

  return (
    <div className="flex items-stretch gap-3 sm:gap-5">
      {units.map(([label, value], i) => (
        <div key={label} className="flex items-stretch gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <span
              className="font-mono tabular-nums text-foreground leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 500 }}
            >
              {pad(value)}
            </span>
            <span className="mt-2 font-mono text-muted-foreground tracking-[0.35em] text-xs">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className="font-mono text-primary/40 leading-none self-start"
              style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
