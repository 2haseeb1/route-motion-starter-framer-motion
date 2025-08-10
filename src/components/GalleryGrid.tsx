// src/components/GalleryGrid.tsx
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import type { Photo } from "../data/photos"

type GalleryGridProps = { photos: Photo[] }

export default function GalleryGrid({ photos }: GalleryGridProps) {
    const location = useLocation()

    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((p) => (
                <Link
                    key={p.id}
                    to={`/gallery/${p.id}`}
                    state={{ from: location.pathname }}
                    className="group block"
                >
                    <motion.img
                        src={p.src}
                        alt={p.title}
                        loading="lazy"
                        layoutId={`photo-${p.id}`}
                        className="h-40 w-full rounded-xl object-cover md:h-48"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                    <div className="mt-1 text-xs text-gray-500 group-hover:text-gray-700">{p.title}</div>
                </Link>
            ))}
        </div>
    )
}