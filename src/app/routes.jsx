import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";
import Lobby from "../features/meeting/Lobby";
import MeetingRoom from "../features/meeting/MeetingRoom";
import ChatHome from "../features/chat/ChatHome";
import Calendar from "../features/calendar/Calendar";
import AdminDashboard from "../features/admin/AdminDashboard";
import Settings from "../features/settings/Settings";
import Recordings from "../features/recordings/Recordings";


export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* MEETING FLOW */}
      <Route path="/lobby/:id" element={<Lobby />} />
      <Route path="/meeting/:id" element={<MeetingRoom />} />

      {/* CHAT */}
      <Route path="/chat" element={<ChatHome />} />

      {/* CALENDAR */}
      <Route path="/calendar" element={<Calendar />} />

<Route path="/recordings" element={<Recordings />} />

      {/* SETTINGS */}
      <Route path="/settings" element={<Settings />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
