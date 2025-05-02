// HabitTracker.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type Habit = {
  name: string;
  target: number;
  progress: number;
  streak: number;
  color: string;
};

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [progress, setProgress] = useState('');

  const chartData = habits.map(h => ({
    name: h.name,
    value: h.progress,
  }));

  const COLORS = habits.map(h => h.color);

  const randomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

  const addHabit = () => {
    if (!name || !target || !progress) return;
    setHabits([
      ...habits,
      { name, target: parseInt(target), progress: parseInt(progress), streak: 0, color: randomColor() },
    ]);
    setName('');
    setTarget('');
    setProgress('');
  };

  const checkIn = (index: number, progressUpdate: number) => {
    const updatedHabits = habits.map((habit, idx) =>
      idx === index
        ? {
            ...habit,
            progress: progressUpdate,
            streak: habit.progress === habit.target ? habit.streak + 1 : habit.streak,
          }
        : habit
    );
    setHabits(updatedHabits);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="w-full px-8 py-5 bg-white shadow-md flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-blue-600">Personal Analytics & Habit Tracker</h1>
        <span className="text-sm text-gray-500">Next.js + Tailwind ✨</span>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4">

        {/* Habit Setup Form */}
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Add a New Habit</h2>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Habit Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Morning Run"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Target</label>
              <input
                type="number"
                value={target}
                onChange={e => setTarget(e.target.value)}
                placeholder="e.g., 8 hours"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Progress</label>
              <input
                type="number"
                value={progress}
                onChange={e => setProgress(e.target.value)}
                placeholder="e.g., 5"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <button
              onClick={addHabit}
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Habit
            </button>
          </div>
        </motion.section>

        {/* Habit List and Streak Tracker */}
        {habits.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Your Habits</h3>
            <div className="grid gap-4">
              {habits.map((habit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border-l-8"
                  style={{ borderColor: habit.color }}
                >
                  <div className="flex-grow">
                    <span className="font-medium">{habit.name}</span>
                    <span className="font-bold text-blue-600 ml-4">{habit.progress}/{habit.target}</span>
                    <div className="text-sm text-gray-500">Streak: {habit.streak} days</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => checkIn(idx, habit.progress + 1)}
                      className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Check In
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Pie Chart */}
        {habits.length > 0 && (
          <section className="bg-white p-6 rounded-2xl shadow-md mb-10">
            <h3 className="text-xl font-semibold mb-4">Progress Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pb-6">
        © 2025 Personal Analytics · Built with ❤️ using Next.js + Tailwind CSS · <span className="font-bold">By Kanhaiya Kumar</span>
      </footer>
    </main>
  );
}







