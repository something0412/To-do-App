# To-do Mobile Applicaion

A To-do Task Manager Mobile Applicaion built with React Native with minimal interface that helps users to organize and manage tasks easily

## Demo

<img src='./demo.gif' title='Video Demo' width='' alt='Video Demo' />

## Features

- **Home Tab (Daily):**
    - Add and manage tasks scheduled for specific times during the day
    - Automatically **refreshes every day**
    - Only keeps incomplete tasks when a new day starts
    - Clean UI for **quick daily planning** and task updates
- **Scheduled Tab:**
    - Stores tasks that have **specific calendar dates**
    - **Minimal** and simple interface for easy visual scanning
    - Designed for long-term or future-dated tasks (events, reminders, deadlines)
- **Routines Tab:**
    - Contains two sub-tabs: **_Mission_** and **_Streaks_**
    - Designed for **habits and routines** that must be done every day
    - Encourages consistent daily performance
    - Displays streak tracking grids for **each mission task**
    - Shows the user’s consistency across days
    - Helps visualize progress and maintain motivation

## Tech Stack

- Expo / React Native
- TypeScript
- AsyncStorage
- Nativewind / Tailwind CSS

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

1. Clone the repository:

```bash
  git clone https://github.com/something0412/To-do-App
  cd TodoApp
```

2. Install dependencies:

```bash
  npm install
```

3. Start project

```bash
  npx expo start
```

4. Scan the provided QR code and use the app

## Project Structure

```bash
TodoApp/
    ├── app/
    │   ├── (tabs)/
    │   │   ├── _layout.tsx         # main navigation layout
    │   │   ├── index.tsx           # Home tab
    │   │   ├── routines.tsx        # Routines tab
    │   │   └── scheduled.tsx       # Scheduled Tasks tab
    │   ├── _layout.tsx             # root layout
    │   └── globals.css
    ├── assets/
    ├── components/                 # UI components
    ├── constants/                  # centralized icon exports
    ├── functions
    │   ├── asyncStorage.ts         # storage utilities
    │   └── sortTasks.ts            # sorting logic
    └── types/
        ├── images.d.ts
        └── mainTypes.ts            # global TypeScript types
```

## Future Improvement

- Expand support for additional platforms (Android, Web)
- Enhance UI/UX with smoother animations and refined layouts
- Add backend integration for cloud syncing and multi-device support

## License

[MIT](https://github.com/something0412/To-do-App/blob/main/LICENSE)
