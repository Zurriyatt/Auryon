"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const toastLogin = {
    success: true , 
    title : "You are Logged In Successfully",
    description : "Now SetUp the dashboard"
    }
    const alreadyLogin = {
      success : false , 
      title : "You are already Logged In",
      descriptionn  : "SetUp the dashboard"
    }
  useEffect(()=> { 
     const toastData = sessionStorage.getItem("toast");
    if (toastData) {
      const { type, title, description } = JSON.parse(toastData);

      // show toast according to type
      if(!session){
      toast.error( "Login Failed try again or try manual")}else {
        toast.success(title , {description : description})
      }

      // clear it after showing
      sessionStorage.removeItem("toast");
    }
  }, []);

  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOneClick = async (e) => {
    const event = e.currentTarget.name
      
sessionStorage.setItem("toast", JSON.stringify(toastLogin));
    await signIn(event, {
      callbackUrl: window.location.origin + "/Dashboard",
    })
};

  const [eye, setEye] = useState(false);
  const HandlePassEye = () => {
    setEye(eye ? false : true);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  
  useEffect(() => {
      if (session) {
        toast.success("Already Logged IN", {
            description: "Set up your Dash board👋",
          });
          sessionStorage.setItem("toast",JSON.stringify(alreadyLogin))
        setTimeout(()=> { 
          router.replace("/Dashboard");
        },1400)
      }
    }, []);

  const handleInputSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    const data = form;
    if (
      form.email.endsWith("@gmail.com") &&
      form.password.length > 7 &&
      form.password.length < 13
    ) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.res) {
         sessionStorage.setItem("toast" , JSON.stringify(toastLogin))
          router.replace("/Dashboard");
          setForm({
            email: "",
            password: "",
          });
         
                 
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (result.error) {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err, "Fetch error from Login.js");
      }
    }
      setIsSubmitting(false);}
  

  return (
       <>
       {
        isSubmitting?<div className="flex justify-center items-center w-screen h-[90vh] overflow-hidden bg-black/30">
          <div className="w-[250px] h-[250px] rounded-full border-8 border-t-transparent border-blue-500 animate-spin"></div>
        </div>:<div className="min-h-[82vh] sm:min-h-[84vh] bg-gradient-to-br from-[#0d022d] via-[#1a063d] to-[#080d24] transition-all duration-200 ease-in-out flex justify-center items-center w-screen overflow-x-hidden overflow-y-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="Login-container bg-gradient-to-br from-blue-400 via-pink-500 to-purple-500 rounded-xl w-[85%] sm:w-[50%] lg:w-[60%] xl:w-[30%] h-[81vh] p-[1.5px] drop-shadow-[0px_0px_10px_rgba(0,123,255,0.2)] hover:drop-shadow-[0px_0px_14px_rgba(0,123,255,0.4)] flex justify-center items-center"
      >
        <div className="bg-gradient-to-br from-[#0d022d] via-[#1a063d] to-[#080d24] w-full h-[80vh] rounded-xl flex flex-col justify-center items-center gap-3">
          <motion.form
            onSubmit={handleInputSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
            className="backdrop-blur-2xl bg-white/10 w-full h-[80vh] rounded-xl flex flex-col justify-center items-center gap-2"
          >
            <span className="font-sans font-bold tracking-wider text-xl mb-3 ">Continue With ⬇</span>
            
            <button
              onClick={handleOneClick}
              name="github"
              type="button"
              className="text-white hover:scale-[1.02] w-[80%] pl-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 font-sans"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Github
            </button>

            <button
              onClick={handleOneClick}
              name="google"
              type="button"
              className="text-white hover:scale-[1.02] w-[80%] pl-5 bg-[#4285F4] hover:bg-[#4285F4]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 font-sans"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          
            <div className="flex items-center w-[80%] gap-2 ">
              <hr className="flex-1 border-white/20" />
              <span className="text-white/70 font-semibold text-sm">OR</span>
              <hr className="flex-1 border-white/20" />
            </div>

            <div className="w-[80%] h-[7vh] flex justify-center items-center">
              <input
                onChange={handleInputChange}
                className="text-sm p-2 pt-5 peer block w-full h-[90%] rounded-sm bg-white/10 pl-5 hover:scale-[1.02] cursor-pointer focus:border-0 focus:outline-0"
                type="text"
                name="email"
                placeholder=" "
                value={form.email.toLowerCase()}
              />
              <label className="absolute left-12 placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm translate-y-[-80%] peer-placeholder-shown:translate-y-0 text-[12px] peer-focus:translate-y-[-80%] peer-focus:text-[10px]  peer-placeholder-shown:left-16 peer-focus:left-13 peer-focus:text-purple-300 
              peer-focus:font-semibold  peer-placeholder-shown:text-white text-purple-400 pointer-events-none peer-hover:scale-[1.02] hover:scale-[1.02] font-mono">
                Enter Email
              </label>
            </div>

            <div className="w-[80%] h-[7vh] flex justify-center items-center bg-white/10 rounded-sm ">
              <input
                onChange={handleInputChange}
                className="text-sm p-2 pt-5 peer block w-full h-[90%] rounded-sm  hover:scale-[1.02] pl-5 cursor-pointer overflow-xhidden overflow-ellipsis focus:border-0 focus:outline-0 "
                type={eye ? "text" : "password"}
                placeholder=" "
                name="password"
                value={form.password}
              />
              <label className="absolute left-12 placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm translate-y-[-80%] peer-placeholder-shown:translate-y-0 text-[12px] peer-focus:translate-y-[-80%] peer-focus:text-[10px] font-mono peer-placeholder-shown:left-16 peer-focus:left-13 peer-focus:text-purple-300 
              peer-focus:font-semibold peer-placeholder-shown:text-white  text-purple-400 pointer-events-none peer-hover:scale-[1.02] hover:scale-[1.02]">
                Enter Password
              </label>
              <img
                onClick={HandlePassEye}
                className="cursor-pointer"
                width={25}
                src={eye ? "/assets/eyeCut.svg" : "/assets/eye.svg"}
                alt=""
              />
            </div>

            <div className="forgotPassword font-semibold font-mono underline hover:text-purple-400 duration-50 transition-all ease-in-out cursor-pointer  text-sm lg:text-md">
              <Link href="/forgot">Forgot Password</Link>
            </div>
            <button
              disabled={isSubmitting ? true : false}
              type="submit"
              className={`rounded-md w-[20%] h-[7%]  font-extrabold  text-md sm:text-lg text-purple-950 hover:bg-[#0044ff] font-sans
                hover:text-white hover:scale-[1.05] cursor-pointer animate-pulse ${
                isSubmitting ? "bg-white/10 hover:bg-white/10" : "bg-white"
              }`}
            >
              Login
            </button>
            <Link
              href="/SignUP"
              className="font-semibold font-mono text=md underline cursor-pointer hover:text-[#658eff] text-sm lg:text-md "
            >
              Wanna create Account
            </Link>
          </motion.form>
        </div>
      </motion.div>
    </div>
       }
    
 </>);
}

export default Page;
