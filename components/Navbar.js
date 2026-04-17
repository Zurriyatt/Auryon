"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

function Navbar() {
  const router = useRouter()
const toastLogout = {
    type: "success",
    title: "Logout Successful",
    description: "You’ve been safely logged out.",
  };
  const [searchUser , setSearchUser] = useState({
    name : ""
  })
  
  const [search, setSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState("account");
  const { data: session } = useSession();
 

  const [tokenData, setTokenData] = useState(false);
  const [finalUser, setFinalUser] = useState(null);
const  handleSearch = (e) => { 
    setSearchUser({...searchUser , [e.target.name] : e.target.value})
  }
  const handleSearchSubmit = async () => { 
    router.push(searchUser.name)
  setSearch(false)
  }
  useEffect(() => {
    fetch("/api/getUser")
      .then((res) => res.json())
      .then((jsonData) => setTokenData(jsonData.success ? jsonData.user : null));
  }, []);

  useEffect(() => {
    if (tokenData) setFinalUser(tokenData.user);
  }, [tokenData]);

  useEffect(() => {
    if (session) {
      setUser(session.user.email);
      setFinalUser(session);
    } else if (tokenData) {
      setUser(tokenData.user.email);
      setFinalUser(tokenData.user);
    }
    
  }, [session, tokenData]);

  const handleLogout = async () => {
    if (session) {
sessionStorage.setItem("toast",JSON.stringify(toastLogout))

await signOut({ callbackUrl: "/Login" })
    }
          else {
      const res = await fetch("/api/logout", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (data.success) {
        toast.success("Logged out successfully!", {
  description: "Come back soon 👋",
});
  sessionStorage.setItem("toast" , JSON.stringify(toastLogout))
  setTimeout(() => {
    setTokenData(null);
    setFinalUser(null);
    router.push("/Login");
  }, 1200); 

      }else {
        toast.error("Logout failed", {
  description: "Something went wrong while logging you out Probably you are already logged out.",
});
      }
    }
  };

  // Framer Motion variants
  const modalVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className="bg-[#0F111A] w-screen h-[10vh] sm:h-[8vh] flex items-center justify-between px-5 z-11 transition-all duration-200 ease-in-out">
      
      {/* Search Modal */}
      <AnimatePresence>
        {search && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-start pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-[90vw] sm:w-[70vw] lg:w-[50%] bg-[#0F111A] rounded-xl shadow-2xl flex flex-col overflow-hidden"
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="px-6 py-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-white text-2xl font-bold font-mono">Find Your Favourite Person</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  onClick={() => setSearch(false)}
                  className="w-6 h-6 text-white hover:text-orange-500 cursor-pointer transition-colors duration-300"
                >
                  <path
                    fill="currentColor"
                    d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
                  />
                </svg>
              </div>

              {/* Input */}
              <motion.div className="px-6 py-6 relative text-[#0F111A] font-bold font-mono "
              varients= {itemVariant}
              initial = "hidden"
              animation = "visible"
              >
                <input
                onChange=  {handleSearch}
                name = "name"
                  type="text"
                  placeholder="Search..."
                  className="w-full h-[55px] bg-white  rounded-full pl-6 focus:outline-none text-[15px]"
                />
                
                <motion.div className="absolute right-7 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full flex justify-center items-center bg-black hover:bg-orange-500 transition-colors duration-300 cursor-pointer"
                onClick = {handleSearchSubmit}>
                  <img className="w-[25px]" src="/assets/search.svg" alt="" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo */}
      <motion.div
        className="flex justify-center items-center w-[20%] h-[130%] cursor-pointer"
        variants={itemVariant}
        initial="hidden"
        animate="visible"
      >
        <img className="h-[100%] mr-[-25px]" src="/assets/logo.svg" alt="" />
        <span className="font-extrabold font-sans text-[20px]">uryon</span>
      </motion.div>

      {/* Navbar Items */}
      <ul className="flex gap-3 sm:gap-5 justify-center items-center ">
        
        <motion.li
          className="w-[42px] h-[42px] bg-gradient-to-br from-emerald-400 via-pink-400 to-purple-600 rounded-md flex justify-center items-center cursor-pointer"
          onClick={() => setSearch(true)}
          variants={itemVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="w-[38px] h-[38px] bg-[#0F111A] bg-gradient-to-br hover:from-emerald-400 hover:via-pink-400 hover:to-purple-600 rounded-md flex justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/wjyqkiew.json"
              trigger="click"
              stroke="bold"
              colors="primary:#66a1ee,secondary:#9cc2f4"
              style={{ width: "34px", height: "34px" }}
            />
          </div>
        </motion.li>

        {/* User Dropdown/Login */}
        <motion.li variants={itemVariant} initial="hidden" animate="visible" className = "bg-gradient-to-br p-[2.5px] from-purple-500 via-pink-700 to-blue-600 rounded-md">
          {finalUser ? (
            <div className="font-mono font-bold text:[10px] sm:text-[15px] bg-gradient-to-br  from-purple-500 via-pink-700 to-blue-600 flex justify-center items-center rounded-md cursor-pointer hover:drop-shadow-[0px_0px_5px_rgba(59,130,246,0.7)] ">
              <select
                value={selected}
                onChange={(e) => {
                  setSelected("account");
                  const value = e.target.value;
                  if (value !== "accounts") router.push(`/${value}`);
                }}
                className="relative w-[80px] text-sm sm:text-md sm:w-[90px] h-[30px] bg-[#0F111A] hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-700 hover:to-blue-600 rounded-md font-bold "
              >
                <option value="account" disabled>
                  {user}
                </option>
                <option value="Dashboard">Dashboard</option>
                <option value="YourPage">YourPage</option>
                <option value="">Home</option>
              </select>
            </div>
          ) : (
            <Link href="/Login">
              <button className="font-mono font-bold text-[10px] sm:text-[15px] bg-gradient-to-br p-[2.5px] justify-center items-center rounded-md hover:drop-shadow-[0px_0px_5px_rgba(59,130,246,0.7)] w-[75px] h-[30px] bg-[#0F111A] hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-700 hover:to-blue-600 active:from-purple-600 active:via-pink-800 active:to-blue-700 ">
                Login
              </button>
            </Link>
          )}
        </motion.li>

        {/* Logout */}
        {finalUser ? (
          <motion.li variants={itemVariant} initial="hidden" animate="visible" className = "bg-gradient-to-br p-1 from-purple-500 via-pink-700 to-blue-600 rounded-md ">
            <button
              className="font-mono font-bold text-[10px] sm:text-[15px] bg-gradient-to-br p-[2.5px] flex justify-center items-center rounded-md hover:drop-shadow-[0px_0px_5px_rgba(59,130,246,0.7)] w-[90px] h-[30px] bg-[#0F111A] hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-700 hover:to-blue-600 active:from-purple-600 active:via-pink-800 active:to-blue-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </motion.li>
        ):<motion.li variants = {itemVariant} initial= "hidden" animate ="visible" className = " bg-gradient-to-br p-1 from-purple-500 via-pink-700 to-blue-600 rounded-md ">
          <Link href = "/" className ="bg-[#0F111A] px-2 py-1 rounded-sm w-[100%] h-[100%] font-mono font-bold text-lg hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-700 hover:to-blue-600 hover:drop-shadow-[0px_0px_5px_rgba(59,130,246,0.7)] active:from-purple-600 active:via-pink-800 active:to-blue-700 ">Home</Link>
          </motion.li>}
      </ul>
    </nav>
  );
}

export default Navbar;
