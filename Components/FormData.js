import React, { createContext, useState, useContext } from 'react';

const FormData = createContext();

export const useFormData = () => {
  return useContext(FormData);
};

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    habit: '',
    startDate: null,
    endDate: null,
    gainLose: '',
    priority: '',
  });

  return (
    <FormData.Provider value={{ formData, setFormData }}>
      {children}
    </FormData.Provider>
  );
};
