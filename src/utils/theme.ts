export const THEME_KEY = "studysync-theme";

export type ThemeOption = "light" | "dark" | "system";

export function getStoredTheme(): ThemeOption {
  if (typeof window === "undefined") {
    return "system";
  }

  return (window.localStorage.getItem(THEME_KEY) as ThemeOption | null) ?? "system";
}

export function applyTheme(theme: ThemeOption) {
  if (typeof window === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  if (theme === "dark") {
    root.classList.add("dark");
    root.style.setProperty("--color-bg", "#020617");
    root.style.setProperty("--color-surface", "#0f172a");
    root.style.setProperty("--color-primary", "#22c55e");
    root.style.setProperty("--color-secondary", "#60a5fa");
    root.style.setProperty("--color-accent", "#f59e0b");
    root.style.setProperty("--color-success", "#4ade80");
    root.style.setProperty("--color-danger", "#f87171");
    root.style.setProperty("--color-text", "#f8fafc");
    root.style.setProperty("--color-muted", "#94a3b8");
    root.style.setProperty("--color-border", "#1e293b");
    return;
  }

  if (theme === "light") {
    root.classList.remove("dark");
    root.style.setProperty("--color-bg", "#f8fafc");
    root.style.setProperty("--color-surface", "#ffffff");
    root.style.setProperty("--color-primary", "#16a34a");
    root.style.setProperty("--color-secondary", "#2563eb");
    root.style.setProperty("--color-accent", "#f59e0b");
    root.style.setProperty("--color-success", "#22c55e");
    root.style.setProperty("--color-danger", "#ef4444");
    root.style.setProperty("--color-text", "#0f172a");
    root.style.setProperty("--color-muted", "#64748b");
    root.style.setProperty("--color-border", "#e2e8f0");
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.toggle("dark", prefersDark);
  root.style.setProperty("--color-bg", prefersDark ? "#020617" : "#f8fafc");
  root.style.setProperty("--color-surface", prefersDark ? "#0f172a" : "#ffffff");
  root.style.setProperty("--color-primary", prefersDark ? "#22c55e" : "#16a34a");
  root.style.setProperty("--color-secondary", prefersDark ? "#60a5fa" : "#2563eb");
  root.style.setProperty("--color-accent", "#f59e0b");
  root.style.setProperty("--color-success", prefersDark ? "#4ade80" : "#22c55e");
  root.style.setProperty("--color-danger", prefersDark ? "#f87171" : "#ef4444");
  root.style.setProperty("--color-text", prefersDark ? "#f8fafc" : "#0f172a");
  root.style.setProperty("--color-muted", prefersDark ? "#94a3b8" : "#64748b");
  root.style.setProperty("--color-border", prefersDark ? "#1e293b" : "#e2e8f0");
}

export function setTheme(theme: ThemeOption) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event("studysync-theme-change"));
}
