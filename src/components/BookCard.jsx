import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function BookCard(props) {
  const isCategoryCard = props.category && props.counts;
  const book = props.book;
  const { noScrollTrigger, variants } = props;

  const defaultCardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const cardVariants = variants || defaultCardVariants;

  const motionProps = noScrollTrigger ? {} : {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.4 }
  };

  // ============================================
  // MODE 1: CATEGORY CARD (No white background)
  // ============================================
  if (isCategoryCard) {
    const { category, icon, iconColor, counts } = props;

    const iconVariants = {
      hidden: { scale: 0, rotate: -180 },
      visible: {
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }
    };

    const contentVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, duration: 0.4 }
      }
    };

    return (
      <motion.div
        variants={cardVariants}
        {...motionProps}
        className="bg-[#FF9F66] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#FF9F66]/30"
      >

        {/* Icon Circle */}
        <motion.div
          variants={iconVariants}
          className={`${iconColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg`}
        >
          <span className="text-white text-3xl font-bold">{icon}</span>
        </motion.div>

        {/* Content Wrapper */}
        <motion.div variants={contentVariants}>
          {/* Category Name */}
          <h3 className="text-[#002379] text-2xl font-bold mb-6">
            {category}
          </h3>

          {/* Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#002379]/70 text-sm font-semibold">
                Free Books
              </span>
              <span className="bg-[#FFFAE6] text-[#002379] text-sm font-bold px-4 py-2 rounded-full border-2 border-[#FF9F66]/30">
                {counts.free}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#002379]/70 text-sm font-semibold">
                Premium
              </span>
              <span className="bg-[#FFFAE6] text-[#002379] text-sm font-bold px-4 py-2 rounded-full border-2 border-[#FF9F66]/30">
                {counts.premium}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // ============================================
  // MODE 2: BOOK CARD (No white background)
  // ============================================
  return (
    <motion.div
      variants={cardVariants}
      {...motionProps}
    >
      <Link to={`/book/${book.id}`}>
        <div className="bg-[#FF9F66] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#FF9F66]/30">

          {/* Book Cover Image */}
          <div className="aspect-3/4 w-full overflow-hidden">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Content Section */}
          <div className="p-5">
            <div className="flex flex-col">
              {/* Book Title */}
              <h3 className="text-[#002379] font-bold text-base md:text-lg line-clamp-2">
                {book.title}
              </h3>

              {/* Author */}
              <p className="text-[#002379]/60 text-sm font-medium">
                {book.author}
              </p>
            </div>

            {/* Status + Rating Row */}
            <div className="flex items-center justify-between pt-3 border-t-2 border-[#FF9F66]/20">
              <span
                className={`text-xs font-bold px-4 py-2 rounded-full 
                  ${book.status === "Available" ? "bg-green-100 text-green-700 border-2 border-green-300" : ""}
                  ${book.status === "Reserved" ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300" : ""}
                  ${book.status === "Borrowed" ? "bg-red-100 text-red-700 border-2 border-red-300" : ""}
                `}
              >
                {book.status}
              </span>

              <span className="text-[#FF5F00] text-sm font-bold flex items-center gap-1">
                ⭐ {book.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}