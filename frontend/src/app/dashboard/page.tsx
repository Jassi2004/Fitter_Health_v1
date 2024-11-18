


import React from 'react';
import styles from './Dashboard.module.css';

// Dummy component for each section
const Section: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className={styles.section}>
    <h2>{title}</h2>
    <p>{children}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Section title="Progress Tracker">Charts & Graphs | Streak Counter | Goal Completion Bar</Section>
      <Section title="Workout Summary / Activity Feed">Recent Activity Feed | Workout Log</Section>
      <Section title="Upcoming Workouts / Workout Schedule">Calendar View | Upcoming Sessions</Section>
      <Section title="Leaderboard / Social Component">Leaderboard | Friend Activity Feed</Section>
      <Section title="Progress Photos / Before & After Section">Upload Photos | Photo Carousel</Section>
      <Section title="Daily Tips and Motivation">Daily Workout Tip | Quote of the Day</Section>
      <Section title="Achievements / Badges">Milestones & Badges | Level Progression</Section>
      <Section title="Nutrition / Meal Plan Tracker">Calorie & Macronutrient Tracker | Meal Suggestions</Section>
      <Section title="Personal Records / Best Performance">Personal Bests | Recent Bests</Section>
      <Section title="Favorite Workouts / Quick Access Shortcuts">Quick Links | Favorite Workouts Section</Section>
      <Section title="Workout Timer / Stopwatch">Timer | Countdown for the Next Set</Section>
      <Section title="Exercise Video Library / Tips">Demo Videos | Exercise Tips</Section>
      <Section title="Health Stats Overview">Vital Statistics | Sleep and Recovery Tracker</Section>
      <Section title="Goal Setting / Goal Adjustments">SMART Goal Setting | Goal Adjustments</Section>
      <Section title="Notification / Reminder System">Reminders | Push Notifications</Section>
      <Section title="Feedback / Journal">Workout Journal | Feedback or Notes Section</Section>
      <Section title="Customizable Dashboard Widgets">Customize Dashboard Layout</Section>
    </div>
  );
};

export default Dashboard;
