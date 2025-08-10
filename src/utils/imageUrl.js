// Utilities to normalize image sizes from mixed sources (Unsplash or any other URL)

function isUnsplash(url) {
    return /images\.unsplash\.com/.test(url);
}

// Square thumbnail for grid tiles
export function thumbUrl(src, size = 600) {
    try {
        if (isUnsplash(src)) {
            const u = new URL(src);
            u.searchParams.set("w", size.toString());
            u.searchParams.set("h", size.toString());
            u.searchParams.set("fit", "crop");
            u.searchParams.set("auto", "format");
            u.searchParams.set("q", "80");
            return u.toString();
        }
        // Proxy any other host through weserv to normalize size
        const clean = src.replace(/^https?:\/\//, "");
        return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=${size}&h=${size}&fit=cover&we=1&il`;
    } catch {
        return src; // fallback if URL parsing fails
    }
}

// Larger image for lightbox (capped by width)
export function fullUrl(src, maxW = 1600) {
    try {
        if (isUnsplash(src)) {
            const u = new URL(src);
            u.searchParams.set("w", maxW.toString());
            u.searchParams.set("auto", "format");
            u.searchParams.set("q", "85");
            return u.toString();
        }
        const clean = src.replace(/^https?:\/\//, "");
        return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=${maxW}&we=1&il`;
    } catch {
        return src;
    }
}