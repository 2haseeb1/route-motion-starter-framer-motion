import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const links: { to: string; label: string; end?: boolean }[] = [
    { to: "/", label: "হোম", end: true },
    { to: "/gallery", label: "গ্যালারি" },
    { to: "/about", label: "সম্পর্কে" },
]

export function Nav() {
    return (
        <header className="mb-6">
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold tracking-tight">Route Motion Starter</div>
            </div>
            <nav className="mt-4 flex gap-4">
                {links.map(({ to, label, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className="relative px-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                        {({ isActive }) => (
                            <span className="relative inline-block pb-1">
                                {label}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gray-900"
                                    />
                                )}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}