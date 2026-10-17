
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Wind,
  BookHeart,
  Palette,
  Moon,
  Leaf,
  CheckCircle2,
  Play,
  Pause,
  Heart,
  Search,
  Video,
  CalendarDays,
  Clock3,
  Globe2,
  MapPin,
  ExternalLink,
  Sparkles,
  Flower2,
  Bookmark,
  X,
} from "lucide-react";
import "./WellnessActivities.css";

const activityList = [
  {
    id: "breathing",
    category: "Mindfulness",
    title: "Gentle breathing pause",
    description: "Follow a simple breathing animation and take a quiet moment.",
    duration: "2 minutes",
    icon: Wind,
    detail:
      "Sit comfortably if you can. Breathe gently and naturally. Stop if you feel uncomfortable or dizzy.",
  },
  {
    id: "journal",
    category: "Journaling",
    title: "Name what you're feeling",
    description: "Reflect on your feelings without judging yourself.",
    duration: "5 minutes",
    icon: BookHeart,
    detail:
      "What am I noticing right now? What might I need? What is one kind thing I can do for myself today?",
  },
  {
    id: "creative",
    category: "Creative",
    title: "A tiny creative break",
    description: "Draw, doodle, or write something just for yourself.",
    duration: "10 minutes",
    icon: Palette,
    detail:
      "Choose a colour that matches your mood and make a small doodle. There is no right or wrong result.",
  },
  {
    id: "grounding",
    category: "Mindfulness",
    title: "Notice your surroundings",
    description: "Gently bring your attention to the present moment.",
    duration: "3 minutes",
    icon: Leaf,
    detail:
      "Notice a few things around you: what you can see, hear, and physically feel. You can stop whenever you want.",
  },
  {
    id: "sleep",
    category: "Rest",
    title: "Create a wind-down ritual",
    description: "Make a little room for a calmer transition towards rest.",
    duration: "10 minutes",
    icon: Moon,
    detail:
      "Dim the lights if possible, write down something you can revisit tomorrow, and choose a quiet, comfortable activity.",
  },
];

const categories = [
  "All",
  "Mindfulness",
  "Journaling",
  "Creative",
  "Rest",
];

const videos = [
  {
    id: "breathing-video",
    title: "A gentle breathing break",
    description:
      "Explore a guided breathing exercise and take a short pause.",
    category: "Mindfulness",
    duration: "5–10 min",
    icon: Wind,
    color: "sage",
    search: "NHS breathing exercises official",
  },
  {
    id: "meditation-video",
    title: "Your first mindfulness practice",
    description:
      "Discover beginner-friendly mindfulness and meditation practices.",
    category: "Mindfulness",
    duration: "Beginner",
    icon: Flower2,
    color: "pink",
    search: "UCLA Mindful guided meditation official",
  },
  {
    id: "sleep-video",
    title: "Build a calming bedtime routine",
    description:
      "Learn about everyday habits that can support healthy sleep.",
    category: "Rest",
    duration: "5–15 min",
    icon: Moon,
    color: "cream",
    search: "NHS sleep tips official",
  },
  {
    id: "journaling-video",
    title: "Start a journaling habit",
    description:
      "Find simple prompts to help you reflect on your day.",
    category: "Self-reflection",
    duration: "5 min",
    icon: BookHeart,
    color: "pink",
    search: "guided journaling prompts wellbeing",
  },
];

const workshopIdeas = [
  {
    id: "mindfulness-workshop",
    title: "Mindfulness & Meditation",
    description:
      "Explore mindful attention, relaxation techniques, and everyday awareness.",
    format: "Online or in person",
    category: "Mindfulness",
    icon: Flower2,
    color: "sage",
  },
  {
    id: "journaling-workshop",
    title: "Journaling for Self-Discovery",
    description:
      "Use guided prompts and creative reflection to understand your thoughts.",
    format: "Online",
    category: "Creative wellbeing",
    icon: BookHeart,
    color: "pink",
  },
  {
    id: "stress-workshop",
    title: "Everyday Stress Management",
    description:
      "Learn practical ways to handle everyday demands and build helpful routines.",
    format: "Online or in person",
    category: "Life skills",
    icon: Wind,
    color: "cream",
  },
  {
    id: "art-workshop",
    title: "Creative Expression & Art",
    description:
      "Try a creative activity in a welcoming, beginner-friendly environment.",
    format: "Online or in person",
    category: "Creative wellbeing",
    icon: Palette,
    color: "sage",
  },
];

const STORAGE_KEY = "hugme-wellness-completed";
const SAVED_KEY = "hugme-wellness-saved";

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export default function WellnessActivities({ onBack }) {
  const [category, setCategory] = useState("All");
  const [completed, setCompleted] = useState(() =>
    readStorage(STORAGE_KEY, [])
  );
  const [saved, setSaved] = useState(() => readStorage(SAVED_KEY, []));
  const [activeActivity, setActiveActivity] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [breathing, setBreathing] = useState(false);
  const [workshopSearch, setWorkshopSearch] = useState("");
  const [workshopFormat, setWorkshopFormat] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {}
  }, [completed]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {}
  }, [saved]);

  const current = activityList.find(
    (activity) => activity.id === activeActivity
  );

  const visibleActivities = activityList.filter((activity) => {
    const matchesCategory =
      category === "All" || activity.category === category;
    const matchesSaved =
      !showSavedOnly || saved.includes(activity.id);

    return matchesCategory && matchesSaved;
  });

  const visibleWorkshops = workshopIdeas.filter((workshop) => {
    const matchesSearch = `${workshop.title} ${workshop.description} ${workshop.category}`
      .toLowerCase()
      .includes(workshopSearch.toLowerCase());

    const matchesFormat =
      workshopFormat === "All" ||
      workshop.format.toLowerCase().includes(workshopFormat.toLowerCase());

    return matchesSearch && matchesFormat;
  });

  function markCompleted(id) {
    setCompleted((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
    setBreathing(false);
    setActiveActivity(null);
    setJournalText("");
  }

  function toggleSaved(id) {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id]
    );
  }

  function closeActivity() {
    setActiveActivity(null);
    setBreathing(false);
    setJournalText("");
  }

  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section className="wellness-page">
      <header className="wellness-topbar">
        <button
          className="wellness-back"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <div className="wellness-mini-brand">
          <Heart size={19} />
          <span>HugMe</span>
        </div>

        <span className="wellness-topbar-label">
          YOUR WELLBEING SPACE
        </span>
      </header>

      <main className="wellness-main">
        <section className="wellness-hero">
          <div className="wellness-hero-copy">
            <span className="wellness-eyebrow">
              <Sparkles size={14} />
              A LITTLE SPACE FOR YOU
            </span>

            <h1>
              Make room for
              <br />
              <span>yourself, too.</span>
            </h1>

            <p>
              Videos, little self-care practices, and workshops to
              explore at your own pace. No pressure to do everything.
            </p>

            <div className="wellness-hero-actions">
              <button
                className="wellness-primary-btn"
                onClick={() => scrollToSection("wellness-activities")}
                type="button"
              >
                Explore activities
                <ArrowLeft className="wellness-arrow-down" size={17} />
              </button>

              <button
                className="wellness-text-btn"
                onClick={() => scrollToSection("wellness-workshops")}
                type="button"
              >
                Discover workshops
              </button>
            </div>

            <div className="wellness-hero-note">
              <Heart size={16} />
              Small steps count. Be gentle with yourself.
            </div>
          </div>

          <div className="wellness-hero-art" aria-hidden="true">
            <div className="wellness-art-orbit wellness-orbit-one" />
            <div className="wellness-art-orbit wellness-orbit-two" />

            <div className="wellness-art-card">
              <div className="wellness-art-flower">
                <Flower2 size={78} strokeWidth={1.2} />
              </div>
              <span className="wellness-art-caption">
                Your time.
                <br />
                Your pace.
              </span>
              <Heart
                className="wellness-art-heart"
                size={26}
                fill="currentColor"
              />
            </div>

            <span className="wellness-floating wellness-floating-one">
              ✿ breathe
            </span>
            <span className="wellness-floating wellness-floating-two">
              you matter ♡
            </span>
          </div>

          <div className="wellness-stats">
            <div>
              <span className="wellness-stat-number">
                {completed.length}
              </span>
              <span className="wellness-stat-label">
                Activities completed
              </span>
            </div>

            <div className="wellness-stat-divider" />

            <div>
              <span className="wellness-stat-number">
                {activityList.length}
              </span>
              <span className="wellness-stat-label">
                Practices to explore
              </span>
            </div>

            <div className="wellness-stat-divider" />

            <div>
              <span className="wellness-stat-number">
                {saved.length}
              </span>
              <span className="wellness-stat-label">
                Saved for later
              </span>
            </div>
          </div>
        </section>

        <nav className="wellness-section-nav" aria-label="Wellness sections">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => {
              setActiveTab("all");
              scrollToSection("wellness-activities");
            }}
            type="button"
          >
            <Leaf size={17} />
            Activities
          </button>

          <button
            className={activeTab === "videos" ? "active" : ""}
            onClick={() => {
              setActiveTab("videos");
              scrollToSection("wellness-videos");
            }}
            type="button"
          >
            <Video size={17} />
            Watch & Learn
          </button>

          <button
            className={activeTab === "workshops" ? "active" : ""}
            onClick={() => {
              setActiveTab("workshops");
              scrollToSection("wellness-workshops");
            }}
            type="button"
          >
            <CalendarDays size={17} />
            Workshops
          </button>
        </nav>

        {/* WATCH AND LEARN */}

        <section
          className="wellness-section"
          id="wellness-videos"
        >
          <div className="wellness-section-heading">
            <div>
              <span className="wellness-eyebrow">WATCH & LEARN</span>
              <h2>A little guidance goes a long way.</h2>
              <p>
                Find a video, get comfortable, and take what feels
                helpful to you.
              </p>
            </div>

            <span className="wellness-section-count">
              {videos.length} picks
            </span>
          </div>

          <div className="wellness-video-grid">
            {videos.map((video) => {
              const Icon = video.icon;

              return (
                <article className="wellness-video-card" key={video.id}>
                  <div
                    className={`wellness-video-art wellness-color-${video.color}`}
                  >
                    <span className="wellness-video-art-icon">
                      <Icon size={35} strokeWidth={1.5} />
                    </span>

                    <span className="wellness-video-duration">
                      {video.duration}
                    </span>

                    <span className="wellness-video-play">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </div>

                  <div className="wellness-video-body">
                    <span className="wellness-card-kicker">
                      {video.category}
                    </span>

                    <h3>{video.title}</h3>
                    <p>{video.description}</p>

                    <a
                      className="wellness-video-link"
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.search)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Find a video
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="wellness-content-note">
            Video links open YouTube search results so you can choose
            a suitable video. These are suggestions, not individually
            verified or embedded videos.
          </p>
        </section>

        {/* INTERACTIVE ACTIVITIES */}

        <section
          className="wellness-section"
          id="wellness-activities"
        >
          <div className="wellness-section-heading">
            <div>
              <span className="wellness-eyebrow">
                TRY IT YOURSELF
              </span>
              <h2>What would feel good right now?</h2>
              <p>
                Choose one small activity. You can stop or switch
                whenever you want.
              </p>
            </div>

            <button
              className={`wellness-saved-toggle ${showSavedOnly ? "active" : ""}`}
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              type="button"
            >
              <Bookmark size={16} />
              {showSavedOnly ? "Show all" : "Saved"} ({saved.length})
            </button>
          </div>

          <div
            className="wellness-filter-row"
            aria-label="Filter activities"
          >
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="wellness-activity-list">
            {visibleActivities.map((activity) => {
              const Icon = activity.icon;
              const isCompleted = completed.includes(activity.id);
              const isSaved = saved.includes(activity.id);

              return (
                <article
                  className="wellness-activity-item"
                  key={activity.id}
                >
                  <div
                    className={`wellness-activity-symbol wellness-color-${activity.id === "breathing" || activity.id === "grounding" ? "sage" : activity.id === "sleep" ? "cream" : "pink"}`}
                  >
                    <Icon size={24} strokeWidth={1.7} />
                  </div>

                  <div className="wellness-activity-content">
                    <span className="wellness-activity-category">
                      {activity.category}
                      <span>·</span>
                      <Clock3 size={13} />
                      {activity.duration}
                    </span>

                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>

                    {isCompleted && (
                      <span className="wellness-completed">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="wellness-activity-actions">
                    <button
                      className={`wellness-save-btn ${isSaved ? "saved" : ""}`}
                      onClick={() => toggleSaved(activity.id)}
                      aria-label={
                        isSaved ? "Remove saved activity" : "Save activity"
                      }
                      title={isSaved ? "Remove saved activity" : "Save for later"}
                      type="button"
                    >
                      <Bookmark
                        size={17}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>

                    <button
                      className="wellness-start-btn"
                      onClick={() => {
                        setActiveActivity(activity.id);
                        setBreathing(false);
                        setJournalText("");
                      }}
                      type="button"
                    >
                      {isCompleted ? "Try again" : "Start"}
                      <ArrowLeft className="wellness-arrow-right" size={15} />
                    </button>
                  </div>
                </article>
              );
            })}

            {visibleActivities.length === 0 && (
              <div className="wellness-empty-state">
                <Heart size={28} />
                <h3>No saved activities here yet</h3>
                <p>
                  Save an activity using the bookmark icon to find it
                  here later.
                </p>
                <button
                  className="wellness-text-btn"
                  onClick={() => {
                    setShowSavedOnly(false);
                    setCategory("All");
                  }}
                  type="button"
                >
                  Explore all activities
                </button>
              </div>
            )}
          </div>
        </section>

        {/* WORKSHOPS */}

        <section
          className="wellness-section wellness-workshops-section"
          id="wellness-workshops"
        >
          <div className="wellness-workshop-hero">
            <div>
              <span className="wellness-eyebrow">
                <Globe2 size={14} />
                LEARN TOGETHER
              </span>

              <h2>
                A space to learn,
                <br />
                <span>connect & grow.</span>
              </h2>

              <p>
                Discover wellbeing workshops and creative sessions
                that you can explore online or in your local community.
              </p>
            </div>

            <div className="wellness-workshop-decoration" aria-hidden="true">
              <CalendarDays size={63} strokeWidth={1.2} />
              <span>grow at your pace ♡</span>
            </div>
          </div>

          <div className="wellness-section-heading wellness-workshop-heading">
            <div>
              <span className="wellness-eyebrow">
                EXPLORE WORKSHOP IDEAS
              </span>
              <h2>Find something that speaks to you.</h2>
              <p>
                Explore these workshop categories and discover what
                you would like HugMe to offer.
              </p>
            </div>
          </div>

          <div className="wellness-workshop-toolbar">
            <label className="wellness-workshop-search">
              <Search size={18} />
              <input
                type="search"
                value={workshopSearch}
                onChange={(event) => setWorkshopSearch(event.target.value)}
                placeholder="Search workshops or topics..."
                aria-label="Search workshops"
              />
            </label>

            <select
              className="wellness-workshop-filter"
              value={workshopFormat}
              onChange={(event) => setWorkshopFormat(event.target.value)}
              aria-label="Filter workshop format"
            >
              <option value="All">All formats</option>
              <option value="Online">Online</option>
              <option value="In person">In person</option>
            </select>
          </div>

          <div className="wellness-workshop-grid">
            {visibleWorkshops.map((workshop) => {
              const Icon = workshop.icon;

              return (
                <article
                  className="wellness-workshop-card"
                  key={workshop.id}
                >
                  <div
                    className={`wellness-workshop-icon wellness-color-${workshop.color}`}
                  >
                    <Icon size={27} strokeWidth={1.6} />
                  </div>

                  <span className="wellness-workshop-category">
                    {workshop.category}
                  </span>

                  <h3>{workshop.title}</h3>
                  <p>{workshop.description}</p>

                  <div className="wellness-workshop-format">
                    {workshop.format === "Online" ? (
                      <Globe2 size={15} />
                    ) : (
                      <MapPin size={15} />
                    )}
                    {workshop.format}
                  </div>

                  <button
                    className="wellness-workshop-interest"
                    onClick={() => {
                      setWorkshopSearch(workshop.title);
                    }}
                    type="button"
                  >
                    Explore topic
                    <ExternalLink size={15} />
                  </button>
                </article>
              );
            })}

            {visibleWorkshops.length === 0 && (
              <div className="wellness-empty-state">
                <Search size={27} />
                <h3>No matching workshop topics</h3>
                <p>Try another search term or choose a different format.</p>
                <button
                  className="wellness-text-btn"
                  onClick={() => {
                    setWorkshopSearch("");
                    setWorkshopFormat("All");
                  }}
                  type="button"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <div className="wellness-workshop-notice">
            <Sparkles size={18} />
            <p>
              <strong>Coming next to HugMe</strong>
              <br />
              These are workshop ideas, not live event listings.
              Verified organisers, actual dates, locations, prices,
              and registration links can be added when we connect
              an event source.
            </p>
          </div>
        </section>

        <aside className="wellness-gentle-note">
          <span className="wellness-gentle-heart">
            <Heart size={23} />
          </span>
          <p>
            <strong>A gentle reminder</strong>
            <br />
            Let's heal, hug and love ourselves,
            we deserve love,
            It's okay to take a break, and it's okay to not be okay. You can come back to this space whenever you want, and you can choose any
            activity.
          </p>
        </aside>

        <footer className="wellness-footer">
          Made with care, for your little steps forward. ♡
        </footer>
      </main>

      {/* INTERACTIVE ACTIVITY PANEL */}

      {current && (
        <div
          className="wellness-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeActivity();
          }}
        >
          <section
            className="wellness-activity-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wellness-panel-title"
          >
            <button
              className="wellness-panel-close"
              onClick={closeActivity}
              aria-label="Close activity"
              type="button"
            >
              <X size={19} />
            </button>

            <span className="wellness-eyebrow">YOUR MOMENT</span>
            <h2 id="wellness-panel-title">{current.title}</h2>
            <p className="wellness-panel-detail">{current.detail}</p>

            {current.id === "breathing" && (
              <div
                className={`breathing-orb ${breathing ? "breathing-active" : ""}`}
              >
                <span>
                  {breathing ? "Breathe gently" : "Your own pace"}
                </span>
              </div>
            )}

            {current.id === "journal" && (
              <label className="wellness-journal-label">
                Your reflection
                <textarea
                  value={journalText}
                  onChange={(event) => setJournalText(event.target.value)}
                  rows={5}
                  maxLength={1500}
                  placeholder="Write as much or as little as you like..."
                />
                <small>
                  Your reflection is temporary and is not saved by
                  this prototype.
                </small>
              </label>
            )}

            {current.id === "creative" && (
              <div className="wellness-prompt-box">
                🎨 Try doodling a small shape, writing a few lines,
                or choosing colours that reflect how you feel.
              </div>
            )}

            {current.id === "grounding" && (
              <div className="wellness-prompt-box">
                Notice your surroundings gently. You might name a few
                things you see, listen for a sound, or feel your feet
                resting on the floor. There is no need to force it.
              </div>
            )}

            {current.id === "sleep" && (
              <div className="wellness-prompt-box">
                🌙 Choose one small step: dim a light, put away a
                screen for a little while, or listen to something
                relaxing.
              </div>
            )}

            <div className="wellness-panel-actions">
              {current.id === "breathing" && (
                <button
                  className="wellness-secondary-btn"
                  onClick={() => setBreathing(!breathing)}
                  type="button"
                >
                  {breathing ? <Pause size={16} /> : <Play size={16} />}
                  {breathing ? "Pause animation" : "Start animation"}
                </button>
              )}

              <button
                className="wellness-start-btn"
                onClick={() => markCompleted(current.id)}
                type="button"
              >
                <CheckCircle2 size={16} />
                Mark complete
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
