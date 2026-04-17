"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#071132] via-[#1a1442] to-[#071132] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-[#0F111A]/70 backdrop-blur-lg border border-blue-400/10 rounded-2xl p-10 shadow-[0_10px_40px_rgba(60,50,140,0.25)]"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] to-[#9B4BFF] mb-6 text-center">
          About Auryon
        </h1>

        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          Auryon is a small-but-ambitious platform that lets creators, developers,
          and independent makers receive direct support from their fans. We
          believe funding should be transparent, human, and tuned to the creator’s
          journey — not hidden behind corporate gatekeepers.
        </p>

        <h3 className="text-white font-semibold mb-3">Our mission</h3>
        <p className="text-gray-300 leading-relaxed mb-6">
          To empower individual creators with tools that make it simple for supporters
          to give meaningful boosts. Auryon stands for independence, honesty, and
          emotional connection — we call it supporting someone’s <strong>aura</strong>.
        </p>

        <h3 className="text-white font-semibold mb-3">Who we build for</h3>
        <p className="text-gray-300 leading-relaxed">
          Developers, artists, students, open-source maintainers and anyone producing
          real value. If you ship work that moves people, Auryon is a place for
          your supporters to give direct value.
        </p>
      </motion.div>
    </div>
  );
}
