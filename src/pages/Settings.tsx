import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { applyTheme, getStoredTheme, setTheme, type ThemeOption } from "../utils/theme";

function SettingsPage() {
  const [theme, setThemeState] = useState<ThemeOption>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleThemeChange(nextTheme: ThemeOption) {
    setTheme(nextTheme);
    setThemeState(nextTheme);
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" />

      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)] dark:text-slate-100">Appearance</h2>
            <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">Choose how StudySync should look across the app.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value as ThemeOption)}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  theme === option.value
                    ? "border-[var(--color-primary)] bg-green-50 text-[var(--color-primary)] dark:bg-slate-800"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <p className="font-semibold">{option.label}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-slate-300">
                  {option.value === "light" && "Use the light interface"}
                  {option.value === "dark" && "Use the dark interface"}
                  {option.value === "system" && "Match your device setting"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;
