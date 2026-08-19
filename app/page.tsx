"use client";

import { useEffect, useState } from "react";
import { games, SEASON_LABEL } from "@/lib/games";

type Signups = Record<string, string>;

export default function Home() {
  const [signups, setSignups] = useState<Signups>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/signups")
      .then((r) => r.json())
      .then((data) => setSignups(data.signups || {}))
      .catch(() => setError("Couldn't load the sign-up sheet. Try refreshing."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSignup(gameId: string) {
    const name = nameInput.trim();
    if (!name) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSignups(data.signups || {});
      setOpenRow(null);
      setNameInput("");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(gameId: string) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/signups", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSignups(data.signups || {});
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <div className="header">
        <img src="/logo.png" alt="Westside Soccer Club logo" />
        <div className="header-text">
          <h1>WESTSIDE SOCCER CLUB</h1>
          <p>Post-Game Snack Sign-Up · {SEASON_LABEL}</p>
        </div>
      </div>

      <div className="intro">
        Thanks for volunteering! Click <strong>Sign Up</strong> next to an
        open game to bring snacks (and drinks) for the team after that
        game. One family per game — the list updates live for everyone.
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Game</th>
              <th>Date</th>
              <th>Field</th>
              <th>Snack Parent</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => {
              const takenBy = signups[g.id];
              const isOpenForm = openRow === g.id;
              return (
                <tr key={g.id}>
                  <td className="game-num">{g.number}</td>
                  <td>{g.date}</td>
                  <td className="field-cell">{g.field}</td>
                  <td>
                    {loading ? (
                      "…"
                    ) : takenBy ? (
                      <div className="signed">
                        <span>
                          <span className="signed-name">{takenBy}</span>{" "}
                          <span className="badge">Signed up</span>
                        </span>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(g.id)}
                          disabled={saving}
                        >
                          remove
                        </button>
                      </div>
                    ) : isOpenForm ? (
                      <div className="signup-form">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Your name"
                          value={nameInput}
                          maxLength={60}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSignup(g.id);
                            if (e.key === "Escape") setOpenRow(null);
                          }}
                        />
                        <button
                          className="signup-btn"
                          onClick={() => handleSignup(g.id)}
                          disabled={saving || !nameInput.trim()}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setOpenRow(null);
                            setNameInput("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="signup-btn"
                        onClick={() => {
                          setOpenRow(g.id);
                          setNameInput("");
                        }}
                      >
                        Sign Up
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="footer-note">
        Questions? Reach out to your team parent. Go Westside! ⚽
      </p>
    </div>
  );
}
