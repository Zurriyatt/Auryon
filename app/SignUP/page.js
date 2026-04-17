"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react"; 
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function Page() {
  const router = useRouter()
  const toastCreate = {
    success : true , 
    title : "Your Account has Been created Successfully🎉!",
    description : "Now login that account and Continue Further"

  }
  const inputEyeHandle = () => { 
    setEye(eye?false:true)
  }
  const [eye , setEye] = useState(false)
  const [isSubmitting , setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: "",
    uid: ""
  });
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });

  }
const handleSubmit = async (event) => {
  event.preventDefault();
  setIsSubmitting(true)
  if (form.email.endsWith("@gmail.com") && form.password.length > 7 && form.password.length < 13) {
    const rid =  crypto.randomUUID();
    const fullForm = { ...form, uid: rid };

    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullForm)
      });

      const result = await res.json();
     alert(result.error?result.error:result.res);
     console.log(result.error?result.error:result.res)
      if(!result.error){
        sessionStorage.setItem("toast" , JSON.stringify(toastCreate))
        router.replace("/Login")
      setForm({ email: "", password: "", userName: "", uid: "" });}
     
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  } else {
    if (!form.email.endsWith("@gmail.com")) {
      toast.error("Enter a valid Gmail address");
    } else if (form.password.length > 12) {
      toast.error("Password must be under 12 characters");
    } else if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
    }
  }
  setEye(false)
  setIsSubmitting(false)
};

  return (
    <div className="min-h-[82vh] sm:min-h-[84vh] bg-gradient-to-br from-[#0d022d] via-[#1a063d] to-[#080d24] transition-all duration-200 ease-in-out flex justify-center items-center w-screen overflow-x-hidden overflow-y-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="Login-container bg-gradient-to-br from-blue-400 via-pink-500 to-purple-500 rounded-xl w-[85%] sm:w-[50%] lg:w-[60%] xl:w-[30%] h-[41vh] p-[1.5px] drop-shadow-[0px_0px_10px_rgba(0,123,255,0.2)] hover:drop-shadow-[0px_0px_14px_rgba(0,123,255,0.4)] flex justify-center items-center"
      >
        <div className="bg-gradient-to-br from-[#0d022d] via-[#1a063d] to-[#080d24] w-full h-[40vh] rounded-xl flex flex-col justify-center items-center gap-6">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
            className="backdrop-blur-2xl bg-white/10 w-full h-[40vh] rounded-xl flex flex-col justify-center items-center gap-2"
          >
            <div className="w-[90%]  h-[7vh] flex justify-center items-center">
              <input
                value={form.email.toLowerCase()}
                onChange={handleChange}
                className="text-sm p-2 pt-5 peer block w-full h-[90%] rounded-sm bg-white/10 pl-5 hover:scale-[1.02] cursor-pointer focus:outliine-0 foucs:border-0 focus:ring-0"
                type="text"
                name="email"
                placeholder=" "
              />
              <label className="absolute left-10 placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm translate-y-[-80%] peer-placeholder-shown:translate-y-0 text-[12px] peer-focus:translate-y-[-60%] peer-focus:text-[12px] font-bold peer-placeholder-shown:left-16 peer-focus:left-10 peer-focus:text-purple-400 peer-placeholder-shown:text-white text-purple-400 pointer-events-none peer-hover:scale-[1.02] hover:scale-[1.02]">
                Enter Email
              </label>
            </div>

            <div className="w-[90%]  h-[7vh] flex justify-center items-center">
              <input
                value={form.userName.toLowerCase()}
                onChange={handleChange}
                className="text-sm p-2 pt-5 peer block w-full h-[90%] rounded-sm bg-white/10 pl-5 hover:scale-[1.02] cursor-pointer focus:outliine-0 foucs:border-0 focus:ring-0"
                type="text"
                placeholder=" "
                name="userName"
              />
              <label className="absolute left-10 placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm translate-y-[-80%] peer-placeholder-shown:translate-y-0 text-[12px] peer-focus:translate-y-[-60%] peer-focus:text-[12px] font-bold peer-placeholder-shown:left-16 peer-focus:left-10 peer-focus:text-purple-400 peer-placeholder-shown:text-white text-purple-400 pointer-events-none peer-hover:scale-[1.02] hover:scale-[1.02]">
                Choose An UserName
              </label>
            </div>

            <div className="w-[90%]  h-[7vh] flex justify-center items-center bg-white/10">
              <input
                value={form.password}
                onChange={handleChange}
                className="text-sm p-2 pt-5 peer block w-full h-[90%] rounded-sm  pl-5 hover:scale-[1.02] cursor-pointer focus:outliine-0 foucs:border-0 focus:ring-0"
                type= {eye?"text":"password"}
                placeholder=" "
                name="password"
              />
              <label className="absolute left-10 placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm translate-y-[-80%] peer-placeholder-shown:translate-y-0 text-[12px] peer-focus:translate-y-[-60%] peer-focus:text-[12px] font-bold peer-placeholder-shown:left-16 peer-focus:left-10 peer-focus:text-purple-400 peer-placeholder-shown:text-white text-purple-400 pointer-events-none peer-hover:scale-[1.02] hover:scale-[1.02]">
                Enter Password
              </label>
              <img
              className = "cursor-pointer"
              onClick = {inputEyeHandle}
              src={eye?"/assets/eyeCut.svg":"/assets/eye.svg"} width = {25} alt="" />
            </div>
            <button
              disabled = {isSubmitting?true:false}
              type="submit"
              className={`rounded-md w-[20%] h-[8%]  font-bold font-mono text-md text-indigo-950  hover:scale-[1.05] cursor-pointer animate-pulse ${isSubmitting?"bg-white/10 hover:bg-white/10":"bg-white hover:bg-purple-400"}`}
            >
              Sign UP
            </button>
            <Link
              href = "/Login"
              className="font-bold text=md underline cursor-pointer hover:text-indigo-500"
            >
              Already Have an Account? Login.
            </Link>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}

export default Page;
