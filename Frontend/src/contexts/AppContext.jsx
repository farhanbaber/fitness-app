import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [biometrics, setBiometrics] = useState([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addWorkout = (workout) => {
    setWorkouts((prev) => [workout, ...prev]);
    console.log('Workout added:', workout);
  };

  const addBiometric = (entry) => {
    setBiometrics((prev) => [entry, ...prev]);
    console.log('Biometric submitted:', entry);
  };

  return (
    <AppContext.Provider value={{ modalOpen, openModal, closeModal, workouts, addWorkout, biometrics, addBiometric }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

export default AppContext;
