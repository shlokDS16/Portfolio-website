import { Reveal } from "./Reveal";
import type { Patent } from "@/lib/types";

export function Patents({ patents }: { patents: Patent[] }) {
  return (
    <Reveal>
      {patents.map((p) => (
        <div className="pat" key={p.id}>
          <div className="pid">{p.application_number}</div>
          <div className="pt">{p.title}</div>
          <div className="px">{p.tags.join(" · ")}</div>
        </div>
      ))}
    </Reveal>
  );
}
