import React, { createContext, useContext, useState } from 'react';

const TranslationContext = createContext();

export const useTranslationContext = () => {
  return useContext(TranslationContext);
};

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState({
    Language: 'Language',
    Back: 'Back',
    Welcome: 'Welcome',
    TodayIs: 'Today is',
    TodaysActivity: "Today's Activity:",
    CreateActivity: 'Create Activity',
    NoActivity: 'No Activity',
    Activity: 'Activity - ',
    StartDate: 'Start Date: ',
    EndDate: 'End Date: ',
    Type: 'Type: ',
    Priority: 'Priority: ',
    Habit: 'Habit: ',
    SelectHabit: 'Select Habit: ',
    EnterHabit: 'Enter Habit ',
    Cancel: 'Cancel',
    Submit: 'Submit',
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
    GainOrLose: 'Gain/Lose',
    Gain: 'Gain',
    Lose: 'Lose',
    Details: 'Details: ',
    Goal: 'Goal: ',
    Completed: 'Completed',
    Progress: 'Progress: ',
    Score: 'Score: ',
    CompletedActivities: 'Completed Activities: ',
    PriorityScore: 'Priority Score',
    ViewProfile: 'View Profile',
    DarkMode: 'Dark Mode',
    Notification: 'Notification',
    FAQs: 'FAQs',
    ContactUs: 'Contact Us',
    ReviewAndSupport: 'Review & Support',
    FirstName: 'First Name: ',
    LastName: 'Last Name: ',
    Email: 'Email: ',
    Country: 'Country: ',
    Edit: 'Edit',
    EditProfile: 'Edit Profile',
    Update: 'Update',
    Theme: 'Theme ',
    TurnOnNotification: 'Turn on notifications',
    TurnOnDarkMode: 'Turn on Dark Mode',
    DailyActivityCompleted: 'Daily Activity Completed?',
    Yes: 'Yes',
    No: 'No',
    HabitHub: "HabitHub",
    Home: "Home",
    Form: "Form",
    CustomActivity: "Custom Activity",
    Detail: "Detail",
    Overall: "Overall",
    Settings: "Settings",
    optionLanguage: "Select Language: ",
    NoActivityCompleted: "No completed activities yet."
  });

  const updateTranslations = (newTranslations) => {
     setTranslations(newTranslations);
   };

  return (
    <TranslationContext.Provider value={{ translations, updateTranslations }}>
      {children}
    </TranslationContext.Provider>
  );
};
