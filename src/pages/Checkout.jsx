import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/ui/Layout";
import emailjs from "@emailjs/browser";

export default function Checkout() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const reservedBooks = state.reservations;

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [duration, setDuration] = useState("14"); // default 14 days

  const [errors, setErrors] = useState([]);

  // -------------------------
  // VALIDATION HANDLER
  // -------------------------
  const validate = () => {
    let errs = [];

    if (!name.trim()) errs.push("Full name is required.");
    if (!email.trim() || !email.includes("@"))
      errs.push("A valid email is required.");
    if (!memberId.trim()) errs.push("Membership ID is required.");
    if (!pickupDate) errs.push("Pickup date is required.");

    // Pickup must be at least 24 hours from now
    if (pickupDate) {
      const today = new Date();
      const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const picked = new Date(pickupDate);

      if (picked < minDate) {
        errs.push("Pickup date must be at least 24 hours from today.");
      }
    }

    return errs;
  };

  // -------------------------
  // SUBMIT HANDLER
  // -------------------------
  const handleSubmit = () => {
    const validationErrors = validate();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Generate Reservation ID
    const reservationId = "BN-" + Math.floor(100000 + Math.random() * 900000);

    // Calculate Due Date
    const due = new Date(pickupDate);
    due.setDate(due.getDate() + parseInt(duration));

    const dueFormatted = due.toISOString().split("T")[0];

    // Prepare Email Params
    const templateParams = {
      to_name: name,
      to_email: email,
      reservation_id: reservationId,
      pickup_date: pickupDate,
      due_date: dueFormatted,
      duration: duration,
      book_list: reservedBooks.map((b) => `${b.title} by ${b.author}`).join(", "),
    };

    // Send Email
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          // Only navigate after successful email or if you want to allow it anyway
          // For now, we proceed even if email fails, but we log it.
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Failed to send email. Please check your EmailJS configuration in .env file.");
        }
      );

    // Dispatch to reducer
    dispatch({
      type: "BORROW_RESERVED_BOOKS",
      payload: {
        pickupDate,
        dueDate: dueFormatted,
        duration,
        user: {
          name,
          email,
          memberId,
        },
      },
    });

    navigate("/confirmation", { state: { reservationId } });
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-[#002379]">
        Checkout
      </h1>

      {/* NO RESERVED BOOKS */}
      {reservedBooks.length === 0 && (
        <div className="text-center py-20 text-[#994D1C] dark:text-[#F5CCA0] text-lg">
          No books in reservation cart.
        </div>
      )}

      {/* ERROR BOX */}
      {errors.length > 0 && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6 border border-red-300 dark:border-red-700">
          <ul className="list-disc ml-5">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {reservedBooks.length > 0 && (
        <div
          className="
          bg-[#FF9F66] dark:border-[#F5CCA0]/30
          border border-[#E48F45]/40 rounded-2xl p-8 shadow-lg
        "
        >
          {/* RESERVED BOOKS LIST */}
          <h2 className="text-2xl font-bold mb-4 text-white">
            Books You're Borrowing
          </h2>

          <ul className="mb-8 space-y-3">
            {reservedBooks.map((b) => (
              <li
                key={b.id}
                className="
                bg-white  
                border border-[#E48F45]/30 dark:border-[#F5CCA0]/20 
                px-4 py-3 rounded-lg shadow-sm
              "
              >
                <strong>{b.title}</strong> — {b.author}
              </li>
            ))}
          </ul>

          {/* FORM TITLE */}
          <h2 className="text-2xl font-bold mb-6 text-white">
            Borrower Information
          </h2>

          {/* FORM GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* FULL NAME */}
            <div>
              <label className="block font-semibold mb-2 text-white">
                Full Name
              </label>
              <input
                type="text"
                className="
                w-full p-3 rounded-lg border border-[#E48F45]/40
                bg-white  
                text-black
              "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block font-semibold mb-2 text-white">
                Email Address
              </label>
              <input
                type="email"
                className="
                w-full p-3 rounded-lg border border-[#E48F45]/40
                bg-white  
                text-black
              "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* MEMBER ID */}
            <div>
              <label className="block font-semibold mb-2 text-white">
                Membership ID
              </label>
              <input
                type="text"
                className="
                w-full p-3 rounded-lg border border-[#E48F45]/40
                bg-white  
                text-black
              "
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </div>

            {/* PICKUP DATE */}
            <div>
              <label className="block font-semibold mb-2 text-white">
                Pickup Date
              </label>
              <input
                type="date"
                className="
                w-full p-3 rounded-lg border border-[#E48F45]/40
                bg-white  
                text-black
              "
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            {/* DURATION */}
            <div>
              <label className="block font-semibold mb-2 text-white">
                Borrow Duration
              </label>
              <select
                className="
                w-full p-3 rounded-lg border border-[#E48F45]/40
                bg-white  
                text-black
              "
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="21">21 Days</option>
              </select>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="text-right mt-10">
            <button
              onClick={handleSubmit}
              className="
              bg-[#002379]
              text-[#F5CCA0] px-10 py-3
              rounded-lg text-lg font-semibold
              shadow-lg transition-all duration-300
              transform hover:-translate-y-1
            "
            >
              Confirm Reservation →
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

