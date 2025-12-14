export default function reducer(state, action) {
  switch (action.type) {

    // --------------------------------------
    // 1. INITIAL LOAD BOOKS FROM JSON (ONE TIME)
    // --------------------------------------
    case "SET_BOOKS":
      if (state.books.length > 0) return state; // prevent overwrite
      return { ...state, books: action.payload };


    // --------------------------------------
    // 2. ADD BOOK TO RESERVATION CART
    // --------------------------------------
    case "ADD_TO_RESERVATIONS": {
      const book = action.payload;

      // prevent duplicates
      if (state.reservations.some((item) => item.id === book.id)) {
        return state;
      }

      // max 5 books rule
      if (state.reservations.length >= 5) {
        alert("You cannot reserve more than 5 books at a time.");
        return state;
      }

      return {
        ...state,

        reservations: [...state.reservations, book],

        // mark book as reserved in catalog
        books: state.books.map((b) =>
          b.id === book.id ? { ...b, status: "Reserved" } : b
        ),
      };
    }


    // --------------------------------------
    // 3. REMOVE BOOK FROM RESERVATION CART
    // --------------------------------------
    case "REMOVE_FROM_RESERVATIONS":
      return {
        ...state,

        reservations: state.reservations.filter(
          (b) => b.id !== action.payload
        ),

        books: state.books.map((b) =>
          b.id === action.payload
            ? { ...b, status: "Available" }
            : b
        ),
      };


    // --------------------------------------
    // 4. BORROW RESERVED BOOKS (CHECKOUT)
    // Save history + lifetime counter
    // --------------------------------------
    case "BORROW_RESERVED_BOOKS": {
      const { pickupDate, dueDate, duration, user } = action.payload;

      const reservedIds = state.reservations.map((r) => r.id);

      // books that are being borrowed
      const borrowedNow = state.books.filter((b) =>
        reservedIds.includes(b.id)
      );

      return {
        ...state,

        // update catalog
        books: state.books.map((b) =>
          reservedIds.includes(b.id)
            ? {
              ...b,
              status: "Borrowed",
              pickupDate,
              dueDate,
              duration,
              extended: false,
            }
            : b
        ),

        // add borrowed books to history
        history: [...state.history, ...borrowedNow],

        // save user info and increment lifetime count
        user: {
          ...user,
          totalBorrowed:
            (state.user?.totalBorrowed || 0) + borrowedNow.length,
        },

        // clear cart
        reservations: [],
      };
    }


    // --------------------------------------
    // 5. EXTEND BORROW (ONE TIME)
    // --------------------------------------
    case "EXTEND_BORROW":
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload
            ? {
              ...b,
              extended: true,
              dueDate: new Date(
                new Date(b.dueDate).getTime() +
                7 * 24 * 60 * 60 * 1000
              )
                .toISOString()
                .split("T")[0],
            }
            : b
        ),
      };


    // --------------------------------------
    // 6. CANCEL A RESERVATION (BEFORE PICKUP)
    // --------------------------------------
    case "CANCEL_RESERVATION":
      return {
        ...state,

        reservations: state.reservations.filter(
          (r) => r.id !== action.payload
        ),

        books: state.books.map((b) =>
          b.id === action.payload
            ? { ...b, status: "Available" }
            : b
        ),
      };


    // --------------------------------------
    // 7. ADD TO WISHLIST
    // --------------------------------------
    case "ADD_TO_WISHLIST": {
      const exists = state.wishlist.some(
        (w) => w.id === action.payload.id
      );
      if (exists) return state;

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }


    // --------------------------------------
    // 8. TOGGLE THEME (NEW)
    // --------------------------------------
    case "TOGGLE_THEME": {
      const newTheme = state.theme === "light" ? "dark" : "light";
      return { ...state, theme: newTheme };
    }

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    // --------------------------------------
    // DEFAULT
    // --------------------------------------
    default:
      return state;
  }
}
