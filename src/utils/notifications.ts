export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Notifications are not supported in this browser.");
    return "unsupported";
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export function showNotification(title: string, body: string) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/icon-192.png",
    });
  }
}