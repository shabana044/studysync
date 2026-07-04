import Container from "./Container";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "◉" },
  { to: "/subjects", label: "Subjects", icon: "◌" },
  { to: "/assignments", label: "Assignments", icon: "◍" },
  { to: "/exams", label: "Exams", icon: "◎" },
  { to: "/calendar", label: "Calendar", icon: "◷" },
  { to: "/settings", label: "Settings", icon: "⚙" },
  { to: "/productivity", label: "Productivity", icon: "✦" },
];

function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-primary)]">StudySync</p>
              <h1 className="text-xl font-semibold text-[var(--color-text)] sm:text-2xl dark:text-slate-100">Stay organized, study smarter</h1>
            </div>
          </div>

          <nav className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--color-primary)] text-white shadow-sm"
                        : "text-[var(--color-muted)] hover:bg-green-50 hover:text-[var(--color-primary)] dark:hover:bg-slate-700 dark:hover:text-slate-100"
                    }`
                  }
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
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