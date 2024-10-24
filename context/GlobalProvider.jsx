import React, { createContext, useState, useContext, useEffect } from 'react';
import { firebase } from '../config/firebase';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

  const value = {
    user,
    setUser,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;