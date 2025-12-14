import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Layout from "../components/ui/Layout";
import Toast from "../components/ui/Toast";
import reviewsData from "../data/reviews.json";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [toastMessage, setToastMessage] = useState("");

  // Find the book
  const book = state.books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <Layout>
        <h1 className="text-red-600 text-xl font-bold">Book not found.</h1>
      </Layout>
    );
  }

  // Fetch reviews for this book
  const reviewBlock = reviewsData.find((r) => r.bookId === book.id);
  const reviews = reviewBlock ? reviewBlock.reviews : [];

  // ------------------------------
  // Reserve Book Handler
  // ------------------------------
  const handleReserve = () => {
    dispatch({
      type: "ADD_TO_RESERVATIONS",
      payload: {
        ...book,
        status: "Reserved",
        pickupDate: null,
        dueDate: null,
      },
    });

    setToastMessage("Book added to reservation list!");
  };

  // ------------------------------
  // Wishlist Handler
  // ------------------------------
  const handleWishlist = () => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: book,
    });

    setToastMessage("Book Added to Wishlist!");
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Top Section - Cover + Basic Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.cover}
            alt={book.title}
            className="aspect-3/4 object-cover rounded"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#002379]">{book.title}</h1>
            <p className="italic">{book.author}</p>

            {/* Category, Rating, Copies */}
            <p className="mt-2"><strong>Category:</strong> {book.category}</p>
            <p><strong>Rating:</strong> ⭐ {book.rating}</p>
            <p><strong>Copies Available:</strong> {book.copies}</p>

            {/* Expected Return Date — ONLY if Borrowed */}
            {book.status === "Borrowed" && (
              <p className="text-red-600 mt-2">
                <strong>Expected Return Date:</strong> {book.dueDate}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              {book.status === "Available" ? (
                <button
                  onClick={handleReserve}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Reserve Book
                </button>
              ) : null}

              <button
                onClick={handleWishlist}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Add to Wishlist
              </button>
            </div>
          </div>

          {/* Book Information Section */}
          <div className="mt-8 bg-[#FF9F66] rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-3">Book Information</h2>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Publication Year:</strong> {book.year}</p>
            <p><strong>Page Count:</strong> {book.pages}</p>
          </div>

          {/* Description */}
          <div className="mt-8 bg-[#FF9F66] rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>

          {/* User Reviews */}
          <div className="mt-10 bg-[#FF9F66] rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-4">User Reviews</h2>

            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="border-b pb-3 mb-4">
                  <p className="font-semibold">{review.user}</p>
                  <p>Rating: ⭐ {review.rating}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </Layout>
  );
}
