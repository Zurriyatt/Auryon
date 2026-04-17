"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08122d] via-[#25144a] to-[#08122d] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl w-full bg-[#0F111A]/70 rounded-2xl p-8 backdrop-blur-md border border-white/6">
        <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7DD7FF] to-[#C07BFF]">Privacy Policy (Summary)</h1>

        <p className="text-gray-300 leading-relaxed mb-4">
          We store minimal account information and metadata (usernames, public profile, contributions).
          We never store raw card information — all payment data is handled by Stripe. Your email and
          profile data are used to provide the service and for support communications.
        </p>

        <h3 className="text-white font-semibold mb-2">Data retention</h3>
        <p className="text-gray-300 mb-4">We retain transaction history for accounting and support. You can request data deletion by contacting support.</p>

        <h3 className="text-white font-semibold mb-2">Third-party services</h3>
        <p className="text-gray-300">We use Stripe for payments and may use analytics providers to improve the product. We aim to keep your data secure and private.</p>
      </motion.div>
    </div>
  );
}
