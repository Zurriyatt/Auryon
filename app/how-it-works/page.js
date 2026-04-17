"use client";
import { motion } from "framer-motion";

export default function Page() {
  const steps = [
    { title: "Create Profile", desc: "Set up your Auryon page, add bio, goal and visuals." },
    { title: "Connect Payments", desc: "Link a Stripe account — safe, PCI-compliant flow." },
    { title: "Share Your Aura", desc: "Share your profile URL with followers and communities." },
    { title: "Receive Boosts", desc: "Supporters send boosts; comments show publicly." },
    { title: "Grow & Withdraw", desc: "Track contributions and transfer funds via Stripe." },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#081232] via-[#2b1b57] to-[#081232] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-[#0F111A]/70 backdrop-blur-md border border-purple-500/10 rounded-2xl p-10 shadow-md"
      >
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#7BCBFF] to-[#B96BFF] text-center mb-8">
          How Auryon Works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
              className="p-5 rounded-xl bg-white/6 border border-white/6"
            >
              <div className="text-xl font-semibold text-white mb-2">{s.title}</div>
              <div className="text-gray-300 text-sm leading-relaxed">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-gray-300 leading-relaxed">
          That’s it — simple and honest. Auryon doesn’t hold creator funds: payments
          route through Stripe, giving creators control over their payouts.
        </p>
      </motion.div>
    </div>
  );
}
