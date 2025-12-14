import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/ui/Layout";

export default function Reserve() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reservedBooks = state.reservations;

  useEffect(() => {
    try {
      // Simulate loading delay for UI feel
      const t = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(t);
    } catch (err) {
      setError("Something went wrong while loading reservations.");
      setLoading(false);
    }
  }, []);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_RESERVATIONS", payload: id });
  };

  const handleCheckout = () => {
    if (reservedBooks.length === 0) {
      setError("Your reservation cart is empty.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6 text-[#002379]">
        Reservation Cart
      </h1>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-20 text-black text-lg">
          Loading reservation cart...
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 mb-6 rounded-lg border border-red-300 dark:border-red-700">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && reservedBooks.length === 0 && (
        <div className="
          text-center text-white py-20 
          bg-[#FF9F66] 
          border border-[#E48F45]/40 dark:border-[#F5CCA0]/20 
          rounded-2xl shadow-md
        ">
          <div className="text-7xl mb-4">📭</div>
          <h2 className="text-3xl font-bold   mb-3">
            No Books Reserved
          </h2>
          <p className=" mb-6 text-lg">
            Browse the catalog and add books to your reservation cart.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#002379] hover:bg-[#FF5F00] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
          >
            Browse Books →
          </button>
        </div>
      )}

      {/* MAIN CART LIST */}
      {!loading && reservedBooks.length > 0 && (
        <div
          className="bg-[#FF9F66] rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Books in Your Reservation Cart
          </h2>

          <div className="space-y-6">
            {reservedBooks.map((book) => (
              <div
                key={book.id}
                className="
                  flex justify-between items-center 
                  bg-[#FFFAE6]
                  p-4 rounded-xl shadow-sm border 
                  border-[#E48F45]/30 dark:border-[#F5CCA0]/20
                "
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#002379]">
                    {book.title}
                  </h3>
                  <p className="text-[#994D1C] text-sm">
                    {book.author}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(book.id)}
                  className="
                    bg-red-500 hover:bg-red-600 
                    text-white px-4 py-2 rounded-lg 
                    transition-all duration-300 shadow-md
                  "
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* FOOTER BUTTON */}
          <div className="text-right mt-10">
            <button
              onClick={handleCheckout}
              className="
                bg-[#FF5F00] hover:bg-[#FF5F00]
                text-white px-8 py-3 
                rounded-lg font-semibold 
                transition-all duration-300 shadow-lg transform hover:-translate-y-0.5
              "
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
