
import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Coffee,
  Sparkles,
  Users,
  Smile,
  ArrowLeft,
  Plus,
  X,
} from "lucide-react";
import "./SpillNChill.css";

const moods = [
  { emoji: "🍵", label: "Spill tea" },
  { emoji: "😤", label: "Need to rant" },
  { emoji: "🥹", label: "Need comfort" },
  { emoji: "🤪", label: "Just yapping" },
];

const starters = [
  "Okay, so here's what happened...",
  "I need to get something off my chest.",
  "Ask me something fun!",
];

const initialPosts = [
  {
    id: 1,
    category: "College Tea",
    text: "Why is college literally a full-time drama series sometimes? 😭",
    author: "chaiandchaos",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    category: "Friendship",
    text: "Reminder that you deserve friendships where you can be yourself. 💗",
    author: "littlemoon",
    likes: 24,
    comments: 7,
  },
  {
    id: 3,
    category: "Random Yapping",
    text: "What's one tiny thing that instantly makes your day better?",
    author: "peachy",
    likes: 8,
    comments: 11,
  },
];

export default function SpillNChill({ onBack }) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMood, setSelectedMood] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [posts, setPosts] = useState(initialPosts);
  const [postInput, setPostInput] = useState("");
  const [category, setCategory] = useState("Random Yapping");
  const [likedPosts, setLikedPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  function sendMessage(text = chatInput) {
    const cleanText = text.trim();
    if (!cleanText) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        text: cleanText,
      },
    ]);

    setChatInput("");
    setActiveTab("chat");
  }

  function publishPost() {
    const cleanText = postInput.trim();
    if (!cleanText) return;

    setPosts((current) => [
      {
        id: Date.now(),
        category,
        text: cleanText,
        author: "you",
        likes: 0,
        comments: 0,
      },
      ...current,
    ]);

    setPostInput("");
    setShowPostForm(false);
    setActiveTab("lounge");
  }

  function toggleLike(id) {
    const alreadyLiked = likedPosts.includes(id);

    setLikedPosts((current) =>
      alreadyLiked
        ? current.filter((postId) => postId !== id)
        : [...current, id]
    );

    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: Math.max(
                0,
                post.likes + (alreadyLiked ? -1 : 1)
              ),
            }
          : post
      )
    );
  }

  return (
    <main className="sn-page">
      <div className="sn-shell">
        <header className="sn-topbar">
          <div className="sn-brand">
            <div className="sn-brand-icon">
              <Coffee size={23} />
            </div>
            <div>
              <h2>spill n chill<span>🍵</span></h2>
              <p>your tea. your truth. your space.</p>
            </div>
          </div>

          {onBack && (
            <button className="sn-back" onClick={onBack}>
              <ArrowLeft size={16} /> Back to HugMe
            </button>
          )}
        </header>

        <nav className="sn-tabs" aria-label="Spill N Chill navigation">
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            <Sparkles size={17} /> Your space
          </button>
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => setActiveTab("chat")}
          >
            <MessageCircle size={17} /> AI bestie
          </button>
          <button
            className={activeTab === "lounge" ? "active" : ""}
            onClick={() => setActiveTab("lounge")}
          >
            <Users size={17} /> Gossip lounge
          </button>
        </nav>

        {activeTab === "home" && (
          <>
            <section className="sn-hero">
              <div className="sn-hero-copy">
                <span className="sn-eyebrow">
                  YOUR LITTLE CORNER OF THE INTERNET ✨
                </span>
                <h1>Hiii bestie!<br />What's the tea today?</h1>
                <p>
                  Big feelings, tiny problems, wild stories, random thoughts.
                  There's room for all of it here.
                </p>
                <div className="sn-hero-buttons">
                  <button
                    className="sn-primary"
                    onClick={() => setActiveTab("chat")}
                  >
                    Let's yap <MessageCircle size={17} />
                  </button>
                  <button
                    className="sn-secondary"
                    onClick={() => setActiveTab("lounge")}
                  >
                    Enter the lounge <Coffee size={17} />
                  </button>
                </div>
              </div>
              <div className="sn-hero-art" aria-hidden="true">
                <span className="sn-sparkle one">✦</span>
                <span className="sn-sparkle two">✧</span>
                <div className="sn-teacup">🍵</div>
                <div className="sn-thought">spill it,<br />bestie!</div>
                <span className="sn-heart">♡</span>
              </div>
            </section>

            <section className="sn-section">
              <div className="sn-section-heading">
                <div>
                  <span className="sn-kicker">CHECK IN WITH YOURSELF</span>
                  <h2>What's the vibe today?</h2>
                </div>
                <Smile size={25} />
              </div>

              <div className="sn-moods">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    className={`sn-mood ${
                      selectedMood === mood.label ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedMood(mood.label);
                      setActiveTab("chat");
                      setChatInput(
                        `I'm feeling ${mood.label.toLowerCase()} today.`
                      );
                    }}
                  >
                    <span>{mood.emoji}</span>
                    {mood.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="sn-section">
              <div className="sn-section-heading">
                <div>
                  <span className="sn-kicker">WHEN WORDS ARE HARD</span>
                  <h2>Pick a conversation starter</h2>
                </div>
                <Heart size={24} />
              </div>

              <div className="sn-starters">
                {starters.map((starter) => (
                  <button
                    className="sn-starter"
                    key={starter}
                    onClick={() => sendMessage(starter)}
                  >
                    <span>{starter}</span>
                    <span className="sn-starter-arrow">↗</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="sn-kind-note">
              <Heart size={18} />
              <p>
                No perfect words needed. Be yourself, be kind, and take up space.
              </p>
            </div>
          </>
        )}

        {activeTab === "chat" && (
          <section className="sn-chat-page">
            <div className="sn-chat-heading">
              <div className="sn-avatar">🍓</div>
              <div>
                <span className="sn-kicker">YOUR CONVERSATION CORNER</span>
                <h1>Talk to your bestie</h1>
                <p>A space to get your thoughts out.</p>
              </div>
            </div>

            <div className="sn-chat-messages" aria-live="polite">
              <div className="sn-message assistant">
                <div className="sn-message-avatar">🍓</div>
                <div className="sn-message-content">
                  <span>Your AI bestie</span>
                  <p>
                    Hiii bestie! 💗 I'm here to listen. What's on your mind?
                    You can rant, gossip, celebrate, or just talk.
                  </p>
                </div>
              </div>

              {messages.map((message) => (
                <div className="sn-message user" key={message.id}>
                  <div className="sn-message-content">
                    <span>You</span>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

              {messages.length > 0 && (
                <div className="sn-demo-notice">
                  Your message has been added to this demo conversation.
                  AI responses will appear once the AI service is connected.
                </div>
              )}
            </div>

            <form
              className="sn-chat-form"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Spill it here, bestie..."
                aria-label="Write a message"
              />
              <button type="submit" aria-label="Send message">
                <Send size={19} />
              </button>
            </form>
            <p className="sn-chat-footnote">
              Be as messy or as thoughtful as you need. 💌
            </p>
          </section>
        )}

        {activeTab === "lounge" && (
          <section className="sn-lounge">
            <div className="sn-lounge-heading">
              <div>
                <span className="sn-kicker">THE COMMUNITY CORNER</span>
                <h1>The Gossip Lounge 🍵</h1>
                <p>
                  Share thoughts, join conversations, and keep it kind.
                </p>
              </div>
              <button
                className="sn-primary"
                onClick={() => setShowPostForm(true)}
              >
                <Plus size={18} /> Spill something
              </button>
            </div>

            <div className="sn-community-note">
              <Heart size={18} />
              <span>
                Use a nickname. Don't share private details about yourself or
                other people. Harmful posts should be reported.
              </span>
            </div>

            {showPostForm && (
              <div className="sn-post-form">
                <div className="sn-post-form-heading">
                  <h3>What's on your mind?</h3>
                  <button
                    className="sn-icon-button"
                    onClick={() => setShowPostForm(false)}
                    aria-label="Close post form"
                  >
                    <X size={18} />
                  </button>
                </div>
                <label htmlFor="sn-category">Choose a category</label>
                <select
                  id="sn-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>Random Yapping</option>
                  <option>College Tea</option>
                  <option>Friendship</option>
                  <option>Crush Confessions</option>
                  <option>Need Advice</option>
                </select>
                <textarea
                  value={postInput}
                  onChange={(event) => setPostInput(event.target.value)}
                  placeholder="Spill your thoughts... please protect people's privacy."
                  rows={4}
                />
                <button className="sn-primary" onClick={publishPost}>
                  Post to this demo <Send size={16} />
                </button>
                <p className="sn-chat-footnote">
                  Demo only: posts are visible in this page session, not to
                  other users.
                </p>
              </div>
            )}

            <div className="sn-post-list">
              {posts.map((post) => (
                <article className="sn-post" key={post.id}>
                  <div className="sn-post-top">
                    <div className="sn-post-avatar">☁️</div>
                    <div className="sn-post-author">
                      <strong>@{post.author}</strong>
                      <span>{post.category}</span>
                    </div>
                    <span className="sn-post-dot">✦</span>
                  </div>
                  <p className="sn-post-text">{post.text}</p>
                  <div className="sn-post-actions">
                    <button
                      className={likedPosts.includes(post.id) ? "liked" : ""}
                      onClick={() => toggleLike(post.id)}
                      aria-label={`Like post by ${post.author}`}
                    >
                      <Heart size={17} />
                      {post.likes}
                    </button>
                    <span>
                      <MessageCircle size={17} /> {post.comments} replies
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="sn-footer">
          <span>made with ♡ at HugMe</span>
          <span>your space, your pace.</span>
        </footer>
      </div>
    </main>
  );
}
