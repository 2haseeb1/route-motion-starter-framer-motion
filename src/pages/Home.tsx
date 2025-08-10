import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">স্বাগতম 👋</h1>
            <p className="text-gray-600">
                এটি Framer Motion সহ রুট ট্রানজিশন এবং শেয়ার্ড এলিমেন্ট ট্রানজিশন ডেমো।
            </p>
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-white p-6 shadow-sm"
            >
                <p className="text-gray-700">
                    গ্যালারি ট্রাই করতে নিচে ক্লিক করুন।
                </p>
                <Link
                    to="/gallery"
                    className="mt-4 inline-block rounded-md bg-gray-900 px-3 py-2 text-sm text-white"
                >
                    গ্যালারি দেখুন
                </Link>
            </motion.div>
        </section>
    )
}