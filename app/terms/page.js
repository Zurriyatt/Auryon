"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07102a] via-[#1d1543] to-[#07102a] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl w-full bg-[#0F111A]/70 rounded-2xl p-8 backdrop-blur-md border border-white/6">
        <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#5FD7FF] to-[#C37BFF]">Terms & Conditions (Summary)</h1>

        <p className="text-gray-300 mb-4 leading-relaxed">
          By using Auryon you agree to our platform rules: provide accurate account info,
          respect creators and supporters, and follow applicable laws. Auryon is a facilitator;
          creators are responsible for their content and the use of funds.
        </p>

        <h3 className="text-white font-semibold mb-2">Payments</h3>
        <p className="text-gray-300 mb-4">Payments are processed by Stripe. Auryon is not responsible for failed payments due to third-party issues.</p>

        <h3 className="text-white font-semibold mb-2">Limitation of Liability</h3>
        <p className="text-gray-300">Auryon provides the platform as-is. We aim to be reliable but do not guarantee uninterrupted service. Use at your own risk.</p>
      </motion.div>
    </div>
  );
}
