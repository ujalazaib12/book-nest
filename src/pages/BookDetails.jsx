import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Layout from "../components/ui/Layout";
import Toast from "../components/ui/Toast";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [toastMessage, setToastMessage] = useState("");

  // Find local book or state
  // Even if we have it in state, we might not have the reviews if listing didn't include them (though our list API currently does)
  // But let's rely on state first for speed, then maybe fetch if missing?
  // Current requirement is just "connect frontend". 
  // Backend returns Book with Reviews relation on getOne equivalent.
  // Our getAll in BooksService ALSO returns relations: ['reviews'].
  // So state.books should have reviews!

  const book = state.books.find((b) => b.id === parseInt(id));
  /* 
     If the user refreshes on this page, state.books is empty.
     We should probably handle a "loading" state or fetch individual book here.
     For now, let's just make it NOT crash if book is undefined, 
     and maybe trigger a global fetch or local fetch?
     Let's adding a specific useEffect to fetch if book is missing.
  */

  const [loadingBook, setLoadingBook] = useState(false);
  const [fetchedBook, setFetchedBook] = useState(null);

  useEffect(() => {
    if (!book && !fetchedBook) {
      setLoadingBook(true);
      fetch(`http://localhost:3000/api/books/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Book not found");
          return res.json();
        })
        .then(data => {
          setFetchedBook(data);
          setLoadingBook(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingBook(false);
        });
    }
  }, [id, book]);

  const activeBook = book || fetchedBook;

  if (loadingBook) return <Layout><div className="p-10 text-center">Loading book...</div></Layout>;

  if (!activeBook) {
    return (
      <Layout>
        <h1 className="text-red-600 text-xl font-bold p-10">Book not found (ID: {id})</h1>
      </Layout>
    );
  }

  // Use reviews from the book object itself (thanks to relations)
  const reviews = activeBook.reviews || [];

  // ------------------------------
  // Reserve Book Handler
  // ------------------------------
  const handleReserve = () => {
    dispatch({
      type: "ADD_TO_RESERVATIONS",
      payload: {
        ...activeBook,
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
      payload: activeBook,
    });

    setToastMessage("Book Added to Wishlist!");
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Top Section - Cover + Basic Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={activeBook.cover}
            alt={activeBook.title}
            className="aspect-3/4 object-cover rounded"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#002379]">{activeBook.title}</h1>
            <p className="italic">{activeBook.author}</p>

            {/* Category, Rating, Copies */}
            <p className="mt-2"><strong>Category:</strong> {activeBook.category}</p>
            <p><strong>Rating:</strong> ⭐ {activeBook.rating}</p>
            <p><strong>Copies Available:</strong> {activeBook.copies}</p>

            {/* Expected Return Date — ONLY if Borrowed */}
            {activeBook.status === "Borrowed" && (
              <p className="text-red-600 mt-2">
                <strong>Expected Return Date:</strong> {activeBook.dueDate}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              {activeBook.status === "Available" ? (
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
            <p><strong>ISBN:</strong> {activeBook.isbn}</p>
            <p><strong>Publisher:</strong> {activeBook.publisher}</p>
            <p><strong>Publication Year:</strong> {activeBook.year}</p>
            <p><strong>Page Count:</strong> {activeBook.pages}</p>
          </div>

          {/* Description */}
          <div className="mt-8 bg-[#FF9F66] rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{activeBook.description}</p>
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
