# Moodaily

**Moodaily** is a single-page mood journal application built with **JavaScript** and **React** as a second-year university project. **Bootstrap 5** was used for styling and responsive layout.

## Overview

The app allows users to:

* Add, view, edit, and delete mood entries
* Select moods using visual indicators (emojis or color tags)
* Persist data using **LocalStorage**
* Enjoy a clean and responsive interface powered by Bootstrap

## Tech Stack

* **React (Create React App / Vite)**
* **JavaScript (ES6+)**
* **Bootstrap 5**
* **LocalStorage** (for basic data persistence)

## Features

1. **Mood Entry Management**

   * Choose a date
   * Select a mood (emoji or color-based)
   * Add optional comments

2. **Entry List**

   * Chronological display of all entries
   * Edit and delete functionality

3. **Responsive UI**

   * Built with Bootstrap grid and components
   * Works smoothly across desktop and mobile screens

## Project Structure

```
/src
├── components/     # UI components like MoodEntryForm, MoodList, MoodItem
├── services/       # LocalStorage interactions (e.g., moodStorage.js)
├── styles/         # Custom styles (Bootstrap overrides if any)
├── App.js          # Root component
├── index.js        # Entry point
└── ...
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/niksanhts/moodaily-frontend.git
   cd moodaily-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Timeline

The project was completed in **approximately 7–10 days**, including UI/UX design, development, and testing.

## What I Learned

* Building a fully functional **SPA** with React
* Component-driven design and state management
* Responsive layouts using **Bootstrap**
* Working with **LocalStorage**
* Applying clean and minimalistic **UX/UI** principles
