import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { photos } from "../data/photos"

export default function PhotoDetail() {
    const { id } = useParams()
    const photo = photos.find((p) => p.id === id)

    if (!photo) {
        return (
            <div className="py-10">
                <p className="text-gray-600">ছবি পাওয়া যায়নি।</p>
                <Link className="text-sm text-gray-900 underline" to="/gallery">
                    গ্যালারিতে ফিরে যান
                </Link>
            </div>
        )
    }

    return (
        <section className="space-y-4">
            <Link to="/gallery" className="text-sm text-gray-600 hover:text-gray-900">
                ← গ্যালারিতে ফিরে যান
            </Link>
            <div className="flex flex-col items-center">
                <motion.img
                    src={photo.src}
                    alt={photo.title}
                    layoutId={`photo-${photo.id}`}
                    className="mx-auto w-full max-w-3xl rounded-2xl object-cover"
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
                <div className="mt-3 text-gray-700">{photo.title}</div>
            </div>
        </section>
    )
}