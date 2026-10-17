
import { useEffect, useState } from "react";
import "./MoodCheckIn.css";

import WellnessRecommendations from "./WellnessRecommendations.jsx";


const moods = [
  { label: "Amazing", emoji: "🤩", color: "mood-amazing" },
  { label: "Happy", emoji: "😊", color: "mood-happy" },
  { label: "Okay", emoji: "😌", color: "mood-okay" },
  { label: "Anxious", emoji: "😟", color: "mood-anxious" },
  { label: "Sad", emoji: "🥺", color: "mood-low" },
  { label: "Low", emoji: "🌧️", color: "mood-low" },
  { label: "Struggling", emoji: "🫂", color: "mood-struggling" },
];

const moodFactors = [
  "Studies or work",
  "Family",
  "Friendships",
  "Relationship",
  "Loneliness",
  "Health",
  "Anxiety or stress",
  "Sleep",
  "Future worries",
  "Not sure",
  "Something else",
];

const STORAGE_KEY = "hugme-mood-entries";

function readEntries() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function MoodCheckIn({ onBack }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [otherFactor, setOtherFactor] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState(readEntries);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      setMessage("Unable to save on this device. Check your browser storage.");
    }
  }, [entries]);

  const needsFactors = ["Sad", "Low", "Struggling", "Anxious"].includes(
    selectedMood
  );

const [savedCheckIn, setSavedCheckIn] = useState(null);


  function toggleFactor(factor) {
    setSelectedFactors((previous) => {
      if (previous.includes(factor)) {
        return previous.filter((item) => item !== factor);
      }

      return [...previous, factor];
    });

    setMessage("");
  }

  function handleMoodChange(mood) {
    setSelectedMood(mood);
    setMessage("");

    if (!["Sad", "Low", "Struggling", "Anxious"].includes(mood)) {
      setSelectedFactors([]);
      setOtherFactor("");
    }
  }

  function saveCheckIn(event) {
    event.preventDefault();

    if (!selectedMood) {
      setMessage("Please choose the mood that feels closest to yours.");
      return;
    }

    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      mood: selectedMood,
      factors: needsFactors ? selectedFactors : [],
      otherFactor:
        needsFactors && selectedFactors.includes("Something else")
          ? otherFactor.trim()
          : "",
      note: note.trim(),
      date: new Date().toISOString(),
    };

setSavedCheckIn(newEntry);


    setEntries((previous) => [newEntry, ...previous]);
    setSelectedMood("");
    setSelectedFactors([]);
    setOtherFactor("");
    setNote("");
    setMessage("Your check-in has been saved 💗");
  }

  function deleteEntry(id) {
    setEntries((previous) => previous.filter((entry) => entry.id !== id));
  }

  function formatDate(date) {
    return new Date(date).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="mood-page">
      <header className="mood-page-heading">
        <div>
          <span className="mood-eyebrow">
            YOUR PERSONAL WELLNESS SPACE
          </span>

          <h1>Let's check in with you. 🌷</h1>

          <p>
            There is no right or wrong way to feel. Take a moment just for
            yourself.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            className="mood-back-button"
            onClick={onBack}
          >
            ← Dashboard
          </button>
        )}
      </header>

      <section className="mood-welcome-card">
        <div>
          <span className="mood-card-eyebrow">
            A LITTLE MOMENT FOR YOU
          </span>

          <h2>Your feelings deserve space.</h2>

          <p>
            You don't have to change how you feel. Simply notice it, name it,
            and give yourself some kindness.
          </p>
        </div>

        <div className="mood-welcome-art" aria-hidden="true">
          ♡
        </div>
      </section>

      <form className="mood-form-card" onSubmit={saveCheckIn}>
        <div className="mood-step-label">
          <span>01</span>
          <span>HOW ARE YOU FEELING?</span>
        </div>

        <h2>Choose the mood that feels right.</h2>

        <p className="mood-helper">
          Pick whichever comes closest. You can keep it simple.
        </p>

        <div className="mood-options">
          {moods.map((mood) => (
            <button
              type="button"
              key={mood.label}
              className={`mood-option ${mood.color} ${
                selectedMood === mood.label ? "selected" : ""
              }`}
              onClick={() => handleMoodChange(mood.label)}
              aria-pressed={selectedMood === mood.label}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span>{mood.label}</span>

              {selectedMood === mood.label && (
                <span className="mood-selected-mark">✓</span>
              )}
            </button>
          ))}
        </div>

        {needsFactors && (
          <section className="mood-factors-section">
            <div className="mood-step-label">
              <span>02</span>
              <span>LET'S UNDERSTAND HOW YOU FEEL</span>
            </div>

            <h2>What's been affecting your mood?</h2>

            <p className="mood-helper">
              Choose anything that feels relevant. You can select more than
              one, and it's completely okay if you're not sure.
            </p>

            <div className="mood-factor-options">
              {moodFactors.map((factor) => (
                <button
                  type="button"
                  key={factor}
                  className={`mood-factor-chip ${
                    selectedFactors.includes(factor) ? "selected" : ""
                  }`}
                  aria-pressed={selectedFactors.includes(factor)}
                  onClick={() => toggleFactor(factor)}
                >
                  <span>
                    {selectedFactors.includes(factor) ? "✓" : "+"}
                  </span>
                  {factor}
                </button>
              ))}
            </div>

            {selectedFactors.includes("Something else") && (
              <label className="mood-other-factor">
                Tell us a little more, if you'd like

                <input
                  type="text"
                  value={otherFactor}
                  onChange={(event) => setOtherFactor(event.target.value)}
                  placeholder="Share only what you're comfortable sharing"
                  maxLength={300}
                />
              </label>
            )}

            <p className="mood-factor-reassurance">
              💗 You don't have to solve everything right now. Naming what
              you feel is already a meaningful step.
            </p>
          </section>
        )}

        <div className="mood-step-label mood-note-label">
          <span>{needsFactors ? "03" : "02"}</span>
          <span>YOUR REFLECTION (OPTIONAL)</span>
        </div>

        <label className="mood-note-field">
          <span>What's on your mind?</span>

          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Anything you'd like to acknowledge about today..."
            rows={5}
            maxLength={1000}
          />

          <small>{note.length}/1000 characters</small>
        </label>

        {message && (
          <p className="mood-feedback" role="status">
            {message}
          </p>
        )}

        <button className="mood-save-button" type="submit">
          Save my check-in <span>♡</span>
        </button>

        <p className="mood-privacy-note">
          🌿 Your reflections are saved in this browser only. This demo
          doesn't sync entries to an account or database.
        </p>
      </form>

{savedCheckIn && (
  <WellnessRecommendations
    mood={savedCheckIn.mood}
    factors={savedCheckIn.factors || []}
  />
)}


      <section className="mood-history-section">
        <div className="mood-history-heading">
          <div>
            <span className="mood-eyebrow">
              LOOKING BACK WITH KINDNESS
            </span>

            <h2>Your mood journal</h2>
          </div>

          <span className="mood-entry-count">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="mood-empty-state">
            <span>🌸</span>
            <h3>Your story starts here.</h3>

            <p>
              Your saved check-ins will appear here. Every feeling is worth
              noticing.
            </p>
          </div>
        ) : (
          <div className="mood-history-list">
            {entries.map((entry) => {
              const mood = moods.find((item) => item.label === entry.mood);

              return (
                <article className="mood-history-entry" key={entry.id}>
                  <div className="mood-history-emoji">
                    {mood?.emoji || "💗"}
                  </div>

                  <div className="mood-history-content">
                    <div className="mood-history-title">
                      <h3>{entry.mood}</h3>
                      <time dateTime={entry.date}>
                        {formatDate(entry.date)}
                      </time>
                    </div>

                    {entry.factors?.length > 0 && (
                      <div className="saved-mood-factors">
                        <strong>Factors you selected</strong>

                        <div>
                          {entry.factors.map((factor) => (
                            <span key={factor}>{factor}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.otherFactor && (
                      <p className="saved-other-factor">
                        <strong>Additional note:</strong> {entry.otherFactor}
                      </p>
                    )}

                    <p>
                      {entry.note || "No written reflection for this check-in."}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mood-delete-button"
                    onClick={() => deleteEntry(entry.id)}
                    aria-label={`Delete ${entry.mood} mood entry`}
                  >
                    Delete
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
