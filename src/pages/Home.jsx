import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Layout from "../components/ui/Layout";
import BookCard from "../components/BookCard";
import bookData from "../data/books.json";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");

  const Links = [
    { name: "Home", href: "/" },
    { name: "Reservations", href: "/reserve" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  useEffect(() => {
    const loadBooks = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        await new Promise((res) => setTimeout(res, 500));

        if (state.books.length === 0) {
          dispatch({ type: "SET_BOOKS", payload: bookData });
        }

        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to load books. Please try again.",
        });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    loadBooks();
  }, []);

  const filteredBooks = state.books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase());

    const matchCategory = category === "All" || book.category === category;
    return matchSearch && matchCategory;
  });

  const getCategoryCounts = (category) => {
    const categoryBooks = state.books.filter((book) => book.category === category);
    const freeBooks = categoryBooks.filter((b) => b.status === "Available").length;
    const premiumBooks = categoryBooks.length - freeBooks;
    return { free: freeBooks, premium: premiumBooks };
  };

  return (
    <Layout>
      <div className="min-h-screen">

        {/* Error Banner */}
        {state.error && (
          <div className="bg-red-100 border-l-4 border-red-600 text-red-800 px-6 py-4 mb-8 rounded-lg shadow-md">
            <span className="font-semibold">⚠️ {state.error}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {state.loading && (
          <div className="flex justify-center items-center py-32">
            <div className="h-16 w-16 border-4 border-[#FF5F00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!state.loading && (
          <>
            {/* Hero Section with Framer Motion */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.6 }}
              className="bg-[#002379] rounded-3xl overflow-hidden mb-12 shadow-2xl"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.3,
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="flex flex-col p-6"
              >
                {/* Logo and Name */}
                <motion.div
                  variants={{
                    hidden: { scale: 0.5, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 150, damping: 12 }
                    }
                  }}
                  className="flex gap-4 items-center"
                >
                  <div className="bg-[#FF9F66] rounded-lg p-2 shadow-lg transition-all duration-300">
                    <img src="/public/icons8-store-48.png" className="w-6 h-6" />
                  </div>
                  <h1 className="text-white text-2xl font-bold uppercase">BookNest</h1>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="flex justify-center items-center"
                >
                  <div className="flex gap-2">
                    {Links.map((link) => (
                      <motion.div
                        key={link.name}
                        variants={{
                          hidden: { y: -20, opacity: 0 },
                          visible: {
                            y: 0,
                            opacity: 1,
                            transition: { type: "spring", stiffness: 120, damping: 10 }
                          }
                        }}
                      >
                        <Link
                          to={link.href}
                          className="px-4 py-2 rounded-lg text-[#F5CCA0] hover:bg-[#F5CCA0] 
                                 hover:text-[#6B240C] transition-all duration-300 
                                 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Hero Text and Buttons */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.8,
                      staggerChildren: 0.2
                    }
                  }
                }}
                className="px-8 md:px-16 py-20 md:py-16 text-center"
              >
                {/* Main Heading */}
                <motion.h1
                  variants={{
                    hidden: { scale: 0.7, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 100, damping: 12 }
                    }
                  }}
                  className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                >
                  <span className="text-[#FF9F66]">Books</span>{" "}
                  <span className="text-[#FFFAE6]">for</span>{" "}
                  <span className="text-[#FF5F00]">your</span>
                  <br />
                  <span className="text-[#FF9F66]">mood</span>{" "}
                  <span className="text-[#FFFAE6]">and</span>{" "}
                  <span className="text-[#FF5F00]">mind</span>
                </motion.h1>

                {/* Buttons */}
                <motion.div
                  variants={{
                    hidden: { scale: 0.8, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 100, damping: 12 }
                    }
                  }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-5"
                >
                  <button className="bg-[#FF5F00] hover:bg-[#FF9F66] text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl">
                    Join Club
                  </button>
                  <button className="border-3 border-[#FFFAE6] text-[#FFFAE6] hover:bg-[#FFFAE6] hover:text-[#002379] px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#FF9F66]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0z" />
                    </svg>
                    Free Bundle
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Category Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              <BookCard
                noScrollTrigger={true}
                category="Fiction"
                icon="F"
                iconColor="bg-[#FF5F00]"
                counts={getCategoryCounts("Fiction")}
              />
              <BookCard
                noScrollTrigger={true}
                category="Mystery"
                icon="M"
                iconColor="bg-[#FF9F66]"
                counts={getCategoryCounts("Science")}
              />
              <BookCard
                noScrollTrigger={true}
                category="Comedy"
                icon="C"
                iconColor="bg-[#002379]"
                counts={getCategoryCounts("Self-Help")}
              />
              <BookCard
                noScrollTrigger={true}
                category="Horror"
                icon="H"
                iconColor="bg-[#FF5F00]"
                counts={getCategoryCounts("History")}
              />
            </motion.div>

            {/* Featured Books */}
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#002379] mb-3">
                Featured Books
              </h2>
              <p className="text-[#002379]/70 mb-8">
                A handpicked selection of highlighted reads
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {state.books.slice(0, 4).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    noScrollTrigger={true}
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.5, ease: "easeOut" }
                      }
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* New Arrivals */}
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#002379] mb-3">
                New Arrivals
              </h2>
              <p className="text-[#002379]/70 text-lg mb-8">
                Fresh new additions to explore
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {state.books.slice(-4).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    noScrollTrigger={true}
                    variants={{
                      hidden: { y: 50, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.5, ease: "easeOut" }
                      }
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Browse Collection Header */}
            <div className="mb-10 pb-6 border-b-4 border-[#FF5F00]">
              <h2 className="text-4xl md:text-5xl font-bold text-[#002379] mb-3">
                Browse Collection
              </h2>
              <p className="text-[#002379]/70 text-lg">
                Find your next favorite read
              </p>
            </div>

            {/* Search & Filter */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="bg-[#002379] rounded-3xl p-8 mb-12 shadow-xl border-2 border-[#FF9F66]/30"
            >
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                className="grid md:grid-cols-2 gap-8"
              >

                {/* Search Input */}
                <div>
                  <label className="block text-white  font-bold mb-3 text-lg uppercase tracking-wider">
                    Search Books
                  </label>
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="border-2 border-[#FF9F66] focus:border-[#FF5F00] focus:ring-4 focus:ring-[#FF5F00]/20 p-4 w-full rounded-xl bg-white text-[#002379] placeholder-[#002379]/50 font-medium outline-none transition-all duration-300"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-white font-bold mb-3 text-lg uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    className="border-2 border-[#FF9F66] focus:border-[#FF5F00] focus:ring-4 focus:ring-[#FF5F00]/20 p-4 rounded-xl w-full bg-white text-[#002379] font-medium cursor-pointer outline-none transition-all duration-300"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>All</option>
                    <option>Biography</option>
                    <option>Business</option>
                    <option>Fiction</option>
                    <option>Science</option>
                    <option>Self-Help</option>
                    <option>Spirituality</option>
                    <option>Technology</option>
                  </select>
                </div>
              </motion.div>

              {/* Results Count */}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
                className="mt-8 pt-6 border-t-2 border-[#FF9F66]/30 flex items-center justify-between"
              >
                <p className="text-white font-semibold text-lg">
                  Found{" "}
                  <span className="text-[#FF5F00] font-bold text-2xl px-3 py-1 bg-white rounded-lg">
                    {filteredBooks.length}
                  </span>{" "}
                  {filteredBooks.length === 1 ? "book" : "books"}
                </p>
                <button
                  onClick={() => {
                    setSearchText("");
                    setCategory("All");
                  }}
                  className="text-[#FF5F00] hover:text-white font-bold underline underline-offset-4 transition-colors duration-300"
                >
                  Clear filters
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              key={`${category}-${searchText}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  noScrollTrigger={true}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }
                  }}
                />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredBooks.length === 0 && (
              <div className="text-center py-24 bg-[#FFFAE6] rounded-3xl border-4 border-dashed border-[#FF9F66] shadow-lg">
                <div className="text-8xl mb-6">📚</div>
                <h3 className="text-4xl font-bold text-[#002379] mb-4">
                  No books found
                </h3>
                <p className="text-[#002379]/70 text-xl mb-8">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchText("");
                    setCategory("All");
                  }}
                  className="bg-[#FF5F00] hover:bg-[#FF9F66] text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-xl hover:scale-105"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}