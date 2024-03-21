import React, { createContext, useContext, useState } from 'react';

const HabitProgress = createContext();

export const HabitProvider = ({ children }) => {
  const [completedDates, setCompletedDates] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [habitData, setHabitData] = useState({});

  return (
    <HabitProgress.Provider value={{ completedDates, setCompletedDates, markedDates, setMarkedDates }}>
      {children}
    </HabitProgress.Provider>
  );
};

export const useHabitContext = () => {
  return useContext(HabitProgress);
};
