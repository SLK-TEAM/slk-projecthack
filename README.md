# Gover-Nice: Sparkfest 2025 Entry

Gover-Nice is a mobile application designed to educate users about the principles and practices of good governance through interactive lessons, quizzes, and a chatbot assistant.

## Features

- **Interactive Lessons:** Learn about good governance, transparency, accountability, participation, rule of law, and more through well-structured lesson pages.
- **Quizzes:** Test your knowledge with scenario-based quizzes and track your progress.
- **Progress Tracking:** Your lesson and quiz completion status is saved and shown in your profile.
- **Pepits Chatbot:** Ask questions and get instant answers about governance topics in English or Tagalog.
- **User Account:** Simple login and account creation for personalized progress tracking.

## Folder Structure

```
app/
  About.jsx              # About page, FAQs, developer info
  BottomNavbar.jsx       # Bottom navigation bar
  chat.tsx               # Pepits chatbot screen
  CreateAccount.jsx      # Account creation screen
  HomePage.jsx           # Main landing page
  index.jsx              # Splash/login page
  InfoPage.jsx           # List of topics/lessons
  LoadingScreen.jsx      # Loading animation
  ProfilePage.jsx        # User profile and progress
  QuizPage.jsx           # Quiz selection page
  QuizScore.jsx          # Quiz results screen
  TopBanner.jsx          # Top banner component
  LessonPages/           # All lesson content (e.g., 8_Principles, GoodvsBad, LessonTransparency, etc.)
  SlideQuizzes/          # Slide-based quizzes (e.g., PrinciplesOfGoodGovernance)
assets/                  # Images and icons
```

## How It Works

1. **Login/Register:**  
   Users start at the splash screen ([app/index.jsx](app/index.jsx)), where they can log in or create an account.

2. **Home Page:**  
   After login, users land on the [HomePage](app/HomePage.jsx), which features:
   - Quick links to lessons and quizzes
   - Progress and rewards section
   - Access to the Pepits chatbot

3. **Lessons:**  
   Lessons are organized in [LessonPages/](app/LessonPages/) and cover core governance topics. Each lesson tracks completion status using AsyncStorage.

4. **Quizzes:**  
   Users can take quizzes from [QuizPage.jsx](app/QuizPage.jsx) and [SlideQuizzes/](app/SlideQuizzes/). Quiz results are shown in [QuizScore.jsx](app/QuizScore.jsx).

5. **Progress Tracking:**  
   Completion status for lessons and quizzes is saved locally and displayed in [ProfilePage.jsx](app/ProfilePage.jsx) and [InfoPage.jsx](app/InfoPage.jsx).

6. **Pepits Chatbot:**  
   The chatbot ([chat.tsx](app/chat.tsx)) uses Google Generative AI to answer user questions about governance in English or Tagalog.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the app:**
   ```sh
   npm start
   ```
   or for Android:
   ```sh
   npm run android
   ```

3. **Environment Variables:**
   - The app uses a `.env` file for API keys (see [babel.config.js](babel.config.js) for dotenv integration).

## Technologies Used

- React Native (Expo)
- Google Generative AI (for chatbot)
- AsyncStorage (for local data)
- React Native Paper, Vector Icons, and other UI libraries

## Developers

See the [About.jsx](app/About.jsx) page for developer info and credits.

---

For more details, explore the codebase or contact the development team.
