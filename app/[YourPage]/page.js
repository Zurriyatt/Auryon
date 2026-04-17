"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

function Page() {
  const [payment, setPayment] = useState([]);
  const router = useRouter();
  const { YourPage } = useParams();
  let userToBeShown;
  const [errrr, setErrr] = useState({
    error: "",
  });
  useEffect(() => {
    const tooast = sessionStorage.getItem("toast");
    if (tooast) {
      const { success, title, description } = JSON.parse(tooast);
      if (success) {
        toast.success(title, { description: description });
      }
      sessionStorage.removeItem("toast");
    }
  }, []);
  const [data, setData] = useState(null);
  const [onLoading, setLoading] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (fdata) => {
    let formData = fdata;
    formData.userName = data.userName;

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fdata),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error("Payment error", { description: result.message });
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during payment");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await fetch(`/api/completeprofile/${YourPage}`, {
        method: "GET",
      });
      const data = await res.json();

      if (data.res) {
        setData(data.res);
        const result = await fetch(
          `/api/paymentGet?userName=${data.res.userName}`,
          { method: "GET" },
        );

        const dataP = await result.json();

        if (dataP.res) {
          setPayment(dataP.res);
        }
      } else if (data.error) {
        setErrr({
          error: data.error,
        });
        setData(undefined);
        userToBeShown = data.userName;
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {}, [setPayment]);
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {onLoading ? (
        <div className="flex justify-center items-center w-screen h-[90vh] overflow-hidden bg-black/30">
          <div className="w-[250px] h-[250px] rounded-full border-8 border-t-transparent border-blue-500 animate-spin"></div>
        </div>
      ) : data ? (
        <motion.div
          className="relative min-h-[82vh] sm:min-h-[84vh] w-screen flex flex-col justify-center items-center overflow-y-scroll overflow-x-hidden m-0 p-0"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundColor: "#0f172a",
          }}
        >
          {/* Cover Image */}
          <motion.div
            className="min-h-[41vh] sm:min-h-[42vh] w-[100vw] flex justify-center  m-0 p-0 bg-gradient-to-r from-green-500 via-pink-400 to-blue-600"
            variants={fadeInDown}
          >
            <img
              className="w-screen h-[40.5vh] sm:h-[41.5vh] object-cover animate"
              src={`${data.coverImage}`}
              alt="Cover"
            />

            {/* Profile Image */}
            <motion.div
              className="profile sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] absolute z-3 rounded-full border-white left-1/2 top-[calc(40.5vh-50px)] sm:top-[calc(41.5vh-75px)] -translate-x-1/2 flex justify-center items-center bg-gradient-to-br from-green-500 via-pink-400 to-blue-600 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-lg"
              variants={fadeInUp}
            >
              <img
                src={`${data.image}`}
                className="rounded-full w-[95px] sm:w-[145px] h-[100px] sm:h-[140px] object-cover"
                alt="Profile"
              />
            </motion.div>
          </motion.div>

          {/* User Info */}
          <motion.div
            className="min-h-[31vh] sm:min-h-[30vh] w-[100vw] flex justify-center items-start mt-[50px] sm:mt-[75px]"
            variants={fadeInUp}
          >
            <div className="flex flex-col justify-center items-center mx-0 w-[100vw]  gap-3">
              <motion.div
                className="name text-sm font-bold text-gray-500 hover:text-blue-400 cursor-pointer transition-colors duration-200 ease-in-out hover:scale-102"
                variants={fadeInUp}
              >
                {data.userName}
              </motion.div>
              <motion.div
                className="name text-3xl font-bold text-white hover:text-blue-400 cursor-pointer transition-colors duration-200 ease-in-out hover:scale-102"
                variants={fadeInUp}
              >
                {data.name}
              </motion.div>
              <motion.div
                className="name text-sm hover:text-blue-400 cursor-pointer transition-colors duration-200 ease-in-out hover:scale-102 font-mono font-bold"
                variants={fadeInUp}
              >
                {data.aboutyou}
              </motion.div>
              <motion.div
                className="name flex justify-center items-center cursor-pointer hover:text-blue-400 transition-colors duration-200 ease-in-out hover:scale-102"
                onClick={() => navigator.clipboard.writeText(data._id)}
                variants={fadeInUp}
              >
                <span className="font-bold">UID : </span>
                {data._id}
                <lord-icon
                  src="https://cdn.lordicon.com/hmpomorl.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#d1fad7,secondary:#9cf4a7"
                  style={{ width: "23px", height: "23px" }}
                ></lord-icon>
              </motion.div>
            </div>
          </motion.div>

          {/* Payments Section */}
          <motion.div
            className="payments h-[100vh] lg:h-[61vh] w-screen flex flex-col lg:flex-row gap-10 justify-center items-center mt-10"
            variants={fadeInUp}
          >
            {/* Supporters */}

            <motion.div
              className="make-payments w-[80%] min-h-[40%] lg:w-[40%] lg:min-h-[90%] bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 rounded-3xl shadow-[0px_0px_10px_rgba(72,125,239,0.3)] text-[#001427] font-extrabold text-2xl flex flex-col justify-center items-center gap-5 cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out overflow-hidden pb-5 pt-2 "
              variants={fadeInUp}
            >
              <span className="pr-[0%] font-extrabold font-sans">Supporters</span>
              <table className="font-semibold text-white text-[17px] w-[90%] h-[80%] bg-white/10 p-2 rounded-lg text-sm">
                <thead className="border-b border-white/30 text-left">
                  <tr className="flex justify-between px-5">
                    <th className="w-[33%] sm:text-lg text-sm font-sans ">Name</th>
                    <th className="w-[33%] text-center sm:text-lg text-sm font-sans ">
                      Amount
                    </th>
                    <th className="w-[33%] text-right sm:text-lg text-sm font-sans ">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-2 overflow-y-auto max-h-[30vh]">
                  {payment && payment.length > 0 ? (
                    payment.map((i, idx) => (
                      <tr
                        key={idx}
                        className="flex justify-between items-center px-5 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 ease-in-out"
                      >
                        <td className="text-sm w-[33%] text-left font-sans">
                          {i.fuserName}
                        </td>
                        <td className="text-sm w-[33%] text-center font-serif">
                          ${i.amount}
                        </td>
                        <td className="text-sm w-[33%] text-right italic text-gray-300 font-mono">
                          {i.comments || "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="flex justify-center items-center py-4">
                      <td className="text-center text-gray-400">
                        No Supporters yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>

            {/* Make Payment */}
            <motion.div
              className="supporters w-[80%] h-[50%] lg:w-[40%] lg:h-[90%] bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 rounded-3xl shadow-[0px_0px_10px_rgba(72,125,239,0.3)] text-[#001427] flex justify-center items-center flex-col text-sm font-semibold font-mono gap-2 cursor-pointer hover:scale-102 transition-all duration-200 ease-in-out p-4"
              variants={fadeInUp}
            >
              <span className="font-extrabold text-3xl">Make a Payment</span>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" "
                    name="floating_name"
                    className="peer block sm:w-[60vw] md:w-[70vw] lg:w-[37vw] xl:w-[25vw] h-[50px] bg-black/20 text-white rounded-xl border-0 outline-none focus:ring-1 focus:ring-indigo-400/50 hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-text px-3 pt-2"
                    {...register("name", {
                      required: true,
                      maxLength: { value: 16, message: "Max chars are 16" },
                      minLength: {
                        value: 4,
                        message: "Minimum length of name is 4!",
                      },
                    })}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                  <label
                    htmlFor="floating_name"
                    className="absolute top-1  left-3 text-[10px] peer-placeholder-shown:text-[15px]    peer-placeholder-shown:top-4  peer-placeholder-shown:left-8 peer-focus:top-1  peer-focus:left-3 peer-focus:text-[10px]  pointer-events-none peer-hover:scale-[1.02]"
                  >
                    Enter Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" "
                    name="floating_comments"
                    className="peer block sm:w-[60vw] md:w-[70vw] lg:w-[37vw] xl:w-[25vw] h-[50px] bg-black/20 text-white rounded-xl border-0 outline-none focus:ring-1 focus:ring-indigo-400/50 hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-text px-3 pt-2"
                    {...register("comment", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Minimum commennt should be 8 char!",
                      },
                      maxLength: {
                        value: 36,
                        message: "maximum length cannn be 36",
                      },
                    })}
                  />
                  {errors.comment && (
                    <p className="text-red- font-mono font-bold text-sm">
                      {errors.comment.message}
                    </p>
                  )}
                  <label
                    htmlFor="floating_comments"
                    className="absolute top-1  left-3 text-[10px] peer-placeholder-shown:text-[15px]    peer-placeholder-shown:top-4  peer-placeholder-shown:left-8 peer-focus:top-1  peer-focus:left-3 peer-focus:text-[10px]  pointer-events-none peer-hover:scale-[1.02]"
                  >
                    Pass some comments
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder=" "
                    name="floating_amount"
                    className="peer block sm:w-[60vw] md:w-[70vw] lg:w-[37vw] xl:w-[25vw] h-[50px] bg-black/20 text-white rounded-xl border-0 outline-none focus:ring-1 focus:ring-indigo-400/50 hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-text px-3 pt-2"
                    {...register("amount", {
                      required: true,
                      min: {
                        value: 1,
                        message: "Amount can only be Positive!",
                      },
                    })}
                  />
                  {errors.amount && <p>{errors.amount.message}</p>}
                  <label
                    htmlFor="amount"
                    className="absolute top-1  left-3 text-[10px] peer-placeholder-shown:text-[15px]    peer-placeholder-shown:top-4  peer-placeholder-shown:left-8 peer-focus:top-1  peer-focus:left-3 peer-focus:text-[10px]  pointer-events-none peer-hover:scale-[1.02]"
                  >
                    Enter Amount
                  </label>
                </div>

                <button
                  type="submit"
                  className="sm:w-[60vw] md:w-[70vw] lg:w-[37vw] xl:w-[25vw] h-[50px] text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 active:from-blue-600 active:via-blue-700 active:to-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80   rounded-lg text-[17px] font-extrabold font-mono px-5 py-2.5 text-center hover:scale-[1.02]  "
                >
                  Support
                </button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="min-h-[82vh] sm:min-h-[84vh] w-screen flex flex-col justify-center items-center">
          <div className="bg-black text-white p-3 rounded-md font-mono  font-bold">
            Finding data Please Wait{" "}
          </div>
          <div className="bg-black text-white p-3 rounded-md font-mono  font-bold">
            {errrr.error}
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
