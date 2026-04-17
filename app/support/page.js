"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
export default function Page() {

  let [form , setForm] = useState({
    name: "" ,
    email : "", 
    help: ""
  })
  const handleChange = (e) => {
    setForm({...form ,[e.target.name] : e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch("/api/resendapi", {method : "POST",
      headers: {
        "Content-Type": "application/json",
      },body:JSON.stringify(form)})
    if(req.ok){alert("ok")}else{alert("not ok ")}
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07102a] via-[#26184f] to-[#07102a] flex items-center justify-center p-8">
      <motion.div
        className="max-w-3xl w-full bg-[#0F111A]/70 rounded-2xl p-8 backdrop-blur-md border border-white/6 shadow-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#63D0FF] to-[#B36BFF]">
          Support
        </h1>

        <p className="text-gray-300 mb-6">
          Need help? Reach out — we try to respond within 24–48 hours. For urgent payment issues, include transaction ID and screenshot when possible.
        </p>

        <form 
        onSubmit = {handleSubmit} 
        className="space-y-4">
          <input
            value = {form.name}
            type="text"
            onChange = {handleChange}
            name = "name"
            placeholder="Your name"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-gray-200 outline-none"
          />
          <input
            value = {form.email}
            type="email"
            placeholder="Email"
            onChange = {handleChange}
            name = "email"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-gray-200 outline-none"
          />
          <textarea
          value = {form.help}
            onChange = {handleChange}
            name = "help"
            placeholder="How can we help?"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/6 text-gray-200 outline-none h-32"
          />
          <button
            type = "submit"
            className="hover:cursor-pointer px-5 py-3 rounded-lg bg-gradient-to-r from-[#0077FF] to-[#A65BFF] font-semibold hover:scale-[1.02] transition-all duration-[0.2s] ease-initial"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
