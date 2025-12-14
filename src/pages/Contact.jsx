import { useState } from "react";
import Layout from "../components/ui/Layout";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitted(true);

    const logs = JSON.parse(localStorage.getItem("librarianMessages") || "[]");
    logs.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem("librarianMessages", JSON.stringify(logs));

    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="
        max-w-3xl mx-auto mt-10 p-8 rounded-2xl shadow-lg 
        bg-[#FF9F66]
      ">

        <h1 className="text-4xl font-bold text-[#002379] mb-6 text-center">
          Contact Librarian
        </h1>

        {submitted && (
          <div className="
            p-4 mb-6 rounded-lg 
            bg-green-200 text-green-900 border border-green-300
            dark:bg-green-800 dark:text-green-100 dark:border-green-700
          ">
            Message sent successfully!
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* NAME */}
          <div>
            <label className="block font-semibold text-white mb-1">
              Full Name
            </label>
            <input
              className="
                w-full p-3 rounded-lg border
                border-[#E48F45] bg-[#FFFAE6] text-black
                focus:border-[#994D1C] focus:ring-2 focus:ring-[#994D1C]/30
                 dark:border-[#F5CCA0]/40
              "
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-semibold text-white mb-1">
              Email
            </label>
            <input
              className="
                w-full p-3 rounded-lg border
                border-[#E48F45] bg-[#FFFAE6] text-black
                focus:border-[#994D1C] focus:ring-2 focus:ring-[#994D1C]/30
                 dark:border-[#F5CCA0]/40
              "
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block font-semibold text-white mb-1">
              Subject
            </label>
            <input
              className="
                w-full p-3 rounded-lg border
                border-[#E48F45] bg-[#FFFAE6] text-black
                focus:border-[#994D1C] focus:ring-2 focus:ring-[#994D1C]/30
                 dark:border-[#F5CCA0]/40
              "
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            {errors.subject && (
              <p className="text-red-600 text-sm">{errors.subject}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block font-semibold text-white mb-1">
              Message
            </label>
            <textarea
              rows="5"
              className="
                w-full p-3 rounded-lg border resize-none
                border-[#E48F45] bg-[#FFFAE6] text-black
                focus:border-[#994D1C] focus:ring-2 focus:ring-[#994D1C]/30
                 dark:border-[#F5CCA0]/40
              "
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            ></textarea>
            {errors.message && (
              <p className="text-red-600 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="
              w-full py-3 rounded-lg font-bold text-white
              bg-[#002379]
              transition-all duration-300
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </Layout>
  );
}
