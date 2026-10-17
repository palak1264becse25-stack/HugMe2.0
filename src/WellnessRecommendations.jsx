
import "./WellnessRecommendations.css";

const activityLibrary = {
  "Studies or work": [
    {
      title: "The 10-minute reset",
      description:
        "Take a short break, stretch gently, drink some water, and choose one manageable next task.",
      duration: "10 minutes",
      icon: "🌿",
    },
    {
      title: "One thing at a time",
      description:
        "Write down what is on your mind and choose one small task to focus on next.",
      duration: "5 minutes",
      icon: "📝",
    },
  ],
  Family: [
    {
      title: "Make space for yourself",
      description:
        "Spend a few quiet minutes doing something comforting. You don't have to solve every disagreement today.",
      duration: "10 minutes",
      icon: "🌷",
    },
    {
      title: "Put your feelings into words",
      description:
        "Write what you wish others understood about your feelings. You can keep this note private.",
      duration: "5 minutes",
      icon: "💌",
    },
  ],
  Friendships: [
    {
      title: "Reach out to someone you trust",
      description:
        "Send a simple message to someone who makes you feel comfortable, if you feel like connecting.",
      duration: "Whenever you're ready",
      icon: "🫶",
    },
    {
      title: "Do something just for you",
      description:
        "Listen to music, draw, read, or enjoy another activity that feels like your own space.",
      duration: "15 minutes",
      icon: "🎨",
    },
  ],
  Relationship: [
    {
      title: "A little emotional breathing room",
      description:
        "Give yourself permission to pause before responding to an emotionally difficult conversation.",
      duration: "5–10 minutes",
      icon: "🌸",
    },
    {
      title: "Write without sending",
      description:
        "Write down what you wish you could say. You don't have to send the message or make a decision now.",
      duration: "10 minutes",
      icon: "📔",
    },
  ],
  Loneliness: [
    {
      title: "A small connection",
      description:
        "Consider calling a trusted person, sitting with a friend, or joining a welcoming group activity.",
      duration: "Whenever you're ready",
      icon: "🫂",
    },
    {
      title: "Find a shared-interest activity",
      description:
        "Explore an art session, book club, gentle movement class, or community workshop.",
      duration: "Your choice",
      icon: "🌻",
    },
  ],
  Health: [
    {
      title: "A gentle comfort break",
      description:
        "Choose a comfortable place to rest and do something calming that suits your energy level.",
      duration: "5–10 minutes",
      icon: "🍵",
    },
  ],
  "Anxiety or stress": [
    {
      title: "Ground yourself in the present",
      description:
        "Notice a few things you can see, hear, and feel around you. Let your attention settle at your own pace.",
      duration: "2–5 minutes",
      icon: "🌱",
    },
    {
      title: "Try a guided relaxation",
      description:
        "Explore a guided stress-management exercise from the World Health Organization.",
      duration: "At your own pace",
      icon: "🧘",
      url: "https://www.who.int/teams/mental-health-and-substance-use/treatment-care/Psychological-interventions/psychological-self-help-interventions",
      linkLabel: "Explore WHO resources",
    },
  ],
  Sleep: [
    {
      title: "Create a softer evening",
      description:
        "Try a quiet activity before bed, reduce stimulating screen content, and give yourself time to unwind.",
      duration: "15 minutes",
      icon: "🌙",
    },
  ],
  "Future worries": [
    {
      title: "Bring your focus to today",
      description:
        "Write down one thing you can influence today and one thing you can leave for another time.",
      duration: "5 minutes",
      icon: "☁️",
    },
  ],
  "Not sure": [
    {
      title: "Check in without pressure",
      description:
        "Listen to a calming piece of music or sit quietly for a few minutes. You don't have to explain every feeling.",
      duration: "5 minutes",
      icon: "💗",
    },
  ],
  "Something else": [
    {
      title: "Choose what feels supportive",
      description:
        "Consider a comforting activity you enjoy, or talk with someone you trust about what might help.",
      duration: "Your choice",
      icon: "🌼",
    },
  ],
};

const generalActivities = [
  {
    title: "A mindful pause",
    description:
      "Take a short break and notice your surroundings without judging how you feel.",
    duration: "3 minutes",
    icon: "🍃",
  },
  {
    title: "Creative expression",
    description:
      "Try drawing, journaling, music, or another creative activity without worrying about the result.",
    duration: "15 minutes",
    icon: "🎨",
  },
];

const workshops = [
  {
    title: "WHO psychological self-help resources",
    description:
      "Evidence-based resources for stress management and emotional well-being.",
    format: "Online resources",
    url: "https://www.who.int/teams/mental-health-and-substance-use/treatment-care/Psychological-interventions/psychological-self-help-interventions",
  },
  {
    title: "WHO learning webinars",
    description:
      "Explore mental health webinars and educational sessions from the World Health Organization.",
    format: "Online · Dates vary",
    url: "https://www.who.int/initiatives/who-special-initiative-for-mental-health/learning-webinars-and-other-videos",
  },
];

export default function WellnessRecommendations({
  mood,
  factors = [],
}) {
  const isLowMood = ["Sad", "Low", "Struggling", "Anxious"].includes(mood);

  const selectedActivities = [
    ...new Map(
      [
        ...factors.flatMap((factor) => activityLibrary[factor] || []),
        ...generalActivities,
      ].map((activity) => [activity.title, activity])
    ).values(),
  ].slice(0, 4);

  return (
    <section className="wellness-recommendations">
      <div className="wellness-heading">
        <span className="wellness-eyebrow">
          YOUR PERSONAL WELLNESS GUIDE
        </span>
        <h2>A few things that might help 🌷</h2>
        <p>
          Based on your check-in, here are some options to explore.
          Pick what feels useful and skip anything that doesn't.
        </p>
      </div>

      <div className="wellness-section-title">
        <span>🌱</span>
        <div>
          <h3>Activities for you</h3>
          <p>Small steps, without pressure.</p>
        </div>
      </div>

      <div className="wellness-activity-grid">
        {selectedActivities.map((activity) => (
          <article className="wellness-activity-card" key={activity.title}>
            <span className="wellness-activity-icon">
              {activity.icon}
            </span>

            <h4>{activity.title}</h4>
            <p>{activity.description}</p>
            <span className="wellness-duration">
              ⏱ {activity.duration}
            </span>

            {activity.url && (
              <a href={activity.url} target="_blank" rel="noreferrer">
                Explore resource ↗
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="wellness-section-title wellness-workshop-heading">
        <span>🌍</span>
        <div>
          <h3>Explore workshops & learning</h3>
          <p>
            Trusted starting points for online learning and well-being
            resources. Check each provider for current dates and availability.
          </p>
        </div>
      </div>

      <div className="wellness-workshop-grid">
        {workshops.map((workshop) => (
          <article className="wellness-workshop-card" key={workshop.title}>
            <span className="wellness-workshop-tag">
              {workshop.format}
            </span>

            <h4>{workshop.title}</h4>
            <p>{workshop.description}</p>

            <a href={workshop.url} target="_blank" rel="noreferrer">
              Explore resources ↗
            </a>
          </article>
        ))}
      </div>

      <section className="wellness-professional-card">
        <div className="wellness-professional-icon">💗</div>

        <div className="wellness-professional-copy">
          <span className="wellness-eyebrow">YOU DON'T HAVE TO DO IT ALONE</span>
          <h3>
            {isLowMood
              ? "Would talking to a professional help?"
              : "Want extra support for your well-being?"}
          </h3>

          <p>
            A psychologist can help you explore emotions and coping strategies.
            A psychiatrist is a medical doctor who can assess mental health
            concerns and discuss medical treatment when appropriate.
            You can choose whether to seek support.
          </p>

          <div className="wellness-professional-actions">
            <a
              href="https://telemanas.mohfw.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="wellness-primary-link"
            >
              Explore Tele-MANAS support ↗
            </a>

            <a
              href="https://www.google.com/search?q=licensed+clinical+psychologist+psychiatrist+mental+health+services"
              target="_blank"
              rel="noreferrer"
              className="wellness-secondary-link"
            >
              Explore professional services ↗
            </a>
          </div>

          <small>
            Before booking, check the professional's credentials, fees,
            privacy practices, and whether they offer online or in-person
            appointments.
          </small>
        </div>
      </section>

      <p className="wellness-disclaimer">
        These are general well-being ideas, not a diagnosis or a substitute
        for professional care. You remain in control of which options you try.
      </p>
    </section>
  );
}
