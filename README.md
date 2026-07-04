# StudySync

StudySync is a student planner web app built to help students manage subjects, assignments, exams, attendance, productivity, reminders, and study goals in one place.

## Live Demo

Replace this with your live Vercel link:

```text
https://studysync-three-mauve.vercel.app/
```

## Features

- Dashboard overview
- Subject management
- Attendance tracking
- Assignment planner
- Exam planner
- Calendar view
- Productivity tools
- Daily planner
- Pomodoro timer
- Goals and streak tracking
- Dark mode
- Browser notifications
- PWA install support
- Export and import backup
- Reset data option
- LocalStorage data persistence

## Data Storage and Privacy

StudySync is a frontend-only app. It does not use a backend or database.

All user data is stored locally in the browser using LocalStorage. This means each user gets their own separate data on their own device/browser.

For example, if another student opens the StudySync link on their laptop, resets the app, and adds their own subjects or assignments, it will only affect their browser. It will not change the data on my device.

Because data is stored locally, users can export and import backups using the backup feature in the Settings page.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- LocalStorage
- PWA / Service Worker

## Pages

- Dashboard
- Subjects
- Assignments
- Exams
- Calendar
- Productivity
- Settings

## Installation

Clone the repository:

```bash
git clone https://github.com/shabana044/studysync.git
```

Go to the project folder:

```bash
cd studysync
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Purpose

This project was created as a practical student productivity app and portfolio project. It focuses on real student needs such as attendance tracking, assignment planning, exam preparation, calendar organization, productivity tools, and local data backup.

The app is designed so that anyone can open the live link and use it as their own planner. Since the data is stored locally in each browser, every user can maintain their own separate study data.

## Author

Shabana P  
B.Tech Information Technology Student  
Cochin University of Science and Technology