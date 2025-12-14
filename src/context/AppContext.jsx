import { createContext, useReducer, useEffect } from "react";
import reducer from "./reducers";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const initialState = {
    books: [], // ❗ Always empty — will be filled from books.json
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    reservations: JSON.parse(localStorage.getItem("reservations")) || [],
    user: JSON.parse(localStorage.getItem("user")) || null,
    theme: localStorage.getItem("theme") || "light",
    history: JSON.parse(localStorage.getItem("history")) || [],
   
  // NEW:
  loading: false,
  error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Save only user-related state
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    localStorage.setItem("reservations", JSON.stringify(state.reservations));
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("theme", state.theme);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
