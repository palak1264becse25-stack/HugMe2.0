HugMe feature update files

Files:
- App.jsx (patched from the App.jsx you provided)
- Professionals.jsx / Professionals.css
- Appointments.jsx / Appointments.css
- WellnessActivities.jsx / WellnessActivities.css

Install/use:
1. Back up your existing src/App.jsx.
2. Copy all seven files into your project's src/ folder, replacing App.jsx with the patched version.
3. Keep your existing App.css and MoodCheckIn files unchanged.
4. Ensure lucide-react is installed: npm install lucide-react
5. Start Vite: npm run dev

Prototype limitations:
- Professional profiles, qualifications, fees, and slots are fictional demo entries and clearly labelled as such.
- Bookings and activity completion are stored in localStorage on this browser only.
- No actual appointment is sent to a provider. Real providers must be verified, and real booking requires a backend, secure authentication, and live availability.
- The journal input is intentionally not persisted in this prototype.
