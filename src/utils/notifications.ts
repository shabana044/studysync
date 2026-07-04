export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Notifications are not supported in this browser.");
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export function showNotification(title: string, body: string) {
  if (!("Notification" in window)) {
    alert(`${title}\n${body}`);
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/icons.svg",
    });

    // Temporary confirmation while testing
    alert(`${title}\n${body}`);

    return;
  }

  alert(`Notification permission is ${Notification.permission}`);
}