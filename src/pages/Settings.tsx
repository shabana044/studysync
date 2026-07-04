import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import {
  applyTheme,
  getStoredTheme,
  setTheme,
  type ThemeOption,
} from "../utils/theme";
import {
  requestNotificationPermission,
  showNotification,
} from "../utils/notifications";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}

function SettingsPage() {
  const [theme, setThemeState] = useState<ThemeOption>(() => getStoredTheme());
  const [canInstall, setCanInstall] = useState(false);
  const [installLabel, setInstallLabel] = useState("Install StudySync");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      window.deferredPrompt = event as BeforeInstallPromptEvent;
      setCanInstall(true);
      setInstallLabel("Install StudySync");
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!window.deferredPrompt) {
      setInstallLabel("This browser does not support installation yet");
      return;
    }

    window.deferredPrompt.prompt();
    const result = await window.deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      setInstallLabel("StudySync installed");
    } else {
      setInstallLabel("Install cancelled");
    }

    window.deferredPrompt = undefined;
    setCanInstall(false);
  }

  function handleThemeChange(nextTheme: ThemeOption) {
    setTheme(nextTheme);
    setThemeState(nextTheme);
  }

  async function handleTestNotification() {
    const permission = await requestNotificationPermission();

    if (permission === "granted") {
      showNotification(
        "StudySync Reminder",
        "Notifications are working successfully!"
      );
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" />

      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)] dark:text-slate-100">
              Install
            </h2>
            <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">
              Install StudySync to launch it like a desktop or mobile app.
            </p>
          </div>

          <button
            onClick={handleInstall}
            disabled={!canInstall}
            className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {installLabel}
          </button>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)] dark:text-slate-100">
              Notifications
            </h2>
            <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">
              Test browser notifications for reminders and study alerts.
            </p>
          </div>

          <button
            onClick={handleTestNotification}
            className="rounded-xl bg-[var(--color-primary)] px-4 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Test Notification
          </button>
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)] dark:text-slate-100">
              Appearance
            </h2>
            <p className="text-sm text-[var(--color-muted)] dark:text-slate-300">
              Choose how StudySync should look across the app.
            </p>
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