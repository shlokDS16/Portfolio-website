const DEFAULT_SKILLS = [
  "PYTHON",
  "SQL",
  "RAG",
  "LANGCHAIN",
  "PYTORCH",
  "YOLO",
  "FASTAPI",
  "NEXT.JS",
  "POWER BI",
  "TABLEAU",
  "n8n",
  "SUPABASE",
  "POSTGRESQL",
  "GROQ",
  "DOCKER",
  "PANDAS",
  "GEMINI",
  "QDRANT",
  "CFA / QUANT",
];

export function Ticker({ skills = DEFAULT_SKILLS }: { skills?: string[] }) {
  // Duplicate the sequence so the -50% marquee loops seamlessly.
  const doubled = [...skills, ...skills];
  return (
    <div className="tick">
      <div className="tick-in">
        {doubled.map((s, i) => (
          <span className="s" key={i}>
            {s}
            <i>/</i>
          </span>
        ))}
      </div>
    </div>
  );
}
