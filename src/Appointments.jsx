import { CalendarDays, Clock3, Video, MapPin, XCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import "./Appointments.css";

export default function Appointments({ appointments = [], onCancel, onBack, onFindProfessional }) {
  const now = new Date();
  const upcoming = appointments.filter((item) => item.status !== "Cancelled" && new Date(`${item.date}T${item.time || "23:59"}:00`) >= now)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  const past = appointments.filter((item) => item.status === "Cancelled" || new Date(`${item.date}T${item.time || "23:59"}:00`) < now);

  function appointmentCard(item) {
    return <article className="appointment-card" key={item.id}>
      <div className="appointment-date-badge"><CalendarDays size={19}/><strong>{item.date}</strong></div>
      <div className="appointment-info"><span className="appointment-type">{item.professionalType || "Professional"}</span><h2>{item.professionalName}</h2><p><Clock3 size={14}/>{item.time}</p><p>{item.mode === "Online" ? <Video size={14}/> : <MapPin size={14}/>} {item.mode}</p>{item.note && <p className="appointment-note">Note: {item.note}</p>}</div>
      <div className="appointment-actions"><span className={`appointment-status ${item.status === "Cancelled" ? "cancelled" : "booked"}`}>{item.status || "Booked"}</span>{item.status !== "Cancelled" && new Date(`${item.date}T${item.time || "23:59"}:00`) >= now && <button onClick={() => onCancel(item.id)}><XCircle size={15}/> Cancel</button>}</div>
    </article>;
  }

  return <section className="appointments-page">
    <button className="appointments-back" onClick={onBack}><ArrowLeft size={16}/> Dashboard</button>
    <span className="appointments-eyebrow">YOUR SUPPORT, ORGANIZED</span><h1>My appointments <span>♡</span></h1>
    <p className="appointments-intro">Keep track of appointments you book through HugMe.</p>
    <div className="appointments-section-head"><h2>Upcoming appointments</h2><span>{upcoming.length}</span></div>
    {upcoming.length ? <div className="appointments-list">{upcoming.map(appointmentCard)}</div> : <div className="appointments-empty"><CalendarDays size={29}/><h3>No upcoming appointments yet</h3><p>When you book a professional, your appointment will appear here.</p><button className="appointment-find-button" onClick={onFindProfessional}>Find a professional</button></div>}
    {past.length > 0 && <><div className="appointments-section-head past-heading"><h2>Past & cancelled</h2><span>{past.length}</span></div><div className="appointments-list">{past.map(appointmentCard)}</div></>}
    <p className="appointments-disclaimer">Prototype note: these bookings are saved in this browser only. They are not sent to a provider and do not represent confirmed clinical appointments.</p>
  </section>;
}
