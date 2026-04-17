"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06102b] via-[#1b174d] to-[#06102b] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl w-full bg-[#0F111A]/70 rounded-2xl p-8 backdrop-blur-md border border-white/6">
        <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#69D7FF] to-[#C07BFF]">Community & Careers</h1>

        <p className="text-gray-300 mb-6">
          Join the Auryon community: share feedback, report issues, and collaborate. We’re small and building fast —
          contributors and early supporters shape where we go.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-white/6 border border-white/8">
            <h3 className="text-white font-semibold mb-2">Careers & Contributors</h3>
            <p className="text-gray-300 text-sm mb-3">We’re open to people who can help build features, design better UX, or secure payments. Send an intro and portfolio to the support page.</p>
            <Link href="/support" className="text-blue-300 underline">Contact us →</Link>
          </div>

          <div className="p-4 rounded-xl bg-white/6 border border-white/8">
            <h3 className="text-white font-semibold mb-2">Feedback & Roadmap</h3>
            <p className="text-gray-300 text-sm mb-3">Have a feature idea or bug report? Post it on our community board or send a note — we read everything and prioritize based on impact.</p>
            <Link href="/blog" className="text-blue-300 underline">See latest updates →</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
