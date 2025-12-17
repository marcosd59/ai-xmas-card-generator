import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Snowflakes from "./components/Snowflakes.jsx";

export default function App() {
  return (
    <div className="min-h-screen text-slate-900">
      <Snowflakes />
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
        <Outlet />
      </main>
    </div>
  );
}
