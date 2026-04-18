"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const links = [
  { title: "About Us", href: "/aboutus" },
  { title: "How It Works", href: "/how-it-works" },
  { title: "Pricing", href: "/pricing" },
  { title: "Community", href: "/community" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms & Conditions", href: "/terms" },
  {title: "Support" , href : "/support"}
];

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};
  return (
    <div
      className="flex flex-col items-center justify-center w-screen min-h-[82vh] sm:min-h-[84vh] bg-[#080d24] relative overflow-x-hidden gap-10 pt-8"
      style={{
        backgroundImage: "radial-gradient(#0e1433 1px, transparent 2px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeInOut" }}
        className="flex flex-col justify-center items-center text-center text-white z-5 gap-10"
      >
        {/* Auryon Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
         whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeInOut" }}
          className="text-6xl md:text-8xl xl:text-9xl font-extrabold bg-gradient-to-br from-[#005CFF] via-[#B94FFF] to-[#00E0FF] bg-clip-text text-transparent 
          drop-shadow-[0_0_25px_rgba(100,100,255,0.45)] hover:drop-shadow-[0_0_40px_rgba(100,100,255,0.75)] 
          transition-all duration-300 ease-in-out hover:scale-[1.03] pb-4"
        >
          Auryon
        </motion.h1>
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
         whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeInOut" }}
          className="flex justify-center items-center"
        >
          <h2
            className="text-md md:text-5xl font-semibold bg-clip-text text-transparent 
            bg-gradient-to-r from-[#005CFF] via-[#FF6EC7] to-[#00E0FF]
            drop-shadow-[0_0_25px_rgba(0,75,225,0.45)]
            hover:drop-shadow-[0_0_35px_rgba(0,100,255,0.7)]
            transition-all duration-300 ease-in-out flex justify-center items-center"
          >
            Boost Your Aura with Funds
            <span className="ml-[-15px]">
              <Image
                src="/assets/aura-unscreen.gif"
                height={110}
                width={110}
                alt="Aura Animation"
              />
            </span>
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeInOut" }}
          className="font-semibold text-gray-300 tracking-wide text-sm"
        >
          Fund the deserving and watch your Aura Grow ✨
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeInOut" }}
          className="flex justify-center items-center gap-4 mt-4"
        >
          <Link
          href = "/Login"
            className="px-8 py-4 rounded-lg text-[1.4vh] sm:text-sm font-bold 
            bg-gradient-to-r from-[#004BE1] via-[#B94FFF] to-[#00CFFF]
            hover:from-[#005FFF] hover:via-[#A05BFF] hover:to-[#33D6FF]
            shadow-[0_0_25px_rgba(0,75,225,0.4)]
            hover:shadow-[0_0_45px_rgba(0,75,225,0.6)]
            transition-all duration-300 ease-in-out hover:scale-[1.05]"
          >
            Boost 🚀
          </Link>

          <Link
          href = "/aboutus"
            className="px-6 py-[0.95rem] rounded-lg text-[1.4vh] sm:text-sm font-bold 
            bg-white/10 backdrop-blur-md border border-white/20 text-white
            hover:bg-white/20 hover:scale-[1.05]
            transition-all duration-300 ease-in-out"
          >
            Read More 📖
          </Link>
        </motion.div>
      </motion.div>

      {/* Funding Section */}
      <motion.div
        initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
        className="border-t border-white/10 w-full flex flex-col items-center py-20 text-center"
      >
        <h2 className="font-extrabold text-3xl bg-gradient-to-r from-[#005CFF] to-[#00E0FF] bg-clip-text text-transparent mb-10">
          Your Fans Can Boost Your Aura
        </h2>

        <div className="flex gap-10 md:gap-24 justify-center items-center flex-wrap">
          {[
            { img: "/assets/dollar.gif", text: "Fund Yourself" },
            { img: "/assets/financial-growth.gif", text: "Fund Your Leaders" },
            { img: "/assets/money.gif", text: "Fund Your Special Creator" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col font-bold justify-center items-center gap-3 text-[1.5vh] sm:text-sm text-gray-300 hover:scale-105 transition-all duration-300"
            >
              <span className="rounded-full h-[60px] w-[60px] bg-white/10 backdrop-blur-md border border-white/20 flex justify-center items-center">
                <Image
                  src={item.img}
                  width={77}
                  height={77}
                  alt={item.text}
                  className="rounded-full"
                />
              </span>
              {item.text}
            </div>
          ))}
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeInOut" }}
        className="border-t border-white/10 w-full flex flex-col items-center py-20"
      >
        <h2 className="font-extrabold text-4xl mb-10 bg-gradient-to-r from-[#004BE1] to-[#00CFFF] bg-clip-text text-transparent">
          More About Us
        </h2>
        <p className="font-mono font-semibold text-gray-300 text-lg text-center px-10 sm:px-24 leading-relaxed">
          Auryon empowers developers, creators, and influencers by connecting
          them with their supporters. <br />
          Our platform enables individuals to fund or boost their projects and
          ideas, creating a space where creativity thrives. <br />
          Whether you’re coding the next big app, creating amazing content, or
          inspiring others — Auryon is your launchpad. <br />
          We believe in community power and collective support to turn dreams
          into reality. <br />
          Want more updates and features? Support us on{" "}
          <span className="text-[#00CFFF] font-bold">kisukedevs_12</span>.
        </p>
      </motion.div>
      <footer className="relative w-full min-h-[35vh] bg-gradient-to-br from-[#0F111A] via-[#0F111A] to-[#0F111A] flex flex-col items-center justify-center text-gray-300 overflow-hidden">
      {/* Background blur glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-[#0F111A] to-transparent blur-2xl"></div>

      {/* Links Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-10 px-6 sm:px-12 py-10 z-10"
      >
        {links.map((link, i) => (
          <motion.div
            key={link.title}
            custom={i}
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <Link
              href={link.href}
              className="text-sm sm:text-base font-medium text-gray-300 hover:text-blue-400 hover:underline transition-all duration-300"
            >
              {link.title}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider line */}
      <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>

    </footer>
    </div>
  );
}
