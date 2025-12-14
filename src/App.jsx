import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Reserve from "./pages/Reserve";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Dashboard from "./pages/Dashboard";
import Debug from "./pages/Debug";
import Contact from "./pages/Contact";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/reserve" element={<Reserve />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/debug" element={<Debug />} />
     <Route path="/contact" element={<Contact />} />

    </Routes>
  );
}
