"use client";
import { motion } from "framer-motion";

export default function Page() {
  const plans = [
    { name: "Free", price: "0", desc: "Create a profile, receive boosts. Stripe fees apply." },
    { name: "Creator", price: "—", desc: "No platform fees; just Stripe processing." },
    { name: "Team (future)", price: "—", desc: "Extra tools for teams and organizations (coming soon)." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051027] via-[#1b1250] to-[#051027] flex items-center justify-center p-8">
      <motion.div className="max-w-4xl w-full p-8 bg-[#0F111A]/70 rounded-2xl backdrop-blur-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#53C8FF] to-[#C17BFF] mb-6">
          Pricing & Fees
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Auryon doesn’t take platform cuts today — creators receive what supporters send
          minus standard Stripe processing. We aim for transparency: you keep what you earn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="p-5 rounded-xl bg-white/6 border border-white/8">
              <div className="text-xl font-semibold text-white">{p.name}</div>
              <div className="text-2xl text-blue-300 font-bold my-3">{p.price === "0" ? "Free" : p.price}</div>
              <div className="text-gray-300 text-sm">{p.desc}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-gray-400 text-sm">
          <strong>Stripe fees:</strong> Typical processing is ~2.9% + 30¢ per transaction. Exact fees depend on currency and region.
        </div>
      </motion.div>
    </div>
  );
}
