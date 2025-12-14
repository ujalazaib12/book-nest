import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import Layout from "../components/ui/Layout";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Confirmation() {
  const { state } = useContext(AppContext);
  const location = useLocation();

  const [reservationId, setReservationId] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Use ID from navigation state if available, else generate new
    if (location.state?.reservationId) {
      setReservationId(location.state.reservationId);
    } else {
      const id = "BN-" + Math.floor(100000 + Math.random() * 900000);
      setReservationId(id);
    }

    // Get borrowed books (status = Borrowed)
    const list = state.books.filter((b) => b.status === "Borrowed");
    setBorrowedBooks(list);
  }, [state.books, location.state]);

  return (
    <Layout>
      <div className="rounded-2xl p-10">
        {/* SUCCESS ICON */}
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <motion.path
                variants={checkVariants}
                initial="hidden"
                animate="visible"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl font-bold text-black">
              Reservation Confirmed!
            </h1>
            <p className="text-lg text-black mt-2">
              Your books have been successfully reserved.
            </p>
          </motion.div>
        </div>

        <div>
          {/* RESERVATION ID */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
            bg-[#002379] 
            border border-[#E48F45]/40 dark:border-[#F5CCA0]/20 
            p-5 rounded-xl shadow-sm mb-8 text-center
          "
          >
            <p className="text-[#6B240C] dark:text-[#F5CCA0] font-bold text-lg">
              Reservation ID:
            </p>
            <p className="text-2xl font-extrabold tracking-wider text-[#994D1C] dark:text-[#F5CCA0] mt-1">
              {reservationId}
            </p>
          </motion.div>

          {/* QR CODE */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
              <QRCodeSVG value={reservationId || "PENDING"} size={150} fgColor="#000000" />
              <p className="text-center text-sm text-gray-500 mt-2 font-semibold">Scan for Pickup</p>
            </div>
          </motion.div>

          {/* BORROWER DETAILS */}
          {state.user && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="
              bg-[#FF9F66] 
              p-6 rounded-xl shadow-sm mb-8
            "
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Borrower Information
              </h2>

              <p className="text-white">
                <strong>Name:</strong> {state.user.name}
              </p>
              <p className="text-white">
                <strong>Email:</strong> {state.user.email}
              </p>
              <p className="text-white">
                <strong>Membership ID:</strong> {state.user.memberId}
              </p>
            </motion.div>
          )}

          {/* BOOK LIST */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
            bg-[#002379] 
            border border-[#E48F45]/40 dark:border-[#F5CCA0]/20 
            p-6 rounded-xl shadow-sm mb-8
          "
          >
            <h2 className="text-xl font-bold text-[#6B240C] dark:text-[#F5CCA0] mb-4">
              Borrowed Books
            </h2>

            <div className="space-y-4">
              {borrowedBooks.map((book) => (
                <div
                  key={book.id}
                  className="
                  p-4 rounded-lg shadow-sm 
                  bg-[#FFFAE6]
                "
                >
                  <p className="text-lg font-bold text-black">
                    {book.title}
                  </p>
                  <p className="italic text-black">
                    {book.author}
                  </p>

                  <div className="mt-2 text-sm">
                    <p className="text-black">
                      <strong>Pickup Date:</strong> {book.pickupDate}
                    </p>
                    <p className="text-black">
                      <strong>Due Date:</strong> {book.dueDate}
                    </p>

                    <p className="text-black mt-1">
                      Duration: <strong>{book.duration} days</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* INFO MESSAGE */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-[#FF9F66] p-4 rounded-lg text-center text-sm mb-8"
          >
            <p className="text-black font-semibold">
              A confirmation email has been sent to your registered email address.
            </p>
            <p className="text-black">
              Please present your Reservation ID at pickup.
            </p>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center gap-6 mt-8"
          >
            <Link
              to="/"
              className="
              bg-[#002379] 
              text-[#FFFAE6] px-8 py-3 rounded-lg 
              font-semibold shadow-lg transition-all
            "
            >
              Back to Home
            </Link>

            <Link
              to="/dashboard"
              className="
              bg-[#002379]
              text-[#FFFAE6] px-8 py-3 rounded-lg 
              font-semibold shadow-lg transition-all
            "
            >
              Go to Dashboard →
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}