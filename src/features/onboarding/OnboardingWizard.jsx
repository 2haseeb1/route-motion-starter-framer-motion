// src/features/onboarding/OnboardingWizard.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";

const steps = [
    { id: "account", title: "অ্যাকাউন্ট" },
    { id: "profile", title: "প্রোফাইল" },
    { id: "preferences", title: "পছন্দসমূহ" },
    { id: "review", title: "পর্যালোচনা" },
];

const pageVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function OnboardingWizard() {
    const navigate = useNavigate();
    const { step: stepSlug } = useParams();

    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        avatar: "#6366f1",
        newsletter: true,
        topics: ["UI"],
    });

    const currentIndex = useMemo(
        () => steps.findIndex((s) => s.id === stepSlug),
        [stepSlug]
    );

    useEffect(() => {
        if (currentIndex === -1) {
            navigate(`/onboarding/${steps[0].id}`, { replace: true });
        }
    }, [currentIndex, navigate]);

    const prevIndexRef = useRef(currentIndex);
    const [dir, setDir] = useState(1);
    useEffect(() => {
        if (prevIndexRef.current != null && currentIndex !== -1) {
            setDir(currentIndex > prevIndexRef.current ? 1 : -1);
            prevIndexRef.current = currentIndex;
        }
    }, [currentIndex]);

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (currentIndex === -1) return null;

    const goTo = (idx) => {
        const clamped = Math.max(0, Math.min(steps.length - 1, idx));
        navigate(`/onboarding/${steps[clamped].id}`);
    };

    const prev = () => goTo(currentIndex - 1);

    const validate = () => {
        const step = steps[currentIndex].id;
        const nextErrors = {};
        if (step === "account") {
            if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "সঠিক ইমেইল দিন।";
            if (form.password.length < 6) nextErrors.password = "কমপক্ষে ৬ অক্ষর।";
        }
        if (step === "profile") {
            if (!form.name.trim()) nextErrors.name = "নাম অবশ্যই দিন।";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const next = async () => {
        if (steps[currentIndex].id !== "review") {
            if (!validate()) return;
            goTo(currentIndex + 1);
            return;
        }
        // Submit ধাপ
        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 900));
        setSubmitting(false);
        setSuccess(true);
        // ১ সেকেন্ড "সব ঠিক!" দেখিয়ে তারপর রিডাইরেক্ট
        setTimeout(() => navigate("/welcome"), 1000);
    };

    const progress = (currentIndex + 1) / steps.length;

    return (
        <div className="mx-auto max-w-2xl px-6 py-10">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                হোমে ফিরে যান
            </Link>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">GlideGuide অনবোর্ডিং</h1>
                        <p className="text-sm text-gray-500">
                            ধাপ {currentIndex + 1} / {steps.length} — {steps[currentIndex].title}
                        </p>
                    </div>
                    <StepPills currentIndex={currentIndex} />
                </div>

                <div className="mb-5 h-1 w-full rounded bg-gray-200">
                    <motion.div
                        className="h-1 rounded bg-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round(progress * 100)}%` }}
                        transition={{ type: "spring", stiffness: 180, damping: 26 }}
                    />
                </div>

                <div className="relative">
                    <AnimatePresence initial={false} custom={dir}>
                        <motion.section
                            key={steps[currentIndex].id}
                            custom={dir}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="space-y-5"
                        >
                            {steps[currentIndex].id === "account" && (
                                <StepAccount
                                    form={form}
                                    setForm={setForm}
                                    errors={errors}
                                    clearError={(k) => setErrors((e) => ({ ...e, [k]: undefined }))}
                                />
                            )}
                            {steps[currentIndex].id === "profile" && (
                                <StepProfile
                                    form={form}
                                    setForm={setForm}
                                    errors={errors}
                                    clearError={(k) => setErrors((e) => ({ ...e, [k]: undefined }))}
                                />
                            )}
                            {steps[currentIndex].id === "preferences" && (
                                <StepPreferences form={form} setForm={setForm} />
                            )}
                            {steps[currentIndex].id === "review" && (
                                <StepReview form={form} submitting={submitting} success={success} />
                            )}
                        </motion.section>
                    </AnimatePresence>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <button
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        পেছনে
                    </button>

                    <motion.button
                        onClick={next}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={submitting || success}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {steps[currentIndex].id === "review" ? (
                            <>
                                {submitting ? "জমা হচ্ছে..." : success ? "সম্পন্ন!" : "জমা দিন"}
                                {!submitting && !success && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </>
                        ) : (
                            <>
                                পরবর্তী
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

/* Step components */

function StepAccount({ form, setForm, errors, clearError }) {
    const [shakeKey, setShakeKey] = useState(0);

    useEffect(() => {
        if (errors.email || errors.password) setShakeKey((k) => k + 1);
    }, [errors.email, errors.password]);

    return (
        <motion.div
            key={shakeKey}
            initial={{ x: 0 }}
            animate={{ x: [0, -6, 6, -3, 3, 0] }}
            transition={{ duration: (errors.email || errors.password) ? 0.35 : 0, ease: "easeInOut" }}
        >
            <Field label="ইমেইল" htmlFor="email" error={errors.email}>
                <motion.input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                        setForm((f) => ({ ...f, email: e.target.value }));
                        clearError("email");
                    }}
                    placeholder="apni@example.com"
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    whileFocus={{ scale: 1.01 }}
                    aria-invalid={!!errors.email}
                />
            </Field>

            <Field label="পাসওয়ার্ড" htmlFor="password" error={errors.password}>
                <motion.input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => {
                        setForm((f) => ({ ...f, password: e.target.value }));
                        clearError("password");
                    }}
                    placeholder="••••••"
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    whileFocus={{ scale: 1.01 }}
                    aria-invalid={!!errors.password}
                />
            </Field>
        </motion.div>
    );
}

function StepProfile({ form, setForm, errors, clearError }) {
    const colors = ["#6366f1", "#ef4444", "#10b981", "#f59e0b", "#06b6d4", "#a855f7"];

    return (
        <div className="space-y-5">
            <Field label="পুরো নাম" htmlFor="name" error={errors.name}>
                <motion.input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                        setForm((f) => ({ ...f, name: e.target.value }));
                        clearError("name");
                    }}
                    placeholder="আপনার নাম"
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    whileFocus={{ scale: 1.01 }}
                    aria-invalid={!!errors.name}
                />
            </Field>

            <div className="space-y-2">
                <label className="text-sm font-medium">অবতার রং</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                        <motion.button
                            key={c}
                            onClick={() => setForm((f) => ({ ...f, avatar: c }))}
                            className={`h-9 w-9 rounded-full ring-offset-2 ${form.avatar === c ? "ring-2 ring-indigo-600" : "ring-1 ring-gray-300"}`}
                            style={{ backgroundColor: c }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            aria-label={`রং নির্বাচন করুন ${c}`}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full" style={{ backgroundColor: form.avatar }} />
                <div>
                    <div className="font-medium">{form.name || "আপনার নাম"}</div>
                    <div className="text-sm text-gray-500">প্রিভিউ</div>
                </div>
            </div>
        </div>
    );
}

function StepPreferences({ form, setForm }) {
    const topics = ["UI", "UX", "React", "Animations", "Accessibility"];

    const toggleTopic = (t) =>
        setForm((f) => {
            const has = f.topics.includes(t);
            return { ...f, topics: has ? f.topics.filter((x) => x !== t) : [...f.topics, t] };
        });

    return (
        <div className="space-y-5">
            <label className="inline-flex cursor-pointer items-center gap-3">
                <motion.span
                    onClick={() => setForm((f) => ({ ...f, newsletter: !f.newsletter }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${form.newsletter ? "bg-indigo-600" : "bg-gray-300"}`}
                    whileTap={{ scale: 0.98 }}
                    role="switch"
                    aria-checked={form.newsletter}
                >
                    <motion.span
                        className="ml-0.5 inline-block h-5 w-5 rounded-full bg-white shadow"
                        animate={{ x: form.newsletter ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                </motion.span>
                <span className="text-sm">মাসিক নিউজলেটার চাই</span>
            </label>

            <div className="space-y-2">
                <div className="text-sm font-medium">আপনার পছন্দের বিষয়</div>
                <div className="flex flex-wrap gap-2">
                    {topics.map((t) => {
                        const active = form.topics.includes(t);
                        return (
                            <motion.button
                                key={t}
                                onClick={() => toggleTopic(t)}
                                className={`rounded-full border px-3 py-1 text-sm ${active ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "hover:bg-gray-50"}`}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function StepReview({ form, submitting, success }) {
    return (
        <div className="space-y-5">
            <div className="rounded-lg border bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ReviewRow label="ইমেইল" value={form.email || "—"} />
                    <ReviewRow label="নাম" value={form.name || "—"} />
                    <ReviewRow label="নিউজলেটার" value={form.newsletter ? "সাবস্ক্রাইব করা" : "সাবস্ক্রাইব করা নেই"} />
                    <ReviewRow label="বিষয়সমূহ" value={form.topics.length ? form.topics.join(", ") : "—"} />
                    <div className="col-span-full flex items-center gap-3">
                        <span className="text-sm text-gray-500">অবতার:</span>
                        <span className="h-5 w-5 rounded-full" style={{ backgroundColor: form.avatar }} />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {submitting && (
                    <motion.div
                        className="inline-flex items-center gap-2 text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Spinner /> তথ্য জমা হচ্ছে...
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {success && (
                    <motion.div
                        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-green-700"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <CheckIcon /> সব ঠিক! রিডাইরেক্ট করা হচ্ছে…
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* UI helpers */

function Field({ label, htmlFor, error, children }) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={htmlFor} className="text-sm font-medium">
                {label}
            </label>
            {children}
            <AnimatePresence initial={false}>
                {error && (
                    <motion.div
                        key="err"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-sm text-red-600"
                        aria-live="polite"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ReviewRow({ label, value }) {
    return (
        <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
            <div className="font-medium">{value}</div>
        </div>
    );
}

function StepPills({ currentIndex }) {
    return (
        <div className="hidden items-center gap-2 sm:flex">
            {steps.map((s, i) => {
                const active = i <= currentIndex;
                return (
                    <div key={s.id} className="flex items-center">
                        <div
                            className={`h-2 w-2 rounded-full ${active ? "bg-indigo-600" : "bg-gray-300"}`}
                            title={s.title}
                        />
                        {i < steps.length - 1 && (
                            <div className={`mx-1 h-0.5 w-6 ${i < currentIndex ? "bg-indigo-600" : "bg-gray-300"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function Spinner() {
    return (
        <svg className="h-4 w-4 animate-spin text-gray-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}