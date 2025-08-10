// src/features/onboarding/Success.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Success() {
    return (
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4"
            >
                <div className="text-5xl">🎉</div>
                <h1 className="text-3xl font-bold">অভিনন্দন!</h1>
                <p className="text-gray-600">
                    আপনার অনবোর্ডিং সফলভাবে সম্পন্ন হয়েছে।
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="rounded-lg border px-4 py-2 hover:bg-gray-50"
                    >
                        হোমে যান
                    </Link>
                    <Link
                        to="/onboarding/account"
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                    >
                        আবার শুরু করুন
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}