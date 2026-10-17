
import { useState } from "react";
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UserRound,
  Brain,
  Stethoscope,
  LayoutDashboard,
  CalendarDays,
  MessageCircle,
  Settings,
  LogOut,
  Smile,
  UsersRound,
  ClipboardList,
  Leaf,
} from "lucide-react";

import "./App.css";

import MoodCheckIn from "./MoodCheckIn.jsx";
import Professionals from "./Professionals.jsx";
import WellnessActivities from "./WellnessActivities.jsx";
import Appointments from "./Appointments.jsx";
import SpillnChill from "./SpillnChill.jsx";

const roles = [
  {
    id: "user",
    title: "User",
    description:
      "Explore wellness tools and take care of your mental well-being.",
    icon: UserRound,
  },
  {
    id: "psychologist",
    title: "Psychologist",
    description:
      "Manage appointments, clients, and therapy sessions.",
    icon: Brain,
  },
  {
    id: "psychiatrist",
    title: "Psychiatrist",
    description:
      "Manage patient appointments and follow-up care.",
    icon: Stethoscope,
  },
];

const dashboardContent = {
  user: {
    title: "Your safe space",
    subtitle: "Every small step you take matters.",
    cards: [
      {
        title: "Mood check-in",
        description: "Take a moment to notice how you feel.",
        icon: Smile,
      },
      {
        title: "My appointments",
        description: "View your upcoming appointments.",
        icon: CalendarDays,
      },
      {
        title: "Find a professional",
        description: "Explore mental health professionals.",
        icon: UsersRound,
      },
      {
        title: "My progress",
        description: "Reflect on your wellness journey.",
        icon: ClipboardList,
      },
    ],
  },

  psychologist: {
    title: "Psychologist dashboard",
    subtitle: "Welcome to your professional workspace.",
    cards: [
      {
        title: "Appointments",
        description: "Review your upcoming sessions.",
        icon: CalendarDays,
      },
      {
        title: "My clients",
        description: "Manage your client list.",
        icon: UsersRound,
      },
      {
        title: "Messages",
        description: "View client communications.",
        icon: MessageCircle,
      },
      {
        title: "My profile",
        description: "Manage your professional profile.",
        icon: Settings,
      },
    ],
  },

  psychiatrist: {
    title: "Psychiatrist dashboard",
    subtitle: "Your workspace for patient care and follow-ups.",
    cards: [
      {
        title: "Appointments",
        description: "Review your scheduled appointments.",
        icon: CalendarDays,
      },
      {
        title: "My patients",
        description: "View your patient list.",
        icon: UsersRound,
      },
      {
        title: "Follow-ups",
        description: "Keep track of follow-up appointments.",
        icon: ClipboardList,
      },
      {
        title: "My profile",
        description: "Manage your professional profile.",
        icon: Settings,
      },
    ],
  },
};

function Brand() {
  return (
    <div className="brand">
      <span className="brand-icon">
        <Heart size={22} strokeWidth={2} />
      </span>
      <span>HugMe</span>
    </div>
  );
}

function Welcome({ onLogin, onSignup }) {
  return (
    <main className="welcome-page">
      <nav className="navbar">
        <Brand />

        <div className="nav-actions">
          <button className="button button-quiet" onClick={onLogin}>
            Log in
          </button>

          <button className="button button-primary" onClick={onSignup}>
            Get started <ArrowRight size={17} />
          </button>
        </div>
      </nav>

      <section className="hero hero-redesigned">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={15} />
            YOUR SPACE TO FEEL BETTER
          </span>

          <h1>
            A little more care.
            <br />
            <span>A little more you.</span>
          </h1>

          <p>
            Your feelings matter. Your journey matters. Find a gentle
            space to check in with yourself, explore support, and take
            life one small step at a time.
          </p>

          <div className="hero-actions">
            <button
              className="button button-primary button-large"
              onClick={onSignup}
            >
              Find your safe space <ArrowRight size={18} />
            </button>
          </div>

          <button className="hero-login-link" onClick={onLogin}>
            Already have an account? <strong>Log in</strong>
          </button>

          <div className="hero-features">
            <div>
              <span>♡</span>
              <small>Your pace, your space</small>
            </div>

            <div>
              <span>✧</span>
              <small>Gentle daily check-ins</small>
            </div>

            <div>
              <span>☘</span>
              <small>Support when you need it</small>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="art-orbit orbit-one"></div>
          <div className="art-orbit orbit-two"></div>

          <div className="art-heart">
            <Heart size={104} strokeWidth={1.15} />
          </div>

          <div className="floating-note note-one">
            <span className="note-icon">🌿</span>
            <div>
              <strong>Take a breath</strong>
              <small>You've got this.</small>
            </div>
          </div>

          <div className="floating-note note-two">
            <span className="note-icon">✨</span>
            <div>
              <strong>One day at a time</strong>
              <small>Small steps count.</small>
            </div>
          </div>

          <div className="floating-note note-three">
            <span className="note-icon">💗</span>
            <div>
              <strong>Your feelings are valid</strong>
              <small>Make space for yourself.</small>
            </div>
          </div>

          <span className="art-sparkle sparkle-one">✦</span>
          <span className="art-sparkle sparkle-two">✧</span>
          <span className="art-sparkle sparkle-three">✦</span>
        </div>
      </section>

      <footer className="welcome-footer">
        Made with care <Heart size={13} fill="currentColor" /> for your
        well-being
      </footer>
    </main>
  );
}

function AuthForm({
  mode,
  role,
  onBack,
  onSubmit,
  onSwitchMode,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleTitle =
    roles.find((item) => item.id === role)?.title || "User";

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name, email, role });
  }

  return (
    <main className="auth-page auth-page-redesigned">
      <nav className="auth-navbar">
        <Brand />

        <button className="button button-quiet" onClick={onBack}>
          <ArrowLeft size={16} /> Change role
        </button>
      </nav>

      <div className="auth-layout">
        <section className="auth-intro">
          <span className="eyebrow">
            <Sparkles size={15} /> A SPACE THAT'S YOURS
          </span>

          <h1>
            You're allowed
            <br />
            <span>to put yourself first.</span>
          </h1>

          <p>
            Take a breath. Leave the outside noise behind for a moment.
            Your HugMe journey starts with showing up for yourself.
          </p>

          <div className="auth-quote">
            <span>“</span>
            <p>
              You don't have to have it all figured out to deserve
              kindness.
            </p>
          </div>

          <div className="auth-decoration">
            <span>♡</span>
            <span>✧</span>
            <span>☘</span>
            <span>✦</span>
          </div>
        </section>

        <section className="auth-card auth-card-redesigned">
          <div className="auth-card-top">
            <span className="auth-card-icon">
              <Heart size={23} />
            </span>

            <span className="auth-role-label">
              CONTINUE AS {roleTitle.toUpperCase()}
            </span>
          </div>

          <h2>
            {mode === "signup" ? "Your space awaits." : "Welcome back."}
          </h2>

          <p className="auth-subtitle">
            {mode === "signup"
              ? "Let's make a little room for you."
              : "It's good to have you here again."}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <label>
                Full name
                <input
                  type="text"
                  placeholder="What should we call you?"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={
                  mode === "signup"
                    ? "new-password"
                    : "current-password"
                }
                minLength={6}
                required
              />
            </label>

            {role !== "user" && mode === "signup" && (
              <p className="professional-note">
                Professional accounts require identity and qualification
                verification before professional features can be enabled.
              </p>
            )}

            <button
              className="button button-primary button-full button-large auth-submit"
              type="submit"
            >
              {mode === "signup" ? "Create my space" : "Log in to HugMe"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="switch-auth">
            {mode === "signup"
              ? "Already part of HugMe?"
              : "New to HugMe?"}{" "}
            <button type="button" onClick={onSwitchMode}>
              {mode === "signup" ? "Log in" : "Sign up"}
            </button>
          </p>

          <div className="auth-card-footer">
            <Heart size={14} />
            A gentle reminder: you deserve care, too.
          </div>
        </section>
      </div>

      <footer className="welcome-footer">
        Made with care <Heart size={13} fill="currentColor" /> for your
        well-being
      </footer>
    </main>
  );
}






function Dashboard({ role, accountName, onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");

  const [appointments, setAppointments] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("hugme-appointments") || "[]"
      );
    } catch {
      return [];
    }
  });

  function saveAppointments(nextAppointments) {
    setAppointments(nextAppointments);

    try {
      localStorage.setItem(
        "hugme-appointments",
        JSON.stringify(nextAppointments)
      );
    } catch {
      // Storage may be unavailable in some browser environments.
    }
  }

  function addAppointment(appointment) {
    saveAppointments([appointment, ...appointments]);
    setActivePage("Appointments");
  }

  function cancelAppointment(id) {
    saveAppointments(
      appointments.map((item) =>
        item.id === id ? { ...item, status: "Cancelled" } : item
      )
    );
  }

  const content = dashboardContent[role] || dashboardContent.user;

  const roleTitle =
    roles.find((item) => item.id === role)?.title || "User";

  function openPage(page) {
    setActivePage(page);
  }

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Mood Check-In", icon: Smile },
    { label: "Professionals", icon: UsersRound },
    { label: "Appointments", icon: CalendarDays },
    { label: "Wellness Activities", icon: Leaf },

    // Replaced Messages with the new feature.
    ...(role === "user"
      ? [{ label: "Spill N Chill", icon: MessageCircle }]
      : [{ label: "Messages", icon: MessageCircle }]),

    { label: "Settings", icon: Settings },
  ];

  return (
    <main className="dashboard-layout">
      <aside className="sidebar">
        <Brand />

        <div className="sidebar-label">WORKSPACE</div>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`sidebar-link ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => openPage(item.label)}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}

        <div className="sidebar-bottom">
          <div className="profile-mini">
            <div className="avatar">
              {(accountName || roleTitle).charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{accountName || roleTitle}</strong>
              <small>{roleTitle}</small>
            </div>
          </div>

          <button className="sidebar-logout" onClick={onLogout}>
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <Brand />
          <span className="dashboard-role">
            {roleTitle} workspace
          </span>
        </header>

        {activePage === "Mood Check-In" && role === "user" ? (
          <MoodCheckIn onBack={() => openPage("Dashboard")} />
        ) : activePage === "Professionals" && role === "user" ? (
          <Professionals
            onBack={() => openPage("Dashboard")}
            onBookAppointment={addAppointment}
          />
        ) : activePage === "Appointments" ? (
          <Appointments
            appointments={appointments}
            onCancel={cancelAppointment}
            onBack={() => openPage("Dashboard")}
            onFindProfessional={() => openPage("Professionals")}
          />
        ) : activePage === "Wellness Activities" && role === "user" ? (
          <WellnessActivities
            onBack={() => openPage("Dashboard")}
          />
        ) : activePage === "Spill N Chill" && role === "user" ? (
          <SpillnChill
            onBack={() => openPage("Dashboard")}
          />
        ) : activePage === "Dashboard" ? (
          <>
            <div className="dashboard-welcome">
              <span className="eyebrow">
                <Sparkles size={15} /> YOUR HUGME SPACE
              </span>

              <h1>{content.title}</h1>
              <p>{content.subtitle}</p>
            </div>

            {role === "user" && (
              <section
                className="gentle-banner"
                onClick={() => openPage("Mood Check-In")}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openPage("Mood Check-In");
                  }
                }}
              >
                <div>
                  <span>TAKE A MOMENT FOR YOURSELF</span>
                  <h2>How are you feeling today?</h2>
                  <p>
                    There’s no right or wrong answer. Check in with
                    yourself.
                  </p>
                  <span className="mood-banner-link">
                    Start your check-in →
                  </span>
                </div>

                <Heart size={52} strokeWidth={1.2} />
              </section>
            )}

            <h2 className="section-heading">Your overview</h2>

            <div className="dashboard-grid">
              {content.cards.map((card) => {
                const Icon = card.icon;

                return (
                  <button
                    className="dashboard-card"
                    key={card.title}
                    onClick={() => {
                      if (
                        role === "user" &&
                        card.title === "Mood check-in"
                      ) {
                        openPage("Mood Check-In");
                      } else if (
                        role === "user" &&
                        card.title === "My appointments"
                      ) {
                        openPage("Appointments");
                      } else if (
                        role === "user" &&
                        card.title === "Find a professional"
                      ) {
                        openPage("Professionals");
                      } else if (
                        role === "user" &&
                        card.title === "My progress"
                      ) {
                        openPage("Wellness Activities");
                      } else if (card.title === "Appointments") {
                        openPage("Appointments");
                      } else {
                        alert(
                          `${card.title} will be available when we build this feature.`
                        );
                      }
                    }}
                  >
                    <span className="dashboard-card-icon">
                      <Icon size={23} />
                    </span>

                    <strong>{card.title}</strong>
                    <p>{card.description}</p>

                    <span className="card-arrow">
                      <ArrowRight size={17} />
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="dashboard-disclaimer">
              {role === "user"
                ? "HugMe supports well-being, but it does not replace professional care or emergency help."
                : "Demo dashboard only. Patient/client records and professional tools must be secured by a verified backend."}
            </p>
          </>
        ) : (
          <section className="dashboard-welcome">
            <span className="eyebrow">
              <Sparkles size={15} /> COMING SOON
            </span>

            <h1>{activePage}</h1>

            <p>
              We're building this part of HugMe next. Your dashboard is
              still right here whenever you need it.
            </p>

            <button
              className="button button-primary"
              onClick={() => openPage("Dashboard")}
            >
              ← Back to dashboard
            </button>
          </section>
        )}
      </section>
    </main>
  );
}

function RoleSelector({
  mode,
  selectedRole,
  setSelectedRole,
  onContinue,
  onBack,
}) {
  return (
    <main className="auth-page">
      <div className="auth-top">
        <Brand />
      </div>

      <section className="auth-card role-card">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={17} /> Change role
        </button>

        <span className="eyebrow">
          <Sparkles size={14} /> LET'S GET YOU STARTED
        </span>

        <h1>
          {mode === "signup" ? "Create your space" : "Welcome back"}
        </h1>

        <p className="auth-subtitle">
          First, tell us how you'll be using HugMe.
        </p>

        <div className="role-list">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                type="button"
                key={role.id}
                className={`role-option ${
                  selectedRole === role.id ? "selected" : ""
                }`}
                onClick={() => setSelectedRole(role.id)}
                aria-pressed={selectedRole === role.id}
              >
                <span className="role-icon">
                  <Icon size={23} />
                </span>

                <span className="role-copy">
                  <strong>{role.title}</strong>
                  <small>{role.description}</small>
                </span>

                <span className="role-radio">
                  {selectedRole === role.id ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>

        <button
          className="button button-primary button-full button-large"
          onClick={onContinue}
          disabled={!selectedRole}
        >
          Continue <ArrowRight size={17} />
        </button>

        <p className="privacy-note">
          <Heart size={14} />
          Your well-being deserves a thoughtful space.
        </p>
      </section>
    </main>
  );
}


export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [mode, setMode] = useState("login");
  const [selectedRole, setSelectedRole] = useState("user");
  const [accountName, setAccountName] = useState("");

  function startAuth(nextMode) {
    setMode(nextMode);
    setSelectedRole("user");
    setScreen("role");
  }

  function continueToForm() {
    if (selectedRole) {
      setScreen("form");
    }
  }

  function handleDemoSubmit(account) {
    setAccountName(
      account.name || account.email.split("@")[0] || "Friend"
    );
    setScreen("dashboard");
  }

  function logout() {
    setAccountName("");
    setScreen("welcome");
    setSelectedRole("user");
  }

  if (screen === "welcome") {
    return (
      <Welcome
        onLogin={() => startAuth("login")}
        onSignup={() => startAuth("signup")}
      />
    );
  }

  if (screen === "role") {
    return (
      <RoleSelector
        mode={mode}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        onContinue={continueToForm}
        onBack={() => setScreen("welcome")}
      />
    );
  }

  if (screen === "form") {
    return (
      <AuthForm
        mode={mode}
        role={selectedRole}
        onBack={() => setScreen("role")}
        onSubmit={handleDemoSubmit}
        onSwitchMode={() =>
          setMode(mode === "signup" ? "login" : "signup")
        }
      />
    );
  }

  return (
    <Dashboard
      role={selectedRole}
      accountName={accountName}
      onLogout={logout}
    />
  );
}
