"use client";

import { FormEvent, useState } from "react";

const starterPrompts = [
  "Generate 10 short-form video ideas for my editing channel",
  "Write a title and hook for a cinematic travel reel",
  "Create a 30-day content calendar for my YouTube channel",
  "Draft a thumbnail concept for a viral gaming reaction video",
];

export default function HomePage() {
  const [channelName, setChannelName] = useState("@Aaryaneditzz50");
  const [channelFocus, setChannelFocus] = useState("Editing, cinematic visuals, storytelling, trending video ideas");
  const [channelAudience, setChannelAudience] = useState("Young creators and entertainment fans");
  const [prompt, setPrompt] = useState(starterPrompts[0]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelName,
          channelFocus,
          channelAudience,
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate assistant reply");
      }

      setReply(data.output || "No response generated.");
    } catch (error) {
      setReply(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating your assistant response."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="bg-glow" />

      <section className="topbar">
        <div>
          <p className="eyebrow">AI CREATOR SYSTEM</p>
          <h1>Jarvis AI</h1>
        </div>
        <div className="status-pill">Online</div>
      </section>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow accent">YouTube Command Center</p>
          <h2>Build smarter uploads for {channelName}</h2>
          <p>
            Generate ideas, scripts, titles, thumbnails, channel strategy, and growth guidance for your content engine.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Video Ideas</span>
            <strong>30+</strong>
          </div>
          <div className="stat-card">
            <span>Titles</span>
            <strong>Instant</strong>
          </div>
          <div className="stat-card">
            <span>Scripts</span>
            <strong>AI Drafts</strong>
          </div>
        </div>
      </section>

      <section className="workspace">
        <form onSubmit={handleSubmit} className="panel control-panel">
          <div className="panel-header">
            <h3>Channel Profile</h3>
          </div>

          <label>
            Channel Name
            <input value={channelName} onChange={(e) => setChannelName(e.target.value)} />
          </label>

          <label>
            Channel Focus
            <textarea
              rows={3}
              value={channelFocus}
              onChange={(e) => setChannelFocus(e.target.value)}
            />
          </label>

          <label>
            Target Audience
            <textarea
              rows={2}
              value={channelAudience}
              onChange={(e) => setChannelAudience(e.target.value)}
            />
          </label>

          <div className="quick-actions">
            {starterPrompts.map((item) => (
              <button
                key={item}
                type="button"
                className="chip"
                onClick={() => setPrompt(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label>
            Assistant Task
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </label>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Thinking..." : "Activate Jarvis"}
          </button>
        </form>

        <div className="panel output-panel">
          <div className="panel-header">
            <h3>AI Response</h3>
          </div>

          <div className="output-window">
            {reply ? (
              <pre>{reply}</pre>
            ) : (
              <div className="empty-state">
                <p>Jarvis is waiting for your next command.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
