import { useState, useRef, useEffect } from "react";

const SUBJECTS = [
  { id: "irrigation", name: "Irrigation Engineering", icon: "💧", color: "#00d4ff" },
  { id: "soil", name: "Soil Science", icon: "🌱", color: "#00ff88" },
  { id: "machinery", name: "Farm Machinery", icon: "⚙️", color: "#ff9632" },
  { id: "agronomy", name: "Agronomy", icon: "🌾", color: "#ffd700" },
  { id: "hydrology", name: "Hydrology", icon: "🌊", color: "#a855f7" },
  { id: "renewable", name: "Renewable Energy", icon: "☀️", color: "#ff5050" },
];

const EXAMS = [
  { id: "gate", name: "GATE AG", icon: "🎓", color: "#ff5050" },
  { id: "icar", name: "ICAR JRF", icon: "🔬", color: "#00d4ff" },
  { id: "opsc", name: "OPSC AAE", icon: "🏛️", color: "#00ff88" },
  { id: "asrb", name: "ASRB NET", icon: "🧪", color: "#a855f7" },
];

const QUICK_PROMPTS = [
  "Find GATE AG 2023 PYQ PDF",
  "Best YouTube videos for irrigation engineering",
  "ICAR JRF previous year papers free download",
  "Soil science formula sheet PDF",
  "Farm machinery NPTEL course",
  "OPSC AAE syllabus 2025",
  "Drip irrigation notes for GATE",
  "Hydrology MCQ practice set",
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020b18; font-family: 'Exo 2', sans-serif; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 4px; }

  @keyframes scanline { 0% { top: -2px; } 100% { top: 100vh; } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 10px rgba(0,212,255,0.3); } 50% { box-shadow: 0 0 30px rgba(0,212,255,0.7); } }
  @keyframes typing { from { width: 0; } to { width: 100%; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }

  .scanline { position: fixed; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(0,255,136,0.5), transparent); z-index: 9999; pointer-events: none; animation: scanline 6s linear infinite; }

  .nav-link { font-family: 'Orbitron', monospace; font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 8px 14px; border-radius: 4px; cursor: pointer; border: none; background: transparent; color: #4a7a99; transition: all 0.2s; }
  .nav-link:hover, .nav-link.active { color: #00d4ff; background: rgba(0,212,255,0.08); }

  .card { background: rgba(4,16,32,0.85); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; transition: all 0.3s; position: relative; overflow: hidden; }
  .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00d4ff, #00ff88, transparent); opacity: 0; transition: opacity 0.3s; }
  .card:hover { border-color: rgba(0,212,255,0.4); transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.1); }
  .card:hover::before { opacity: 1; }

  .btn-blue { font-family: 'Orbitron', monospace; font-size: 0.72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; border-radius: 4px; border: 1px solid #00d4ff; background: transparent; color: #00d4ff; cursor: pointer; transition: all 0.3s; }
  .btn-blue:hover { background: #00d4ff; color: #020b18; box-shadow: 0 0 30px rgba(0,212,255,0.5); }
  .btn-blue:disabled { opacity: 0.4; cursor: not-allowed; }

  .btn-green { font-family: 'Orbitron', monospace; font-size: 0.72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; border-radius: 4px; border: 1px solid #00ff88; background: transparent; color: #00ff88; cursor: pointer; transition: all 0.3s; }
  .btn-green:hover { background: #00ff88; color: #020b18; box-shadow: 0 0 30px rgba(0,255,136,0.5); }

  .subject-card { background: rgba(4,16,32,0.85); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; padding: 16px; cursor: pointer; transition: all 0.3s; }
  .subject-card:hover { transform: translateY(-4px); }

  .ai-message { animation: slideIn 0.4s ease; }

  .typing-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #00d4ff; margin: 0 2px; animation: blink 1s ease-in-out infinite; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  .resource-link { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 6px; background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.1); margin-bottom: 8px; text-decoration: none; cursor: pointer; transition: all 0.2s; }
  .resource-link:hover { background: rgba(0,212,255,0.12); border-color: rgba(0,212,255,0.35); transform: translateX(3px); }

  .badge { font-family: 'Share Tech Mono', monospace; font-size: 0.58rem; font-weight: 700; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; flex-shrink: 0; margin-top: 2px; }

  .progress-bar { height: 3px; border-radius: 2px; background: rgba(0,212,255,0.1); overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, #00d4ff, #00ff88); transition: width 1s ease; }

  .quick-prompt { font-family: 'Share Tech Mono', monospace; font-size: 0.68rem; padding: 6px 12px; border-radius: 4px; background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.15); color: #4a7a99; cursor: pointer; transition: all 0.2s; text-align: left; white-space: nowrap; }
  .quick-prompt:hover { background: rgba(0,212,255,0.15); color: #00d4ff; border-color: rgba(0,212,255,0.4); }

  .input-field { width: 100%; background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.2); border-radius: 6px; padding: 12px 16px; color: #e8f4ff; font-family: 'Exo 2', sans-serif; font-size: 0.88rem; outline: none; transition: all 0.2s; }
  .input-field:focus { border-color: rgba(0,212,255,0.5); box-shadow: 0 0 15px rgba(0,212,255,0.1); }
  .input-field::placeholder { color: #4a7a99; }

  .stat-num { font-family: 'Orbitron', monospace; font-weight: 900; }
  .mono { font-family: 'Share Tech Mono', monospace; }
  .orbitron { font-family: 'Orbitron', monospace; }
`;

function AIAgent() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: null,
      resources: [
        {
          type: "intro",
          text: "AGRIPREP AI AGENT ONLINE. I can find direct links to PDFs, YouTube videos, PYQs, notes, formula sheets and books for GATE AG, ICAR JRF, OPSC AAE and ASRB NET. What do you need?",
        },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const SYSTEM_PROMPT = `You are AgriPrep AI — an expert study assistant for B.Tech Agricultural Engineering students in India preparing for GATE Agriculture (GATE AG), ICAR JRF, OPSC AAE (Odisha), and ASRB NET exams.

Your ONLY job is to find and provide REAL, WORKING, FREE study resources. When a user asks for anything related to their exam preparation, you must respond with structured resources including:

1. Direct YouTube search links (format: https://www.youtube.com/results?search_query=EXACT+QUERY)
2. Real website links that are known to host free content:
   - https://agriexam.com (MCQs and PYQs)
   - https://nptel.ac.in (free courses)
   - https://ecoursesonline.iasri.res.in (ICAR free notes)
   - https://icar.org.in/content/previous-question-papers (official ICAR papers)
   - https://gate2026.iitg.ac.in (GATE official)
   - https://www.opsc.gov.in (OPSC official)
   - https://www.asrb.org.in (ASRB official)
   - https://www.agrimoon.com (free PDF books)
   - https://www.agriinfo.in (notes)
   - https://www.toppersexam.com (mock tests)
   - https://nijuktikhabar.in (Odisha job alerts)

ALWAYS respond in this EXACT JSON format (no markdown, no code blocks, just pure JSON):
{
  "summary": "Brief 1-2 sentence response about what you found",
  "resources": [
    {
      "title": "Resource title",
      "url": "https://actual-url.com",
      "type": "PYQ|Notes|Video|MCQ|Course|Syllabus|Book",
      "description": "What this resource contains"
    }
  ],
  "tip": "One quick study tip related to the query"
}

Rules:
- Always provide 4-8 resources minimum
- Mix different types (videos, notes, MCQs, official papers)
- Focus on FREE resources only
- For YouTube, create specific search query URLs
- Never make up URLs — use the known working sites listed above
- Always include at least one official source
- If asking about Odisha/OPSC, always include nijuktikhabar.in and opsc.gov.in`;

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userText }],
        }),
      });

      const data = await response.json();
      const rawText = data.content?.[0]?.text || "{}";

      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = {
          summary: rawText,
          resources: [],
          tip: "",
        };
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: parsed.summary, resources: parsed.resources, tip: parsed.tip },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Here are some reliable resources:",
          resources: [
            { title: "AgriExam — MCQs & PYQs", url: "https://agriexam.com", type: "MCQ", description: "Best free MCQ practice site for GATE AG and ICAR JRF" },
            { title: "ICAR Official Previous Papers", url: "https://icar.org.in/content/previous-question-papers", type: "PYQ", description: "Official ICAR JRF previous year question papers" },
            { title: "NPTEL Free Courses", url: "https://nptel.ac.in", type: "Course", description: "IIT professor lectures — Irrigation, Farm Machinery, Soil Science" },
            { title: "ICAR eCourses — Free Notes", url: "https://ecoursesonline.iasri.res.in", type: "Notes", description: "Official ICAR free study material for all subjects" },
          ],
          tip: "Practice 50 MCQs daily for consistent improvement.",
        },
      ]);
    }
    setLoading(false);
  };

  const TYPE_COLORS = {
    PYQ: { bg: "rgba(255,80,80,0.15)", color: "#ff5050" },
    Notes: { bg: "rgba(0,255,136,0.15)", color: "#00ff88" },
    Video: { bg: "rgba(255,200,0,0.15)", color: "#ffc800" },
    MCQ: { bg: "rgba(0,212,255,0.15)", color: "#00d4ff" },
    Course: { bg: "rgba(168,85,247,0.15)", color: "#a855f7" },
    Syllabus: { bg: "rgba(255,150,50,0.15)", color: "#ff9632" },
    Book: { bg: "rgba(0,255,136,0.12)", color: "#00ff88" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.map((msg, i) => (
          <div key={i} className="ai-message" style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
            {msg.role === "user" ? (
              <div style={{ maxWidth: "75%", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "8px 8px 2px 8px", padding: "10px 14px", color: "#e8f4ff", fontSize: "0.85rem" }}>
                {msg.content}
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                {/* AI label */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", animation: "blink 1.2s ease-in-out infinite", boxShadow: "0 0 8px #00ff88" }}/>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#00ff88", letterSpacing: 2 }}>AGRIPREP AI</span>
                </div>

                {/* Intro or summary */}
                {(msg.content || msg.resources?.[0]?.type === "intro") && (
                  <div style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 6, padding: "10px 14px", marginBottom: 10, fontSize: "0.83rem", color: "#95d5b2", lineHeight: 1.6 }}>
                    {msg.content || msg.resources?.[0]?.text}
                  </div>
                )}

                {/* Resources */}
                {msg.resources && msg.resources.filter(r => r.type !== "intro").map((res, j) => {
                  const tc = TYPE_COLORS[res.type] || { bg: "rgba(0,212,255,0.1)", color: "#00d4ff" };
                  return (
                    <a key={j} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 3 }}>
                          <span className="badge" style={{ background: tc.bg, color: tc.color }}>{res.type}</span>
                          <span style={{ fontWeight: 600, fontSize: "0.82rem", color: "#e8f4ff", lineHeight: 1.3 }}>{res.title}</span>
                        </div>
                        {res.description && <p style={{ fontSize: "0.73rem", color: "#4a7a99", lineHeight: 1.4, marginLeft: 46 }}>{res.description}</p>}
                      </div>
                      <span style={{ color: "#00d4ff", fontSize: "0.8rem", flexShrink: 0, marginTop: 2 }}>→</span>
                    </a>
                  );
                })}

                {/* Tip */}
                {msg.tip && (
                  <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.12)", borderRadius: 6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.75rem", flexShrink: 0 }}>⚡</span>
                    <span style={{ fontSize: "0.75rem", color: "#4a7a99", fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.5 }}>{msg.tip}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}/>
            <div style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 6, padding: "10px 16px", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "#00ff88", marginRight: 8 }}>SEARCHING</span>
              <span className="typing-dot"/>
              <span className="typing-dot"/>
              <span className="typing-dot"/>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Quick Prompts */}
      <div style={{ padding: "8px 16px", display: "flex", gap: 6, overflowX: "auto", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        {QUICK_PROMPTS.slice(0, 4).map((p, i) => (
          <button key={i} className="quick-prompt" onClick={() => sendMessage(p)}>{p}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(0,212,255,0.1)", display: "flex", gap: 10 }}>
        <input
          className="input-field"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !loading && sendMessage()}
          placeholder="Ask AI to find PYQs, videos, notes, formula sheets..."
          disabled={loading}
        />
        <button className="btn-blue" onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ flexShrink: 0, padding: "10px 16px" }}>
          {loading ? "..." : "SEND"}
        </button>
      </div>
    </div>
  );
}

function Dashboard({ setPage }) {
  return (
    <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
      {/* Welcome */}
      <div style={{ marginBottom: 28, animation: "fadeUp 0.6s ease both" }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#00ff88", letterSpacing: 3, marginBottom: 6 }}>// MISSION CONTROL</p>
        <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 900, color: "#e8f4ff", letterSpacing: 2, lineHeight: 1.1, marginBottom: 8 }}>
          WELCOME BACK,<br/><span style={{ color: "#00d4ff", textShadow: "0 0 30px rgba(0,212,255,0.5)" }}>ARINDAM</span>
        </h1>
        <p style={{ color: "#4a7a99", fontSize: "0.88rem" }}>GATE AG exam in <strong style={{ color: "#ff5050" }}>87 days</strong> — stay on mission 🎯</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 28, animation: "fadeUp 0.6s 0.1s ease both", opacity: 0, animationFillMode: "forwards" }}>
        {[
          { icon: "🔥", label: "Study Streak", value: "12", suffix: "days", color: "#ff5050" },
          { icon: "✏️", label: "MCQs Practiced", value: "680", color: "#00d4ff" },
          { icon: "📄", label: "PYQs Solved", value: "124", color: "#00ff88" },
          { icon: "📚", label: "Topics Done", value: "47", suffix: "/136", color: "#ffd700" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.6rem", fontWeight: 900, color: s.color, textShadow: `0 0 20px ${s.color}44`, lineHeight: 1 }}>
              {s.value}<span style={{ fontSize: "0.8rem", color: "#4a7a99" }}>{s.suffix}</span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "#4a7a99", marginTop: 4, fontFamily: "'Share Tech Mono', monospace", letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* AI Agent CTA */}
      <div onClick={() => setPage("ai")} style={{ cursor: "pointer", marginBottom: 24, padding: 20, background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,255,136,0.05))", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 10, animation: "fadeUp 0.6s 0.2s ease both", opacity: 0, animationFillMode: "forwards" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", animation: "blink 1.2s ease-in-out infinite", boxShadow: "0 0 10px #00ff88" }}/>
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.75rem", color: "#00ff88", letterSpacing: 2 }}>AI AGENT ONLINE</span>
        </div>
        <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1rem", color: "#e8f4ff", marginBottom: 4, letterSpacing: 1 }}>Ask AI to Find Your Resources</h3>
        <p style={{ fontSize: "0.8rem", color: "#4a7a99", lineHeight: 1.5 }}>Type anything — "Find GATE AG irrigation PYQ 2023" or "Best videos for farm machinery" — AI finds direct links instantly</p>
        <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Find PYQs", "Get Notes", "Find Videos", "Formula Sheets"].map(t => (
            <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", padding: "3px 8px", borderRadius: 3, background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div style={{ marginBottom: 24, animation: "fadeUp 0.6s 0.3s ease both", opacity: 0, animationFillMode: "forwards" }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#00d4ff", letterSpacing: 3, marginBottom: 12 }}>// SUBJECT MODULES</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {SUBJECTS.map(s => (
            <div key={s.id} className="subject-card" style={{ borderColor: s.color + "22" }} onClick={() => setPage("ai")}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 6, background: s.color + "15", border: `1px solid ${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{s.icon}</div>
                <span style={{ fontWeight: 600, fontSize: "0.78rem", color: "#e8f4ff", lineHeight: 1.3 }}>{s.name}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.random() * 60 + 10}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exams */}
      <div style={{ animation: "fadeUp 0.6s 0.4s ease both", opacity: 0, animationFillMode: "forwards" }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#00d4ff", letterSpacing: 3, marginBottom: 12 }}>// TARGET EXAMS</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {EXAMS.map(e => (
            <div key={e.id} className="card" style={{ padding: 14, borderColor: e.color + "22", cursor: "pointer" }} onClick={() => setPage("ai")}>
              <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{e.icon}</div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.82rem", fontWeight: 700, color: e.color, letterSpacing: 1 }}>{e.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Planner() {
  const [done, setDone] = useState(new Set([0, 1, 2]));
  const days = [
    { day: "MON", subject: "Irrigation Engineering", topic: "Drip Systems & Efficiency", hrs: "2h" },
    { day: "TUE", subject: "Soil Science", topic: "Physical Properties & AWC", hrs: "1.5h" },
    { day: "WED", subject: "Farm Machinery", topic: "Tractors & IC Engines", hrs: "2h" },
    { day: "THU", subject: "Hydrology", topic: "Precipitation Analysis", hrs: "2h", today: true },
    { day: "FRI", subject: "Agronomy", topic: "Kharif & Rabi Crops", hrs: "1.5h" },
    { day: "SAT", subject: "Renewable Energy", topic: "Solar Energy Systems", hrs: "1h" },
    { day: "SUN", subject: "Full Revision", topic: "Mock Test + PYQ Analysis", hrs: "3h" },
  ];
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#00ff88", letterSpacing: 3, marginBottom: 6 }}>// MISSION TIMELINE</p>
      <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.5rem", color: "#e8f4ff", marginBottom: 20, letterSpacing: 2 }}>WEEKLY BATTLE PLAN</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {days.map((d, i) => (
          <div key={i} className="card" style={{ padding: 14, borderColor: d.today ? "rgba(0,212,255,0.4)" : d.done ? "rgba(0,255,136,0.2)" : "rgba(0,212,255,0.1)", background: d.today ? "rgba(0,212,255,0.06)" : "rgba(4,16,32,0.85)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 6, background: done.has(i) ? "rgba(0,255,136,0.15)" : d.today ? "rgba(0,212,255,0.15)" : "rgba(0,212,255,0.06)", border: `1px solid ${done.has(i) ? "rgba(0,255,136,0.3)" : d.today ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Orbitron', monospace", fontSize: "0.55rem", fontWeight: 700, color: done.has(i) ? "#00ff88" : d.today ? "#00d4ff" : "#4a7a99", flexShrink: 0 }}>{d.day}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#e8f4ff" }}>{d.subject}</span>
                  {d.today && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", padding: "2px 6px", borderRadius: 3, background: "rgba(0,212,255,0.15)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)" }}>TODAY</span>}
                </div>
                <p style={{ fontSize: "0.75rem", color: "#4a7a99" }}>{d.topic} • {d.hrs}</p>
              </div>
              <button onClick={() => setDone(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })} style={{ padding: "6px 12px", borderRadius: 4, border: `1px solid ${done.has(i) ? "rgba(0,255,136,0.4)" : "rgba(0,212,255,0.2)"}`, background: done.has(i) ? "rgba(0,255,136,0.1)" : "transparent", color: done.has(i) ? "#00ff88" : "#4a7a99", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", letterSpacing: 1, flexShrink: 0 }}>
                {done.has(i) ? "DONE ✓" : "MARK"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Progress() {
  const subjects = [
    { name: "Irrigation Engineering", icon: "💧", pct: 45, color: "#00d4ff" },
    { name: "Soil Science", icon: "🌱", pct: 62, color: "#00ff88" },
    { name: "Farm Machinery", icon: "⚙️", pct: 28, color: "#ff9632" },
    { name: "Agronomy", icon: "🌾", pct: 55, color: "#ffd700" },
    { name: "Hydrology", icon: "🌊", pct: 15, color: "#a855f7" },
    { name: "Renewable Energy", icon: "☀️", pct: 20, color: "#ff5050" },
  ];
  const exams = [
    { name: "GATE AG", pct: 34, color: "#ff5050" },
    { name: "ICAR JRF", pct: 28, color: "#00d4ff" },
    { name: "OPSC AAE", pct: 19, color: "#00ff88" },
    { name: "ASRB NET", pct: 12, color: "#a855f7" },
  ];
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#00ff88", letterSpacing: 3, marginBottom: 6 }}>// MISSION STATUS</p>
      <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.5rem", color: "#e8f4ff", marginBottom: 20, letterSpacing: 2 }}>PROGRESS TRACKER</h2>

      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#00d4ff", letterSpacing: 2, marginBottom: 16 }}>SUBJECT COMPLETION</p>
        {subjects.map(s => (
          <div key={s.name} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.82rem", color: "#e8f4ff" }}>{s.icon} {s.name}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: s.color }}>{s.pct}%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}/></div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 20 }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "#00d4ff", letterSpacing: 2, marginBottom: 16 }}>EXAM READINESS</p>
        {exams.map(e => (
          <div key={e.name} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.82rem", color: "#e8f4ff" }}>{e.name}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: e.color }}>{e.pct}%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${e.pct}%`, background: `linear-gradient(90deg, ${e.color}, ${e.color}88)` }}/></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");

  const NAV = [
    { id: "dashboard", label: "HOME", icon: "🏠" },
    { id: "ai", label: "AI AGENT", icon: "🤖" },
    { id: "planner", label: "PLANNER", icon: "📅" },
    { id: "progress", label: "PROGRESS", icon: "📊" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: "#020b18", display: "flex", flexDirection: "column" }}>
        <div className="scanline"/>

        {/* Background */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)", backgroundSize: "50px 50px" }}/>
          <div style={{ position: "absolute", top: "20%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)" }}/>
          <div style={{ position: "absolute", bottom: "20%", right: "5%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.04), transparent 70%)" }}/>
        </div>

        {/* NAV */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(2,11,24,0.96)", borderBottom: "1px solid rgba(0,212,255,0.12)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 56, flexShrink: 0 }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1rem", fontWeight: 900, color: "#00d4ff", letterSpacing: 3, textShadow: "0 0 20px rgba(0,212,255,0.5)" }}>
            AGRI<span style={{ color: "#00ff88" }}>PREP</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {NAV.map(n => (
              <button key={n.id} className={`nav-link ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                <span style={{ display: "none" }}>{n.icon} </span>{n.label}
              </button>
            ))}
          </div>
        </nav>

        {/* CONTENT */}
        <div style={{ flex: 1, position: "relative", zIndex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {page === "dashboard" && <div style={{ flex: 1, overflowY: "auto" }}><Dashboard setPage={setPage}/></div>}
          {page === "ai" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,212,255,0.1)", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", animation: "blink 1.2s ease-in-out infinite", boxShadow: "0 0 10px #00ff88" }}/>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.72rem", color: "#00ff88", letterSpacing: 2 }}>AI RESOURCE AGENT</span>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#4a7a99", marginLeft: 4 }}>// powered by Claude AI</span>
                </div>
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}><AIAgent/></div>
            </div>
          )}
          {page === "planner" && <div style={{ flex: 1, overflowY: "auto" }}><Planner/></div>}
          {page === "progress" && <div style={{ flex: 1, overflowY: "auto" }}><Progress/></div>}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div style={{ position: "sticky", bottom: 0, background: "rgba(2,11,24,0.97)", borderTop: "1px solid rgba(0,212,255,0.12)", display: "flex", zIndex: 100 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ flex: 1, padding: "10px 4px 8px", border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, borderTop: page === n.id ? "2px solid #00d4ff" : "2px solid transparent" }}>
              <span style={{ fontSize: "1.1rem" }}>{n.icon}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.52rem", color: page === n.id ? "#00d4ff" : "#4a7a99", letterSpacing: 1 }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}