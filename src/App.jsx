import { useState, useRef, useEffect } from "react";

const OWNER = {
  name: "Arindam",
  fullName: "Arindam",
  role: "B.Tech Agricultural Engineering",
  college: "Agricultural Engineering Student",
  github: "https://github.com/Arindam5294",
  mission: "Making GATE AG & ICAR JRF prep free for every Agri student in India 🌾",
};

const SUBJECTS = [
  { id: "irrigation", name: "Irrigation Engineering", icon: "💧", color: "#00d4ff", topics: [
    { id: "ir-1", name: "Soil-Water-Plant Relationships" },
    { id: "ir-2", name: "Water Requirements of Crops" },
    { id: "ir-3", name: "Irrigation Methods & Efficiencies" },
    { id: "ir-4", name: "Drip & Sprinkler Irrigation" },
    { id: "ir-5", name: "Canal Irrigation Systems" },
    { id: "ir-6", name: "Groundwater & Well Design" },
    { id: "ir-7", name: "Pump Selection & Design" },
    { id: "ir-8", name: "Drainage Engineering" },
  ], links: [
    { title: "NPTEL — Irrigation Engineering Full Course", url: "https://nptel.ac.in/courses/105/104/105104096/", type: "Course" },
    { title: "ICAR eCourse — Water Requirements of Crops", url: "https://ecoursesonline.iasri.res.in/mod/page/view.php?id=125222", type: "Notes" },
    { title: "Irrigation Engineering MCQs — AgriExam", url: "https://agriexam.com/irrigation-engineering-mcq/", type: "MCQ" },
    { title: "NPTEL — Soil & Water Conservation", url: "https://nptel.ac.in/courses/105/104/105104098/", type: "Course" },
    { title: "Drip & Sprinkler Irrigation — YouTube", url: "https://www.youtube.com/results?search_query=drip+irrigation+sprinkler+GATE+agriculture", type: "Video" },
    { title: "ICAR eCourse — Groundwater & Well Design", url: "https://ecoursesonline.iasri.res.in/mod/page/view.php?id=125224", type: "Notes" },
  ]},
  { id: "soil", name: "Soil Science", icon: "🌱", color: "#00ff88", topics: [
    { id: "ss-1", name: "Soil Formation & Classification" },
    { id: "ss-2", name: "Soil Physical Properties" },
    { id: "ss-3", name: "Soil Chemical Properties" },
    { id: "ss-4", name: "Soil Microbiology" },
    { id: "ss-5", name: "Nutrient Cycles in Soil" },
    { id: "ss-6", name: "Soil Conservation" },
    { id: "ss-7", name: "Soil Fertility Management" },
  ], links: [
    { title: "NPTEL — Soil Science Full Course", url: "https://nptel.ac.in/courses/105/104/105104099/", type: "Course" },
    { title: "Soil Science MCQs — AgriExam", url: "https://agriexam.com/soil-science-mcq/", type: "MCQ" },
    { title: "ICAR eCourse — Soil Classification", url: "https://ecoursesonline.iasri.res.in/mod/page/view.php?id=124998", type: "Notes" },
    { title: "Soil Science GATE Video Lectures", url: "https://www.youtube.com/results?search_query=soil+science+GATE+agriculture+engineering", type: "Video" },
    { title: "Soil Fertility Notes — AgriInfo", url: "https://www.agriinfo.in/default.aspx?page=topic&superid=4&topicid=420", type: "Notes" },
  ]},
  { id: "machinery", name: "Farm Machinery", icon: "⚙️", color: "#ff9632", topics: [
    { id: "fm-1", name: "Tractors & Power Sources" },
    { id: "fm-2", name: "Tillage Implements" },
    { id: "fm-3", name: "Sowing & Planting Machines" },
    { id: "fm-4", name: "Harvesting Machinery" },
    { id: "fm-5", name: "Post-Harvest Technology" },
    { id: "fm-6", name: "IC Engines for Agriculture" },
  ], links: [
    { title: "NPTEL — Farm Machinery Full Course", url: "https://nptel.ac.in/courses/109/104/109104088/", type: "Course" },
    { title: "Farm Machinery MCQs — AgriExam", url: "https://agriexam.com/farm-machinery-mcq/", type: "MCQ" },
    { title: "ICAR eCourse — Harvesting Machines", url: "https://ecoursesonline.iasri.res.in/mod/page/view.php?id=125000", type: "Notes" },
    { title: "Farm Machinery GATE Videos", url: "https://www.youtube.com/results?search_query=farm+machinery+GATE+agriculture+engineering+tractor", type: "Video" },
    { title: "Farm Power MCQs — AgriExam", url: "https://agriexam.com/farm-power-mcq/", type: "MCQ" },
  ]},
  { id: "agronomy", name: "Agronomy", icon: "🌾", color: "#ffd700", topics: [
    { id: "ag-1", name: "Crop Production Principles" },
    { id: "ag-2", name: "Kharif Crops" },
    { id: "ag-3", name: "Rabi Crops" },
    { id: "ag-4", name: "Weed Science" },
    { id: "ag-5", name: "Crop Physiology" },
    { id: "ag-6", name: "Cropping Systems" },
  ], links: [
    { title: "Agronomy MCQs — GATE & ICAR", url: "https://agriexam.com/agronomy-mcq/", type: "MCQ" },
    { title: "Agronomy Complete Notes — AgriInfo", url: "https://www.agriinfo.in/default.aspx?page=topic&superid=1&topicid=1", type: "Notes" },
    { title: "ICAR eCourse — Kharif & Rabi Crops", url: "https://ecoursesonline.iasri.res.in/mod/page/view.php?id=125001", type: "Notes" },
    { title: "Agronomy GATE & ICAR Lectures", url: "https://www.youtube.com/results?search_query=agronomy+ICAR+JRF+GATE+agriculture", type: "Video" },
    { title: "Weed Science MCQs — AgriExam", url: "https://agriexam.com/weed-science-mcq/", type: "MCQ" },
  ]},
  { id: "hydrology", name: "Hydrology", icon: "🌊", color: "#a855f7", topics: [
    { id: "hy-1", name: "Hydrological Cycle" },
    { id: "hy-2", name: "Precipitation Analysis" },
    { id: "hy-3", name: "Runoff & Streamflow" },
    { id: "hy-4", name: "Flood Estimation" },
    { id: "hy-5", name: "Watershed Management" },
  ], links: [
    { title: "NPTEL — Engineering Hydrology Full Course", url: "https://nptel.ac.in/courses/105/101/105101014/", type: "Course" },
    { title: "Hydrology MCQs — AgriExam", url: "https://agriexam.com/hydrology-mcq/", type: "MCQ" },
    { title: "ICAR eCourse — Watershed Management", url: "https://ecoursesonline.iasri.res.in/mod/page/view.php?id=125003", type: "Notes" },
    { title: "Hydrology GATE Lectures — YouTube", url: "https://www.youtube.com/results?search_query=hydrology+watershed+GATE+agriculture+engineering", type: "Video" },
  ]},
  { id: "renewable", name: "Renewable Energy", icon: "☀️", color: "#ff5050", topics: [
    { id: "re-1", name: "Solar Energy Systems" },
    { id: "re-2", name: "Biogas & Biomass" },
    { id: "re-3", name: "Wind Energy" },
    { id: "re-4", name: "Rural Energy Applications" },
  ], links: [
    { title: "NPTEL — Solar Energy Engineering", url: "https://nptel.ac.in/courses/103/106/103106171/", type: "Course" },
    { title: "ICAR eCourse — Biogas Technology", url: "https://ecoursesonline.iasri.res.in/mod/page/view.php?id=125005", type: "Notes" },
    { title: "Renewable Energy MCQs — AgriExam", url: "https://agriexam.com/renewable-energy-mcq/", type: "MCQ" },
    { title: "Renewable Energy for Agriculture", url: "https://www.youtube.com/results?search_query=renewable+energy+agriculture+biogas+solar", type: "Video" },
  ]},
];

const EXAMS = [
  { id: "gate", name: "GATE AG", icon: "🎓", color: "#ff5050", date: "Feb 2026", marks: 100, link: "https://gate2026.iitg.ac.in", pyqLink: "https://agriexam.com/gate-agriculture-question-papers/", mcqLink: "https://agriexam.com/gate-agriculture/", syllabusLink: "https://gate2026.iitg.ac.in/syllabi/AG.pdf" },
  { id: "icar", name: "ICAR JRF", icon: "🔬", color: "#00d4ff", date: "Jun 2025", marks: 200, link: "https://icar.org.in", pyqLink: "https://icar.org.in/content/previous-question-papers", mcqLink: "https://agriexam.com/icar-jrf/", syllabusLink: "https://icar.org.in/sites/default/files/Syllabus-for-ICAR-JRF-SRF.pdf" },
  { id: "opsc", name: "OPSC AAE", icon: "🏛️", color: "#00ff88", date: "2025", marks: 300, link: "https://www.opsc.gov.in", pyqLink: "https://agriexam.com/opsc-aae-question-papers/", mcqLink: "https://agriexam.com/opsc-aae/", syllabusLink: "https://www.opsc.gov.in" },
  { id: "asrb", name: "ASRB NET", icon: "🧪", color: "#a855f7", date: "2025", marks: 200, link: "https://www.asrb.org.in", pyqLink: "https://www.asrb.org.in/content/old-question-papers", mcqLink: "https://agriexam.com/asrb-net/", syllabusLink: "https://www.asrb.org.in" },
];

const QUICK_PROMPTS = [
  "Find GATE AG 2023 PYQ PDF",
  "Best YouTube videos for irrigation engineering",
  "ICAR JRF previous year papers free download",
  "Soil science formula sheet PDF",
  "Farm machinery NPTEL course free",
  "OPSC AAE syllabus 2025",
  "Drip irrigation notes for GATE",
  "Hydrology MCQ practice set",
];

const TYPE_COLORS = {
  Course: { bg: "rgba(168,85,247,0.15)", color: "#a855f7" },
  Notes: { bg: "rgba(0,255,136,0.15)", color: "#00ff88" },
  MCQ: { bg: "rgba(0,212,255,0.15)", color: "#00d4ff" },
  Video: { bg: "rgba(255,200,0,0.15)", color: "#ffc800" },
  PYQ: { bg: "rgba(255,80,80,0.15)", color: "#ff5050" },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #020b18; font-family: 'Exo 2', sans-serif; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 4px; }
  @keyframes scanline { 0% { top: -2px; } 100% { top: 100vh; } }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
  .scanline { position: fixed; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(0,255,136,0.5), transparent); z-index: 9999; pointer-events: none; animation: scanline 6s linear infinite; }
  .nav-link { font-family: 'Orbitron', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 7px 12px; border-radius: 4px; cursor: pointer; border: none; background: transparent; color: #4a7a99; transition: all 0.2s; }
  .nav-link:hover, .nav-link.active { color: #00d4ff; background: rgba(0,212,255,0.08); }
  .card { background: rgba(4,16,32,0.85); border: 1px solid rgba(0,212,255,0.12); border-radius: 8px; transition: all 0.3s; }
  .card:hover { border-color: rgba(0,212,255,0.35); transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.08); }
  .res-link { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 6px; background: rgba(0,212,255,0.04); border: 1px solid rgba(0,212,255,0.08); text-decoration: none; color: #4a7a99; font-size: 0.78rem; transition: all 0.2s; margin-bottom: 6px; }
  .res-link:hover { background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.3); color: #00d4ff; transform: translateX(3px); }
  .badge { font-family: 'Share Tech Mono', monospace; font-size: 0.58rem; font-weight: 700; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; flex-shrink: 0; }
  .topic-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 6px; background: rgba(0,212,255,0.03); border: 1px solid rgba(0,212,255,0.06); margin-bottom: 6px; transition: all 0.2s; }
  .topic-item:hover { background: rgba(0,212,255,0.06); border-color: rgba(0,212,255,0.15); }
  .topic-check { width: 20px; height: 20px; border-radius: 4px; border: 1px solid rgba(0,212,255,0.3); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: all 0.2s; }
  .topic-check.done { background: #00ff88; border-color: #00ff88; }
  .input-field { width: 100%; background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.2); border-radius: 6px; padding: 12px 16px; color: #e8f4ff; font-family: 'Exo 2', sans-serif; font-size: 0.88rem; outline: none; transition: all 0.2s; }
  .input-field:focus { border-color: rgba(0,212,255,0.5); box-shadow: 0 0 15px rgba(0,212,255,0.1); }
  .input-field::placeholder { color: #4a7a99; }
  .btn-blue { font-family: 'Orbitron', monospace; font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; border-radius: 4px; border: 1px solid #00d4ff; background: transparent; color: #00d4ff; cursor: pointer; transition: all 0.3s; }
  .btn-blue:hover { background: #00d4ff; color: #020b18; box-shadow: 0 0 30px rgba(0,212,255,0.5); }
  .btn-blue:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-green { font-family: 'Orbitron', monospace; font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 10px 20px; border-radius: 4px; border: 1px solid #00ff88; background: transparent; color: #00ff88; cursor: pointer; transition: all 0.3s; }
  .btn-green:hover { background: #00ff88; color: #020b18; box-shadow: 0 0 30px rgba(0,255,136,0.5); }
  .progress-bar { height: 4px; border-radius: 2px; background: rgba(0,212,255,0.1); overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 2px; transition: width 0.8s ease; }
  .quick-prompt { font-family: 'Share Tech Mono', monospace; font-size: 0.66rem; padding: 6px 12px; border-radius: 4px; background: rgba(0,212,255,0.06); border: 1px solid rgba(0,212,255,0.15); color: #4a7a99; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
  .quick-prompt:hover { background: rgba(0,212,255,0.15); color: #00d4ff; }
  .ai-message { animation: slideIn 0.4s ease; }
  .typing-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #00d4ff; margin: 0 2px; animation: blink 1s ease-in-out infinite; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  .exam-card { background: rgba(4,16,32,0.85); border: 1px solid rgba(0,212,255,0.1); border-radius: 8px; padding: 16px; transition: all 0.3s; }
  .exam-card:hover { transform: translateY(-4px); }
`;

function AIAgent() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "AGRIPREP AI AGENT ONLINE 🤖 I find direct links to PDFs, YouTube videos, PYQs, notes and formula sheets for GATE AG, ICAR JRF, OPSC AAE and ASRB NET. What do you need?", resources: [] }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const SYSTEM = `You are AgriPrep AI for B.Tech Agricultural Engineering students in India preparing for GATE Agriculture, ICAR JRF, OPSC AAE, ASRB NET. Find REAL FREE study resources. Respond in EXACT JSON: {"summary":"Brief response","resources":[{"title":"title","url":"https://url.com","type":"PYQ|Notes|Video|MCQ|Course","description":"what it contains"}],"tip":"one study tip"}. Use: agriexam.com, nptel.ac.in, ecoursesonline.iasri.res.in, icar.org.in/content/previous-question-papers, gate2026.iitg.ac.in, opsc.gov.in, asrb.org.in, agrimoon.com, agriinfo.in. For YouTube: https://www.youtube.com/results?search_query=EXACT+QUERY. Provide 4-6 resources. Only FREE resources.`;

  const send = async (text) => {
    const q = text || input.trim();
    if (!q) return;
    setInput("");
    setMessages(p => [...p, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM, messages: [{ role: "user", content: q }] }) });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "{}";
      let parsed;
      try { parsed = JSON.parse(raw); } catch { parsed = { summary: raw, resources: [], tip: "" }; }
      setMessages(p => [...p, { role: "assistant", content: parsed.summary, resources: parsed.resources || [], tip: parsed.tip }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "Connection issue. Here are reliable resources:", resources: [{ title: "AgriExam — MCQs & PYQs", url: "https://agriexam.com", type: "MCQ", description: "Best free MCQ practice for GATE AG and ICAR JRF" }, { title: "ICAR Official Previous Papers", url: "https://icar.org.in/content/previous-question-papers", type: "PYQ", description: "Official ICAR JRF previous year papers" }, { title: "NPTEL Free Courses", url: "https://nptel.ac.in", type: "Course", description: "IIT professor lectures all subjects free" }, { title: "ICAR eCourses — Free Notes", url: "https://ecoursesonline.iasri.res.in", type: "Notes", description: "Official ICAR study material all subjects" }], tip: "Practice 50 MCQs daily for consistent improvement." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((msg, i) => (
          <div key={i} className="ai-message" style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "user" ? (
              <div style={{ maxWidth: "75%", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "8px 8px 2px 8px", padding: "10px 14px", color: "#e8f4ff", fontSize: "0.85rem" }}>{msg.content}</div>
            ) : (
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", animation: "blink 1.2s ease-in-out infinite", boxShadow: "0 0 8px #00ff88" }}/>
                  <span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "#00ff88", letterSpacing: 2 }}>AGRIPREP AI</span>
                </div>
                {msg.content && <div style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 6, padding: "10px 14px", marginBottom: 10, fontSize: "0.82rem", color: "#95d5b2", lineHeight: 1.6 }}>{msg.content}</div>}
                {msg.resources?.map((r, j) => { const tc = TYPE_COLORS[r.type] || { bg: "rgba(0,212,255,0.1)", color: "#00d4ff" }; return (<a key={j} href={r.url} target="_blank" rel="noopener noreferrer" className="res-link" style={{ marginBottom: 6 }}><div style={{ flex: 1, minWidth: 0 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}><span className="badge" style={{ background: tc.bg, color: tc.color }}>{r.type}</span><span style={{ fontWeight: 600, fontSize: "0.8rem", color: "#e8f4ff" }}>{r.title}</span></div>{r.description && <p style={{ fontSize: "0.71rem", color: "#4a7a99", marginLeft: 46 }}>{r.description}</p>}</div><span style={{ color: "#00d4ff", flexShrink: 0 }}>→</span></a>); })}
                {msg.tip && <div style={{ marginTop: 8, padding: "8px 12px", background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)", borderRadius: 6, fontSize: "0.73rem", color: "#4a7a99", fontFamily: "'Share Tech Mono'" }}>⚡ {msg.tip}</div>}
              </div>
            )}
          </div>
        ))}
        {loading && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 6, padding: "10px 16px", display: "flex", alignItems: "center", gap: 4 }}><span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.68rem", color: "#00ff88", marginRight: 8 }}>SEARCHING</span><span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/></div></div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{ padding: "8px 16px", display: "flex", gap: 6, overflowX: "auto", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        {QUICK_PROMPTS.slice(0, 4).map((p, i) => <button key={i} className="quick-prompt" onClick={() => send(p)}>{p}</button>)}
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(0,212,255,0.1)", display: "flex", gap: 10 }}>
        <input className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !loading && send()} placeholder="Ask AI — Find PYQs, notes, videos, formula sheets..." disabled={loading}/>
        <button className="btn-blue" onClick={() => send()} disabled={loading || !input.trim()} style={{ flexShrink: 0 }}>{loading ? "..." : "SEND"}</button>
      </div>
    </div>
  );
}

function SubjectDetail({ subject, completed, onToggle, onBack }) {
  const [tab, setTab] = useState("topics");
  const done = subject.topics.filter(t => completed.has(t.id)).length;
  const pct = Math.round((done / subject.topics.length) * 100);
  return (
    <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
      <button onClick={onBack} style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "#4a7a99", background: "none", border: "none", cursor: "pointer", letterSpacing: 1, marginBottom: 16 }}>← BACK</button>
      <div className="card" style={{ padding: 20, marginBottom: 20, borderColor: subject.color + "33", background: `linear-gradient(135deg, ${subject.color}08, rgba(4,16,32,0.85))` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: "2.5rem" }}>{subject.icon}</span>
          <div><h2 style={{ fontFamily: "'Orbitron'", fontSize: "1.1rem", color: "#e8f4ff", letterSpacing: 2 }}>{subject.name}</h2><p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#4a7a99", letterSpacing: 1 }}>{subject.topics.length} TOPICS • {subject.links.length} RESOURCES</p></div>
          <div style={{ marginLeft: "auto", textAlign: "center" }}><div style={{ fontFamily: "'Orbitron'", fontSize: "1.4rem", fontWeight: 900, color: subject.color }}>{pct}%</div><div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.58rem", color: "#4a7a99" }}>{done}/{subject.topics.length} DONE</div></div>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${subject.color}, ${subject.color}88)` }}/></div>
      </div>
      <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 8, background: "rgba(0,212,255,0.05)", marginBottom: 20 }}>
        {["topics", "resources"].map(t => (<button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "8px", borderRadius: 6, border: "none", background: tab === t ? "rgba(4,16,32,0.9)" : "transparent", color: tab === t ? "#e8f4ff" : "#4a7a99", fontFamily: "'Orbitron'", fontSize: "0.65rem", fontWeight: 700, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s" }}>{t}</button>))}
      </div>
      {tab === "topics" && subject.topics.map((topic, i) => { const isDone = completed.has(topic.id); return (<div key={topic.id} className="topic-item"><div className={`topic-check ${isDone ? "done" : ""}`} onClick={() => onToggle(topic.id)}>{isDone && <span style={{ color: "#020b18", fontSize: "0.7rem", fontWeight: 900 }}>✓</span>}</div><span style={{ flex: 1, fontSize: "0.85rem", color: isDone ? "#4a7a99" : "#e8f4ff", textDecoration: isDone ? "line-through" : "none" }}>{topic.name}</span><span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "#4a7a99" }}>{i+1}/{subject.topics.length}</span></div>); })}
      {tab === "resources" && subject.links.map((link, i) => { const tc = TYPE_COLORS[link.type] || { bg: "rgba(0,212,255,0.1)", color: "#00d4ff" }; return (<a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="res-link"><div style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="badge" style={{ background: tc.bg, color: tc.color }}>{link.type}</span><span style={{ color: "#e8f4ff", fontWeight: 600 }}>{link.title}</span></div><span style={{ color: "#00d4ff" }}>→</span></a>); })}
    </div>
  );
}

function Dashboard({ completed, setPage, setActiveSubject, userName }) {
  const totalTopics = SUBJECTS.reduce((a, s) => a + s.topics.length, 0);
  const doneTopics = completed.size;
  return (
    <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00ff88", letterSpacing: 3, marginBottom: 6 }}>// MISSION CONTROL</p>
        <h1 style={{ fontFamily: "'Orbitron'", fontSize: "clamp(1.4rem,4vw,2.2rem)", fontWeight: 900, color: "#e8f4ff", letterSpacing: 2, lineHeight: 1.2, marginBottom: 6 }}>WELCOME, <span style={{ color: "#00d4ff", textShadow: "0 0 20px rgba(0,212,255,0.5)" }}>{userName.toUpperCase()}</span></h1>
        <p style={{ color: "#4a7a99", fontSize: "0.85rem" }}>Your journey to crack <strong style={{ color: "#ff5050" }}>GATE AG</strong> starts here 🎯</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
        {[{ icon: "📚", label: "Topics Done", value: doneTopics, total: totalTopics, color: "#00d4ff" }, { icon: "🎯", label: "Subjects Started", value: SUBJECTS.filter(s => s.topics.some(t => completed.has(t.id))).length, total: SUBJECTS.length, color: "#00ff88" }, { icon: "⚡", label: "Overall Progress", value: Math.round((doneTopics/totalTopics)*100), suffix: "%", color: "#ffd700" }, { icon: "🔥", label: "Keep Going!", value: "Study", suffix: " Now", color: "#ff5050" }].map((s, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Orbitron'", fontSize: "1.6rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}<span style={{ fontSize: "0.75rem", color: "#4a7a99" }}>{s.suffix}{s.total ? `/${s.total}` : ""}</span></div>
            <div style={{ fontSize: "0.68rem", color: "#4a7a99", marginTop: 4, fontFamily: "'Share Tech Mono'", letterSpacing: 1 }}>{s.label}</div>
            {s.total && <div className="progress-bar" style={{ marginTop: 8 }}><div className="progress-fill" style={{ width: `${(s.value/s.total)*100}%`, background: s.color }}/></div>}
          </div>
        ))}
      </div>
      <div onClick={() => setPage("ai")} style={{ cursor: "pointer", marginBottom: 20, padding: 18, background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(0,255,136,0.04))", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", animation: "blink 1.2s ease-in-out infinite", boxShadow: "0 0 10px #00ff88" }}/>
          <span style={{ fontFamily: "'Orbitron'", fontSize: "0.7rem", color: "#00ff88", letterSpacing: 2 }}>AI AGENT ONLINE</span>
        </div>
        <h3 style={{ fontFamily: "'Orbitron'", fontSize: "0.95rem", color: "#e8f4ff", marginBottom: 4, letterSpacing: 1 }}>Ask AI to Find Your Resources</h3>
        <p style={{ fontSize: "0.78rem", color: "#4a7a99", lineHeight: 1.5 }}>Type anything — AI finds direct links to PYQs, videos, notes and formula sheets instantly</p>
      </div>
      <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 3, marginBottom: 12 }}>// SUBJECT MODULES</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12, marginBottom: 20 }}>
        {SUBJECTS.map(s => { const done = s.topics.filter(t => completed.has(t.id)).length; const pct = Math.round((done/s.topics.length)*100); return (<div key={s.id} className="card" style={{ padding: 16, cursor: "pointer", borderColor: s.color+"22" }} onClick={() => { setActiveSubject(s); setPage("subject"); }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><div style={{ width: 36, height: 36, borderRadius: 8, background: s.color+"15", border: `1px solid ${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{s.icon}</div><div><p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#e8f4ff" }}>{s.name}</p><p style={{ fontSize: "0.68rem", color: "#4a7a99", fontFamily: "'Share Tech Mono'" }}>{done}/{s.topics.length} DONE</p></div><span style={{ marginLeft: "auto", fontFamily: "'Orbitron'", fontSize: "0.85rem", fontWeight: 700, color: s.color }}>{pct}%</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}/></div></div>); })}
      </div>
      <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 3, marginBottom: 12 }}>// TARGET EXAMS</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
        {EXAMS.map(e => (<div key={e.id} className="exam-card" style={{ borderColor: e.color+"22" }}><div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{e.icon}</div><div style={{ fontFamily: "'Orbitron'", fontSize: "0.82rem", fontWeight: 700, color: e.color, marginBottom: 2 }}>{e.name}</div><div style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "#4a7a99", marginBottom: 10 }}>{e.date} • {e.marks} MARKS</div><div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}><a href={e.pyqLink} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.58rem", padding: "3px 8px", borderRadius: 3, background: "rgba(255,80,80,0.15)", color: "#ff5050", textDecoration: "none", border: "1px solid rgba(255,80,80,0.2)" }}>PYQs</a><a href={e.mcqLink} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.58rem", padding: "3px 8px", borderRadius: 3, background: "rgba(0,212,255,0.15)", color: "#00d4ff", textDecoration: "none", border: "1px solid rgba(0,212,255,0.2)" }}>MCQs</a><a href={e.syllabusLink} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.58rem", padding: "3px 8px", borderRadius: 3, background: "rgba(0,255,136,0.1)", color: "#00ff88", textDecoration: "none", border: "1px solid rgba(0,255,136,0.2)" }}>Syllabus</a></div></div>))}
      </div>
    </div>
  );
}

function Progress({ completed }) {
  const totalTopics = SUBJECTS.reduce((a, s) => a + s.topics.length, 0);
  return (
    <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
      <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00ff88", letterSpacing: 3, marginBottom: 6 }}>// MISSION STATUS</p>
      <h2 style={{ fontFamily: "'Orbitron'", fontSize: "1.4rem", color: "#e8f4ff", marginBottom: 20, letterSpacing: 2 }}>PROGRESS TRACKER</h2>
      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 2, marginBottom: 16 }}>SUBJECT COMPLETION</p>
        {SUBJECTS.map(s => { const done = s.topics.filter(t => completed.has(t.id)).length; const pct = Math.round((done/s.topics.length)*100); return (<div key={s.id} style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: "0.82rem", color: "#e8f4ff" }}>{s.icon} {s.name}</span><span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.7rem", fontWeight: 700, color: s.color }}>{pct}% ({done}/{s.topics.length})</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}/></div></div>); })}
      </div>
      <div className="card" style={{ padding: 20 }}>
        <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 2, marginBottom: 12 }}>OVERALL PROGRESS</p>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: "3rem", fontWeight: 900, color: "#00d4ff", textShadow: "0 0 30px rgba(0,212,255,0.5)" }}>{Math.round((completed.size/totalTopics)*100)}%</div>
          <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.7rem", color: "#4a7a99", marginTop: 8 }}>{completed.size} OF {totalTopics} TOPICS COMPLETED</p>
        </div>
      </div>
    </div>
  );
}

function Planner() {
  const [tasks, setTasks] = useState(() => { const s = localStorage.getItem("agriprep_tasks"); return s ? JSON.parse(s) : [{ id: 1, text: "Study Irrigation Engineering Chapter 1", done: false }, { id: 2, text: "Solve 20 GATE AG MCQs on AgriExam", done: false }, { id: 3, text: "Watch NPTEL Soil Science Lecture", done: false }, { id: 4, text: "Revise Farm Machinery formulas", done: false }]; });
  const [newTask, setNewTask] = useState("");
  const save = (t) => { setTasks(t); localStorage.setItem("agriprep_tasks", JSON.stringify(t)); };
  const toggle = (id) => save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const add = () => { if (!newTask.trim()) return; save([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]); setNewTask(""); };
  const remove = (id) => save(tasks.filter(t => t.id !== id));
  return (
    <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
      <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00ff88", letterSpacing: 3, marginBottom: 6 }}>// MISSION TIMELINE</p>
      <h2 style={{ fontFamily: "'Orbitron'", fontSize: "1.4rem", color: "#e8f4ff", marginBottom: 20, letterSpacing: 2 }}>STUDY PLANNER</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input className="input-field" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Add a new study task..." style={{ flex: 1 }}/>
        <button className="btn-green" onClick={add}>ADD</button>
      </div>
      <div>
        {tasks.map(task => (<div key={task.id} className="topic-item" style={{ justifyContent: "space-between" }}><div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}><div className={`topic-check ${task.done ? "done" : ""}`} onClick={() => toggle(task.id)}>{task.done && <span style={{ color: "#020b18", fontSize: "0.7rem", fontWeight: 900 }}>✓</span>}</div><span style={{ fontSize: "0.85rem", color: task.done ? "#4a7a99" : "#e8f4ff", textDecoration: task.done ? "line-through" : "none", flex: 1 }}>{task.text}</span></div><button onClick={() => remove(task.id)} style={{ background: "none", border: "none", color: "#4a7a99", cursor: "pointer", fontSize: "0.8rem", padding: "0 4px" }}>✕</button></div>))}
        {tasks.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#4a7a99", fontFamily: "'Share Tech Mono'", fontSize: "0.7rem" }}>NO TASKS — ADD ONE ABOVE ↑</div>}
      </div>
      <div style={{ marginTop: 20, padding: 16, background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)", borderRadius: 8, fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "#4a7a99", textAlign: "center" }}>{tasks.filter(t => t.done).length}/{tasks.length} TASKS COMPLETED</div>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20, maxWidth: 860, margin: "0 auto" }}>
      <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00ff88", letterSpacing: 3, marginBottom: 6 }}>// CREATOR</p>
      <h2 style={{ fontFamily: "'Orbitron'", fontSize: "1.4rem", color: "#e8f4ff", marginBottom: 20, letterSpacing: 2 }}>ABOUT AGRIPREP</h2>
      <div className="card" style={{ padding: 24, marginBottom: 16, borderColor: "rgba(0,255,136,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 12, background: "linear-gradient(135deg, #00ff88, #00d4ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>🌾</div>
          <div><h3 style={{ fontFamily: "'Orbitron'", fontSize: "1rem", color: "#00ff88", letterSpacing: 2, marginBottom: 4 }}>{OWNER.fullName}</h3><p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "#4a7a99", letterSpacing: 1 }}>{OWNER.role}</p><p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.65rem", color: "#4a7a99", letterSpacing: 1 }}>{OWNER.college}</p></div>
        </div>
        <p style={{ fontSize: "0.85rem", color: "#95d5b2", lineHeight: 1.7, marginBottom: 16, padding: 14, background: "rgba(0,255,136,0.05)", borderRadius: 8, border: "1px solid rgba(0,255,136,0.1)" }}>"{OWNER.mission}"</p>
        <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="btn-green" style={{ display: "inline-block", textDecoration: "none", textAlign: "center" }}>GITHUB →</a>
      </div>
      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 2, marginBottom: 12 }}>WHAT IS AGRIPREP?</p>
        <p style={{ fontSize: "0.85rem", color: "#4a7a99", lineHeight: 1.7 }}>AgriPrep Library is a <strong style={{ color: "#e8f4ff" }}>100% free</strong> study platform built for B.Tech Agricultural Engineering students preparing for <strong style={{ color: "#ff5050" }}>GATE AG</strong>, <strong style={{ color: "#00d4ff" }}>ICAR JRF</strong>, <strong style={{ color: "#00ff88" }}>OPSC AAE</strong> and <strong style={{ color: "#a855f7" }}>ASRB NET</strong>. No subscriptions, no paywalls, ever.</p>
      </div>
      <div className="card" style={{ padding: 20 }}>
        <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 2, marginBottom: 12 }}>QUICK LINKS</p>
        {[{ title: "AgriExam — Free MCQ Practice", url: "https://agriexam.com" }, { title: "NPTEL — Free Agriculture Courses", url: "https://nptel.ac.in" }, { title: "ICAR eCourses — Free Notes", url: "https://ecoursesonline.iasri.res.in" }, { title: "GATE 2026 Official", url: "https://gate2026.iitg.ac.in" }, { title: "ICAR Official Previous Papers", url: "https://icar.org.in/content/previous-question-papers" }, { title: "OPSC Official", url: "https://www.opsc.gov.in" }, { title: "AgriMoon Free PDFs", url: "https://www.agrimoon.com" }, { title: "Nijukti Khabar — Job Alerts", url: "https://nijuktikhabar.in" }].map((l, i) => (<a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="res-link">{l.title}<span style={{ color: "#00d4ff" }}>→</span></a>))}
      </div>
    </div>
  );
}

function Onboarding({ onDone }) {
  const [name, setName] = useState("");
  const [exam, setExam] = useState("gate");
  const handleStart = () => { if (!name.trim()) return; localStorage.setItem("agriprep_name", name.trim()); localStorage.setItem("agriprep_exam", exam); onDone(name.trim()); };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "#020b18" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>🌾</div>
        <h1 style={{ fontFamily: "'Orbitron'", fontSize: "clamp(1.5rem,5vw,2.5rem)", fontWeight: 900, color: "#e8f4ff", letterSpacing: 3, marginBottom: 8 }}>AGRI<span style={{ color: "#00d4ff" }}>PREP</span></h1>
        <p style={{ fontFamily: "'Orbitron'", fontSize: "0.65rem", color: "#00ff88", letterSpacing: 3, marginBottom: 24 }}>FREE STUDY PLATFORM FOR AGRI STUDENTS</p>
        <div className="card" style={{ padding: 28, textAlign: "left" }}>
          <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.62rem", color: "#00d4ff", letterSpacing: 2, marginBottom: 6 }}>// INITIALIZE PROFILE</p>
          <p style={{ fontSize: "0.82rem", color: "#4a7a99", marginBottom: 20 }}>Enter your name to get started. Your progress saves automatically.</p>
          <label style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "#4a7a99", letterSpacing: 2, display: "block", marginBottom: 6 }}>YOUR NAME</label>
          <input className="input-field" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleStart()} placeholder="🌾 What should we call you?" style={{ marginBottom: 16 }}/>
          <label style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "#4a7a99", letterSpacing: 2, display: "block", marginBottom: 6 }}>TARGET EXAM</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {EXAMS.map(e => (<button key={e.id} onClick={() => setExam(e.id)} style={{ padding: "10px 8px", borderRadius: 6, border: `1px solid ${exam === e.id ? e.color : "rgba(0,212,255,0.1)"}`, background: exam === e.id ? e.color+"15" : "transparent", color: exam === e.id ? e.color : "#4a7a99", cursor: "pointer", fontFamily: "'Share Tech Mono'", fontSize: "0.68rem", letterSpacing: 1, transition: "all 0.2s" }}>{e.icon} {e.name}</button>))}
          </div>
          <button className="btn-blue" onClick={handleStart} disabled={!name.trim()} style={{ width: "100%", padding: "13px" }}>LAUNCH MISSION →</button>
        </div>
        <p style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.58rem", color: "#4a7a99", marginTop: 16, letterSpacing: 1 }}>Built by {OWNER.fullName} • {OWNER.college} • 100% Free</p>
      </div>
    </div>
  );
}

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem("agriprep_name") || "");
  const [page, setPage] = useState("dashboard");
  const [activeSubject, setActiveSubject] = useState(null);
  const [completed, setCompleted] = useState(() => { const s = localStorage.getItem("agriprep_completed"); return new Set(s ? JSON.parse(s) : []); });

  const toggleComplete = (id) => { setCompleted(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); localStorage.setItem("agriprep_completed", JSON.stringify([...next])); return next; }); };

  if (!userName) return <Onboarding onDone={name => setUserName(name)}/>;

  const NAV = [{ id: "dashboard", label: "HOME", icon: "🏠" }, { id: "ai", label: "AI", icon: "🤖" }, { id: "planner", label: "PLANNER", icon: "📅" }, { id: "progress", label: "PROGRESS", icon: "📊" }, { id: "about", label: "ABOUT", icon: "ℹ️" }];

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: "#020b18", display: "flex", flexDirection: "column" }}>
        <div className="scanline"/>
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)", backgroundSize: "50px 50px" }}/>
        </div>
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(2,11,24,0.96)", borderBottom: "1px solid rgba(0,212,255,0.1)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 56, flexShrink: 0 }}>
          <div style={{ fontFamily: "'Orbitron'", fontSize: "0.95rem", fontWeight: 900, color: "#00d4ff", letterSpacing: 3, textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>AGRI<span style={{ color: "#00ff88" }}>PREP</span></div>
          <div style={{ display: "flex", gap: 2 }}>
            {NAV.map(n => (<button key={n.id} className={`nav-link ${page === n.id ? "active" : ""}`} onClick={() => { setPage(n.id); setActiveSubject(null); }}>{n.label}</button>))}
          </div>
        </nav>
        <div style={{ flex: 1, position: "relative", zIndex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {page === "subject" && activeSubject
            ? <div style={{ flex: 1, overflowY: "auto" }}><SubjectDetail subject={activeSubject} completed={completed} onToggle={toggleComplete} onBack={() => { setPage("dashboard"); setActiveSubject(null); }}/></div>
            : page === "ai"
            ? <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(0,212,255,0.08)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", animation: "blink 1.2s ease-in-out infinite", boxShadow: "0 0 10px #00ff88" }}/>
                  <span style={{ fontFamily: "'Orbitron'", fontSize: "0.68rem", color: "#00ff88", letterSpacing: 2 }}>AI RESOURCE AGENT</span>
                  <span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.6rem", color: "#4a7a99", marginLeft: 4 }}>// powered by Claude AI</span>
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}><AIAgent/></div>
              </div>
            : page === "progress" ? <div style={{ flex: 1, overflowY: "auto" }}><Progress completed={completed}/></div>
            : page === "planner" ? <div style={{ flex: 1, overflowY: "auto" }}><Planner/></div>
            : page === "about" ? <div style={{ flex: 1, overflowY: "auto" }}><About/></div>
            : <div style={{ flex: 1, overflowY: "auto" }}><Dashboard completed={completed} setPage={setPage} setActiveSubject={setActiveSubject} userName={userName}/></div>
          }
        </div>
        <div style={{ position: "sticky", bottom: 0, background: "rgba(2,11,24,0.97)", borderTop: "1px solid rgba(0,212,255,0.1)", display: "flex", zIndex: 100, flexShrink: 0 }}>
          {NAV.map(n => (<button key={n.id} onClick={() => { setPage(n.id); setActiveSubject(null); }} style={{ flex: 1, padding: "10px 4px 8px", border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, borderTop: page === n.id ? "2px solid #00d4ff" : "2px solid transparent" }}><span style={{ fontSize: "1.1rem" }}>{n.icon}</span><span style={{ fontFamily: "'Share Tech Mono'", fontSize: "0.5rem", color: page === n.id ? "#00d4ff" : "#4a7a99", letterSpacing: 1 }}>{n.label}</span></button>))}
        </div>
      </div>
    </>
  );
}
