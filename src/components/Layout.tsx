import Container from "./Container";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/subjects", label: "Subjects", icon: "📚" },
  { to: "/assignments", label: "Assignments", icon: "📝" },
  { to: "/exams", label: "Exams", icon: "🧪" },
];

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">StudySync</p>
            <h1 className="text-2xl font-bold text-slate-900">Stay on top of your study life</h1>
          </div>

          <nav className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default Layout;