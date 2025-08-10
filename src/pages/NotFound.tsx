import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <section className="space-y-4 py-10">
            <h2 className="text-xl font-semibold">পেজ পাওয়া যায়নি</h2>
            <Link to="/" className="text-sm text-gray-900 underline">
                হোমে যান
            </Link>
        </section>
    )
}