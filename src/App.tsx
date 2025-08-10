import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion"
import { Nav } from "./components/Nav"
import Home from "./pages/Home"
import Gallery from "./pages/Gallery"
import PhotoDetail from "./pages/PhotoDetail"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import React from "react"

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.28 }}
      className="min-h-dvh"
    >
      {children}
    </motion.main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <LayoutGroup>
      <AnimatePresence mode="sync" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          {/* Pass the required photos prop to Gallery */}
          <Route path="/gallery" element={<Page><Gallery /></Page>} />
          <Route path="/gallery/:id" element={<Page><PhotoDetail /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
    </LayoutGroup>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <BrowserRouter>
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Nav />
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </MotionConfig>
  )
}