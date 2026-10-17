
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  LockKeyhole,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
  Video,
  X,
} from "lucide-react";
import "./Professionals.css";

const initialProfessionals = [
  {
    id: 1,
    name: "Dr. Aanya Sharma",
    title: "Clinical Psychologist",
    specialty: "Anxiety & Stress",
    experience: "8 years experience",
    qualification: "Ph.D. in Clinical Psychology",
    fee: "₹1,200",
    rating: 4.9,
    reviews: 124,
    availability: "Available today",
    color: "sage",
    initials: "AS",
    description:
      "A compassionate psychologist focused on helping people understand anxiety, manage stress, and develop healthier coping strategies.",
    languages: ["English", "Hindi", "Punjabi"],
    approach: "Cognitive Behavioural Therapy (CBT)",
  },
  {
    id: 2,
    name: "Dr. Kabir Mehta",
    title: "Counselling Psychologist",
    specialty: "Relationships & Emotions",
    experience: "6 years experience",
    qualification: "M.A. in Counselling Psychology",
    fee: "₹900",
    rating: 4.8,
    reviews: 98,
    availability: "Available tomorrow",
    color: "pink",
    initials: "KM",
    description:
      "Provides a supportive, non-judgmental space to explore emotions, relationship concerns, boundaries, and personal growth.",
    languages: ["English", "Hindi"],
    approach: "Person-centred counselling",
  },
  {
    id: 3,
    name: "Dr. Meera Kapoor",
    title: "Mental Wellness Counsellor",
    specialty: "Self-esteem & Burnout",
    experience: "5 years experience",
    qualification: "M.Sc. in Psychology",
    fee: "₹800",
    rating: 4.9,
    reviews: 86,
    availability: "Available today",
    color: "cream",
    initials: "MK",
    description:
      "Supports clients with emotional wellbeing, self-understanding, everyday stress, and building balanced routines.",
    languages: ["English", "Hindi", "Punjabi"],
    approach: "Mindfulness-based counselling",
  },
];

const specialties = [
  "All Specialties",
  "Anxiety & Stress",
  "Relationships & Emotions",
  "Self-esteem & Burnout",
];

function Professionals({ onBack, onBookAppointment }) {
  const [professionals] = useState(initialProfessionals);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] =
    useState("All Specialties");

  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const [pendingBooking, setPendingBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [successMessage, setSuccessMessage] = useState("");

  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    mode: "Online video session",
    note: "",
  });

  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: "5",
    comment: "",
  });

  const [reviews, setReviews] = useState({});
  const [reviewMessage, setReviewMessage] = useState("");

  const filteredProfessionals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return professionals.filter((professional) => {
      const matchesSearch = [
        professional.name,
        professional.title,
        professional.specialty,
        professional.approach,
      ].some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesSpecialty =
        selectedSpecialty === "All Specialties" ||
        professional.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [professionals, searchTerm, selectedSpecialty]);

  const updateBookingField = (event) => {
    const { name, value } = event.target;

    setBookingForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openBookingForm = (professional) => {
    setSelectedProfessional(professional);
    setShowBookingForm(true);
    setShowPaymentPage(false);
    setSuccessMessage("");
  };

  const submitBooking = (event) => {
    event.preventDefault();

    if (!selectedProfessional) return;

    if (!bookingForm.date || !bookingForm.time) {
      return;
    }

    const feeAmount = Number(
      selectedProfessional.fee.replace(/[^\d]/g, "")
    );

    const booking = {
      id: `demo-${Date.now()}`,
      professionalId: selectedProfessional.id,
      professionalName: selectedProfessional.name,
      professionalType: selectedProfessional.title,
      specialty: selectedProfessional.specialty,
      date: bookingForm.date,
      time: bookingForm.time,
      mode: bookingForm.mode,
      note: bookingForm.note.trim(),
      amount: feeAmount,
      status: "Pending payment",
    };

    setPendingBooking(booking);
    setShowBookingForm(false);
    setPaymentMethod("UPI");
    setShowPaymentPage(true);
  };

  const completeDemoPayment = () => {
    if (!pendingBooking) return;

    const confirmedBooking = {
      ...pendingBooking,
      status: "Payment demo completed",
      paymentMethod,
    };

    if (typeof onBookAppointment === "function") {
      onBookAppointment(confirmedBooking);
    }

    setShowPaymentPage(false);
    setPendingBooking(null);
    setSelectedProfessional(null);
    setSuccessMessage(
      "Demo payment completed! No real payment was processed, and no appointment has been verified by a professional."
    );
  };

  const cancelPayment = () => {
    setShowPaymentPage(false);
    setShowBookingForm(true);
  };

  const submitReview = (event) => {
    event.preventDefault();

    if (!selectedProfessional) return;

    if (
      !reviewForm.name.trim() ||
      !reviewForm.comment.trim()
    ) {
      setReviewMessage("Please enter your name and review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewForm.name.trim(),
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment.trim(),
    };

    setReviews((previous) => ({
      ...previous,
      [selectedProfessional.id]: [
        ...(previous[selectedProfessional.id] || []),
        newReview,
      ],
    }));

    setReviewForm({
      name: "",
      rating: "5",
      comment: "",
    });

    setReviewMessage("Thank you! Your demo review has been added.");
  };

  const closeDetails = () => {
    setSelectedProfessional(null);
    setReviewMessage("");
  };

  const displayedReviews = selectedProfessional
    ? reviews[selectedProfessional.id] || []
    : [];

  return (
    <main className="professionals-page">
      <header className="professionals-header">
        <button
          type="button"
          className="professionals-back-button"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={17} />
          <span>Back</span>
        </button>

        <div className="professionals-brand">
          <span className="professionals-brand-icon">♡</span>
          <span>HugMe</span>
        </div>

        <span className="professionals-header-label">
          YOUR WELLNESS MATTERS
        </span>
      </header>

      <section className="professionals-hero">
        <span className="professionals-eyebrow">
          YOUR SUPPORT SYSTEM
        </span>

        <h1>
          You don't have to
          <br />
          <span>figure it all out alone.</span>
        </h1>

        <p>
          Find a supportive professional and take one small step
          towards feeling better.
        </p>

        <div className="professionals-hero-note">
          <ShieldCheck size={16} />
          <span>
            A welcoming space for your mental wellbeing
          </span>
        </div>
      </section>

      <section className="professionals-content">
        <div className="professionals-section-heading">
          <div>
            <span className="professionals-eyebrow">
              FIND YOUR PERSON
            </span>
            <h2>Meet our professionals</h2>
            <p>
              Explore the demo profiles and find someone whose
              approach feels right for you.
            </p>
          </div>

          <span className="professionals-count">
            {filteredProfessionals.length} professionals
          </span>
        </div>

        <div className="professionals-toolbar">
          <label className="professionals-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search name, speciality or approach..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              aria-label="Search professionals"
            />
          </label>

          <select
            className="professionals-filter"
            value={selectedSpecialty}
            onChange={(event) =>
              setSelectedSpecialty(event.target.value)
            }
            aria-label="Filter by specialty"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        {successMessage && (
          <div
            className="professionals-success-message"
            role="status"
          >
            <CheckCircle2 size={19} />
            <span>{successMessage}</span>

            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="professionals-grid">
          {filteredProfessionals.map((professional) => (
            <article
              className="professional-card"
              key={professional.id}
            >
              <div
                className={`professional-card-top professional-${professional.color}`}
              >
                <div className="professional-avatar">
                  {professional.initials}
                </div>

                <span className="professional-availability">
                  <span className="professional-status-dot" />
                  {professional.availability}
                </span>

                <div className="professional-rating">
                  <Star size={14} fill="currentColor" />
                  <strong>{professional.rating}</strong>
                  <span>({professional.reviews})</span>
                </div>
              </div>

              <div className="professional-card-body">
                <span className="professional-specialty">
                  {professional.specialty}
                </span>

                <h3>{professional.name}</h3>

                <p className="professional-title">
                  {professional.title}
                </p>

                <div className="professional-card-meta">
                  <span>
                    <Clock size={14} />
                    {professional.experience}
                  </span>

                  <span>
                    <Video size={14} />
                    Online sessions
                  </span>
                </div>

                <p className="professional-description">
                  {professional.description}
                </p>

                <div className="professional-card-footer">
                  <div className="professional-fee">
                    <strong>{professional.fee}</strong>
                    <span>/ session</span>
                  </div>

                  <div className="professional-card-actions">
                    <button
                      type="button"
                      className="professional-details-button"
                      onClick={() =>
                        setSelectedProfessional(professional)
                      }
                    >
                      Details
                    </button>

                    <button
                      type="button"
                      className="professional-book-button"
                      onClick={() => openBookingForm(professional)}
                    >
                      Book <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="professionals-empty-state">
            <Search size={28} />
            <h3>No matching professionals found</h3>
            <p>
              Try a different search term or choose another specialty.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("All Specialties");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="professionals-disclaimer">
          <ShieldCheck size={19} />
          <p>
            <strong>A note about these profiles:</strong> The names,
            qualifications, ratings, reviews, fees, and availability
            shown here are fictional demo data for the HugMe project.
            They do not represent verified practitioners. If you need
            professional care, confirm credentials and availability
            independently.
          </p>
        </div>
      </section>

      <footer className="professionals-footer">
        <span>HugMe ♡</span>
        <p>Small steps count. Be gentle with yourself.</p>
      </footer>

      {/* Professional details modal */}
      {selectedProfessional &&
        !showBookingForm &&
        !showPaymentPage && (
          <div
            className="professional-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeDetails();
              }
            }}
          >
            <section
              className="professional-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="professional-details-title"
            >
              <button
                type="button"
                className="professional-modal-close"
                onClick={closeDetails}
                aria-label="Close professional details"
              >
                <X size={19} />
              </button>

              <div
                className={`professional-modal-profile professional-${selectedProfessional.color}`}
              >
                <div className="professional-avatar professional-avatar-large">
                  {selectedProfessional.initials}
                </div>

                <div>
                  <span className="professional-specialty">
                    {selectedProfessional.specialty}
                  </span>

                  <h2 id="professional-details-title">
                    {selectedProfessional.name}
                  </h2>

                  <p>{selectedProfessional.title}</p>

                  <div className="professional-modal-rating">
                    <Star size={14} fill="currentColor" />
                    {selectedProfessional.rating} ·{" "}
                    {selectedProfessional.reviews} demo reviews
                  </div>
                </div>
              </div>

              <div className="professional-details-section">
                <h3>About</h3>
                <p>{selectedProfessional.description}</p>
              </div>

              <div className="professional-details-section">
                <h3>Qualifications</h3>
                <p>{selectedProfessional.qualification}</p>
                <p>{selectedProfessional.experience}</p>
              </div>

              <div className="professional-details-section">
                <h3>Approach</h3>
                <p>{selectedProfessional.approach}</p>
              </div>

              <div className="professional-details-section">
                <h3>Languages</h3>
                <div className="professional-language-list">
                  {selectedProfessional.languages.map((language) => (
                    <span key={language}>{language}</span>
                  ))}
                </div>
              </div>

              <div className="professional-details-section">
                <h3>Community reviews</h3>

                {displayedReviews.length === 0 ? (
                  <p>
                    No user-submitted demo reviews yet.
                  </p>
                ) : (
                  displayedReviews.map((review) => (
                    <div
                      className="professional-review"
                      key={review.id}
                    >
                      <div className="professional-review-heading">
                        <strong>{review.name}</strong>

                        <span>
                          <Star size={12} fill="currentColor" />
                          {review.rating}/5
                        </span>
                      </div>

                      <p>{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              <form
                className="professional-review-form"
                onSubmit={submitReview}
              >
                <h3>Leave a demo review</h3>

                <label>
                  Your name
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={(event) => {
                      setReviewForm((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }));
                      setReviewMessage("");
                    }}
                    placeholder="Enter your name"
                    maxLength={60}
                    required
                  />
                </label>

                <label>
                  Rating
                  <select
                    value={reviewForm.rating}
                    onChange={(event) =>
                      setReviewForm((previous) => ({
                        ...previous,
                        rating: event.target.value,
                      }))
                    }
                  >
                    <option value="5">★★★★★ — Excellent</option>
                    <option value="4">★★★★ — Good</option>
                    <option value="3">★★★ — Average</option>
                    <option value="2">★★ — Fair</option>
                    <option value="1">★ — Poor</option>
                  </select>
                </label>

                <label>
                  Your review
                  <textarea
                    value={reviewForm.comment}
                    onChange={(event) => {
                      setReviewForm((previous) => ({
                        ...previous,
                        comment: event.target.value,
                      }));
                      setReviewMessage("");
                    }}
                    placeholder="Share your thoughts..."
                    rows={3}
                    maxLength={500}
                    required
                  />
                </label>

                {reviewMessage && (
                  <p className="professional-review-message">
                    {reviewMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="professional-book-button professional-review-submit"
                >
                  Submit demo review
                </button>
              </form>

              <div className="professional-modal-footer">
                <div className="professional-fee">
                  <strong>{selectedProfessional.fee}</strong>
                  <span>/ session</span>
                </div>

                <button
                  type="button"
                  className="professional-book-button"
                  onClick={() =>
                    openBookingForm(selectedProfessional)
                  }
                >
                  Book appointment <ArrowRight size={15} />
                </button>
              </div>
            </section>
          </div>
        )}

      {/* Appointment booking modal */}
      {showBookingForm && selectedProfessional && (
        <div
          className="professional-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowBookingForm(false);
            }
          }}
        >
          <section
            className="professional-modal professional-booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <button
              type="button"
              className="professional-modal-close"
              onClick={() => setShowBookingForm(false)}
              aria-label="Close booking form"
            >
              <X size={19} />
            </button>

            <span className="professionals-eyebrow">
              YOUR NEXT SMALL STEP
            </span>

            <h2 id="booking-title">Book your session ♡</h2>

            <p className="professional-booking-intro">
              With {selectedProfessional.name}
            </p>

            <div className="professional-booking-fee">
              <CalendarDays size={18} />
              <span>Session fee</span>
              <strong>{selectedProfessional.fee}</strong>
            </div>

            <form
              className="professional-booking-form"
              onSubmit={submitBooking}
            >
              <label>
                Appointment date
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  min={new Date().toLocaleDateString("en-CA")}
                  onChange={updateBookingField}
                  required
                />
              </label>

              <label>
                Preferred time
                <select
                  name="time"
                  value={bookingForm.time}
                  onChange={updateBookingField}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>
              </label>

              <label>
                Session type
                <select
                  name="mode"
                  value={bookingForm.mode}
                  onChange={updateBookingField}
                  required
                >
                  <option value="Online video session">
                    Online video session
                  </option>
                  <option value="Audio session">Audio session</option>
                  <option value="Chat session">Chat session</option>
                </select>
              </label>

              <label>
                Anything you'd like to share?{" "}
                <span className="professional-optional">
                  (Optional)
                </span>
                <textarea
                  name="note"
                  value={bookingForm.note}
                  onChange={updateBookingField}
                  placeholder="A short note for your session..."
                  rows={3}
                  maxLength={1000}
                />
              </label>

              <div className="professional-booking-notice">
                <ShieldCheck size={17} />
                <p>
                  This is a demo booking. Your selected time is not
                  checked against a real professional's calendar.
                </p>
              </div>

              <button
                type="submit"
                className="professional-book-button professional-booking-submit"
              >
                Continue to payment <ArrowRight size={16} />
              </button>
            </form>
          </section>
        </div>
      )}

      {/* Payment page */}
      {showPaymentPage && pendingBooking && (
        <div className="payment-page-overlay">
          <section
            className="hugme-payment-page"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-page-title"
          >
            <button
              type="button"
              className="payment-back-button"
              onClick={cancelPayment}
            >
              <ArrowLeft size={16} />
              Back to booking
            </button>

            <div className="payment-page-heading">
              <span className="professionals-eyebrow">
                HUGME CHECKOUT
              </span>

              <h2 id="payment-page-title">
                Complete your payment ♡
              </h2>

              <p>
                Review your appointment and choose a payment method.
              </p>
            </div>

            <div className="payment-appointment-summary">
              <span>YOUR APPOINTMENT</span>

              <h3>{pendingBooking.professionalName}</h3>
              <p>{pendingBooking.professionalType}</p>

              <div className="payment-summary-row">
                <span>Date</span>
                <strong>{pendingBooking.date}</strong>
              </div>

              <div className="payment-summary-row">
                <span>Time</span>
                <strong>{pendingBooking.time}</strong>
              </div>

              <div className="payment-summary-row">
                <span>Session mode</span>
                <strong>{pendingBooking.mode}</strong>
              </div>

              <div className="payment-total-row">
                <span>Total session fee</span>
                <strong>₹{pendingBooking.amount}</strong>
              </div>
            </div>

            <div className="payment-method-section">
              <h3>
                <CreditCard size={17} />
                Choose payment method
              </h3>

              {["UPI", "Card", "Net banking"].map((method) => (
                <label
                  className={`payment-method-option ${
                    paymentMethod === method
                      ? "payment-method-selected"
                      : ""
                  }`}
                  key={method}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />

                  <span>
                    <strong>{method}</strong>
                    <small>
                      {method === "UPI"
                        ? "Pay using a supported UPI app"
                        : method === "Card"
                        ? "Credit or debit card"
                        : "Pay through your bank"}
                    </small>
                  </span>
                </label>
              ))}
            </div>

            <div className="payment-demo-notice">
              <ShieldCheck size={18} />

              <p>
                <strong>Demo checkout:</strong> No real payment will
                be processed. Never enter your real card number, CVV,
                UPI PIN, or banking password into this demo. A real
                checkout must use a secure payment provider.
              </p>
            </div>

            <button
              type="button"
              className="payment-confirm-button"
              onClick={completeDemoPayment}
            >
              Simulate payment of ₹{pendingBooking.amount}
            </button>

            <p className="payment-secure-note">
              <LockKeyhole size={13} />
              Simulation only — no money will be charged.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default Professionals;
