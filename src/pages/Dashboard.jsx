// 
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Layout from "../components/ui/Layout";

export default function Dashboard() {
  const { state, dispatch } = useContext(AppContext);

  const borrowedBooks = state.books.filter((b) => b.status === "Borrowed");
  const reservedBooks = state.reservations;
  const wishlist = state.wishlist;

  const lifetimeBorrowed = state.user?.totalBorrowed || 0;

  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
  };

  const extendBorrow = (id) => {
    dispatch({ type: "EXTEND_BORROW", payload: id });
    alert("Borrow period extended by 7 days!");
  };

  const cancelReservation = (id) => {
    dispatch({ type: "CANCEL_RESERVATION", payload: id });
  };

  return (
    <Layout>
      {/* PAGE HEADER */}
      <h1 className="text-4xl font-bold mb-10 text-[#002379]">
        User Dashboard
      </h1>

      {/* LIFETIME COUNTER CARD */}
      <div
        className="
        mb-10 p-6 rounded-2xl shadow-lg 
        bg-[#002379]
      "
      >
        <h2 className="text-xl font-bold text-white">
          Lifetime Borrowed Books
        </h2>
        <p className="text-5xl font-extrabold mt-3 text-[#994D1C] dark:text-[#F5CCA0]">
          {lifetimeBorrowed}
        </p>
      </div>

      {/* CURRENTLY BORROWED BOOKS */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-[#002379]">
          Currently Borrowed
        </h2>

        {borrowedBooks.length === 0 ? (
          <p className="text-black">
            You have no borrowed books at the moment.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="
                p-6 rounded-2xl shadow-lg border 
                bg-[#FF9F66]
              "
              >
                <h3 className="text-2xl font-bold text-[#002379]">
                  {book.title}
                </h3>
                <p className="text-[#002379] italic">
                  {book.author}
                </p>

                <p className="mt-3 text-[#002379]">
                  <strong>Pickup:</strong> {book.pickupDate}
                </p>

                <p className="text-[#002379]">
                  <strong>Due Date:</strong> {book.dueDate}
                </p>

                <p className="text-red-600 mt-1">
                  <strong>Days Left:</strong>{" "}
                  {calculateDaysLeft(book.dueDate)} days
                </p>

                {!book.extended ? (
                  <button
                    onClick={() => extendBorrow(book.id)}
                    className="
                    mt-4 bg-[#002379] hover:bg-[#6B240C]
                    text-[#F5CCA0] px-5 py-2 rounded-lg 
                    font-semibold shadow-md transition-all duration-300
                  "
                  >
                    Extend Borrow (7 days)
                  </button>
                ) : (
                  <p className="mt-4 text-green-600 dark:text-green-400 font-semibold">
                    Borrow Extended ✓
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RESERVATION CART */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-[#002379]">
          Pending Reservations
        </h2>

        {reservedBooks.length === 0 ? (
          <p className="text-black">
            No pending reservations.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reservedBooks.map((book) => (
              <div
                key={book.id}
                className="
                p-6 rounded-2xl shadow-lg border 
                bg-[#FF9F66]
                border-[#E48F45]/40 dark:border-[#F5CCA0]/20
              "
              >
                <h3 className="text-2xl font-bold text-[#002379]">
                  {book.title}
                </h3>
                <p className="text-[#002379] italic">
                  {book.author}
                </p>

                <button
                  onClick={() => cancelReservation(book.id)}
                  className="
                  mt-4 bg-red-600 hover:bg-red-700
                  text-white px-5 py-2 rounded-lg font-semibold 
                  shadow-md transition-all duration-300
                "
                >
                  Cancel Reservation
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* WISHLIST */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 text-[#002379]">
          Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-black">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="
                p-6 rounded-2xl shadow-lg border 
                bg-[#FF9F66]
                border-[#E48F45]/40 dark:border-[#F5CCA0]/20
              "
              >
                <h3 className="text-2xl font-bold text-[#002379]">
                  {book.title}
                </h3>
                <p className="text-[#002379] italic">
                  {book.author}
                </p>
                <p className="text-sm text-[#002379] mt-2">
                  ⭐ Rating: {book.rating}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
