import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

export default function Toast({ message, onClose, duration = 3000 }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-10 right-10 z-50 bg-[#002379] text-[#FFFAE6] px-6 py-4 rounded-xl shadow-2xl border border-[#E48F45] flex items-center gap-3"
                >
                    <div className="bg-green-500 rounded-full p-1">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="font-semibold text-lg">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
