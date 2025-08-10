// src/pages/Gallery.tsx
import GalleryGrid from "../components/GalleryGrid"
import { photos } from "../data/photos"

export default function Gallery() {
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">গ্যালারি</h2>
            <GalleryGrid photos={photos} />
        </section>
    )
}