import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Assignments from "./pages/Assignments";
import Exams from "./pages/Exams";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Productivity from "./pages/Productivity";
import { checkStudyReminders } from "./utils/reminders";

function App() {
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      checkStudyReminders({ skipIfShownToday: true });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="exams" element={<Exams />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
          <Route path="productivity" element={<Productivity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;