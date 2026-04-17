"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
function Page() {
  const toastDash = {
    success : true , 
    title : "Your Page is updated successfully🎉!",
    description : "Now its ready for peoples to see"
  }
  useEffect(() => {
    const toast1  = sessionStorage.getItem("toast")
    if(toast1){
    const {success , title , description} = JSON.parse(toast1)
    if(success) {
      toast.success(title , {description : description})
   
    }sessionStorage.removeItem("toast")}
    
  }, [])
  const [onLoading, setLoading] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [datas, setData] = useState({_id: '', name: 'Auryon', image: '', coverImage: '', aboutyou: ''});
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    aboutyou: undefined,
  });
  const [images, setImages] = useState({
    image: "",
    coverImage: "",
  });
  useEffect(() => {

    const fetchData = (async () => {
      setLoading(true);
      const res = await fetch("/api/completeprofile/YourPage", { method: "GET" });
      const data = await res.json();

      setData(data.res);
      setLoading(false);
    })();
  }, [])
  const handleInputChange = (e) => {
    if (e.target.name === "image" || e.target.name === "coverImage") {
      setImages({ ...images, [e.target.name]: e.target.files[0] });
    } else {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value.length === 0 ? undefined : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    if (form.name) {
      if (form.name.length > 16) {
        alert("Max Length of name can be 16 letters");
        setDisabled(false);
        return;
      }
      if (form.aboutyou && form.aboutyou.length > 106) {
        alert("Max length of bio can be 106 words");
        setDisabled(false);
        return;
      }
      let formData = new FormData();
      formData.append("name", form.name);
      formData.append("aboutyou", form.aboutyou);
      formData.append("image", images.image);
      formData.append("coverImage", images.coverImage);

      const ftch = await fetch("/api/completeprofile/YourPage", {
        method: "POST",
        body: formData,
      });
      const res = await ftch.json();
      setDisabled(false);
      if (res){
        sessionStorage.setItem("toast" , JSON.stringify(toastDash))
        router.replace("/YourPage")};
    } else {
      alert("Please fill the form");
      setDisabled(false);
    }
  };
  
  // Variants for motion
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      {onLoading?<div className="flex justify-center items-center w-screen h-[90vh] overflow-hidden bg-black/30">
          <div className="w-[250px] h-[250px] rounded-full border-8 border-t-transparent border-blue-500 animate-spin"></div>
        </div>: datas?<div className="w-screen min-h-[82vh] sm:min-h-[84vh] bg-[#19183B] flex justify-center items-center">
        <motion.div
          className="mt-5 mb-5 form w-[85vw] min-h-[79vh] md:min-h-[70vh] bg-gradient-to-br from-purple-500 via-pink-600 to-blue-500 flex justify-center items-center shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="form-main w-[84vw] min-h-[78vh] md:min-h-[69vh] bg-[#19183B] rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center text-white"
            variants={containerVariants}
          >
            {/* LEFT SECTION */}
            <motion.div
              className="w-full sm:w-[45%] h-full flex flex-col justify-center gap-8"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                variants={itemVariants}
              >
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  Forge Your Identity
                </h1>
                <p className="text-gray-300 text-sm mt-2">
                  Build your Auryon presence. Upload your image or use the
                  default.
                </p>
              </motion.div>

              {/* Input Fields */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col gap-4"
                variants={itemVariants}
              >
                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">Name</label>
                  <input
                    value={form.name}
                    name="name"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Edit your name"
                    className="bg-[#1E1C3D] border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.4)] transition-all focus:animate-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">
                    About You
                  </label>
                  <textarea
                    value={form.aboutyou}
                    name="aboutyou"
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Edit bio about yourself..."
                    className="bg-[#1E1C3D] border border-white/20 rounded-md px-3 py-2 text-sm resize-none outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.4)] transition-all focus:animate-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-sm text-gray-300 mb-1">
                      Profile Image
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className="text-xs file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-blue-500 file:text-white cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-sm text-gray-300 mb-1">
                      Cover Image
                    </label>
                    <input
                      accept=".jpg,.jpeg,.png"
                      name="coverImage"
                      type="file"
                      onChange={handleInputChange}
                      className="text-xs file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-gradient-to-r file:from-pink-600 file:to-purple-600 file:text-white cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                disabled={disabled}
                className={`mt-4 bg-gradient-to-r  py-2 rounded-md font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.5)] ${
                  disabled
                    ? "from-pink-900 via-purple-900 to-blue-800"
                    : "from-pink-500 via-purple-600 to-blue-500 active:from-pink-600 active:via-purple-700 active:to-blue-600"
                }`}
                onClick={handleSubmit}
                variants={itemVariants}
              >
                Enter the Realm
              </motion.button>
            </motion.div>

            {/* RIGHT SECTION — Preview */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex w-[50%] h-full justify-center items-center text-center"
              variants={itemVariants}
            >
              
              <div className="relative w-[250px] h-[250px] rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-[2px] shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                
                <div className="bg-[#19183B] w-full h-full rounded-xl flex flex-col justify-center items-center text-center font-bold font-mono">
                  Current Details<img
                    src={`${datas.image?datas.image:`0   `}`}
                    alt="Profile"
                    className="w-[90px] h-[90px] rounded-full object-cover border-2 border-white/30 mb-3 cursor-pointer  hover:scale-[1.02]"
                  />
                  <h2 className="font-bold text-lg hover:scale-[1.02]">{datas.name}</h2>
                  <p className="text-gray-400 text-sm text-center px-4  hover:scale-[1.02]">
                    {datas.aboutyou}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>:
       /*Theres statrt differennt second div */ 
      <div className="w-screen min-h-[82vh] sm:min-h-[84vh] bg-[#19183B] flex justify-center items-center">
        <motion.div
          className="form w-[85vw] h-[79vh] md:h-[70vh] bg-gradient-to-br from-purple-500 via-pink-600 to-blue-500 flex justify-center items-center shadow-[0_0_15px_rgba(168,85,247,0.4)] rounded-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="form-main w-[84vw] h-[78vh] md:h-[69vh] bg-[#19183B] rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center text-white"
            variants={containerVariants}
          >
            {/* LEFT SECTION */}
            <motion.div
              className="w-full sm:w-[45%] h-full flex flex-col justify-center gap-8"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                variants={itemVariants}
              >
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  Forge Your Identity
                </h1>
                <p className="text-gray-300 text-sm mt-2">
                  Build your Auryon presence. Upload your image or use the
                  default.
                </p>
              </motion.div>

              {/* Input Fields */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col gap-4"
                variants={itemVariants}
              >
                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">Name</label>
                  <input
                    value={form.name}
                    name="name"
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter your name"
                    className="bg-[#1E1C3D] border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-pink-500 focus:shadow-[0_0_10px_rgba(236,72,153,0.4)] transition-all focus:animate-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">
                    About You
                  </label>
                  <textarea
                    value={form.aboutyou}
                    name="aboutyou"
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Write something about yourself..."
                    className="bg-[#1E1C3D] border border-white/20 rounded-md px-3 py-2 text-sm resize-none outline-none focus:border-blue-500 focus:shadow-[0_0_10px_rgba(59,130,246,0.4)] transition-all focus:animate-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-sm text-gray-300 mb-1">
                      Profile Image
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className="text-xs file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-blue-500 file:text-white cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-sm text-gray-300 mb-1">
                      Cover Image
                    </label>
                    <input
                      accept=".jpg,.jpeg,.png"
                      name="coverImage"
                      type="file"
                      onChange={handleInputChange}
                      className="text-xs file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-gradient-to-r file:from-pink-600 file:to-purple-600 file:text-white cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                disabled={disabled}
                className={`mt-4 bg-gradient-to-r  py-2 rounded-md font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.5)] ${
                  disabled
                    ? "from-pink-900 via-purple-900 to-blue-800"
                    : "from-pink-500 via-purple-600 to-blue-500 active:from-pink-600 active:via-purple-700 active:to-blue-600"
                }`}
                onClick={handleSubmit}
                variants={itemVariants}
              >
                Enter the Realm
              </motion.button>
            </motion.div>

            {/* RIGHT SECTION — Preview */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex w-[50%] h-full justify-center items-center"
              variants={itemVariants}
            >
              <div className="relative w-[250px] h-[250px] rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-[2px] shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                <div className="bg-[#19183B] w-full h-full rounded-xl flex flex-col justify-center items-center">
                  <img
                    src="/aimage"
                    alt="Profile"
                    className="w-[90px] h-[90px] rounded-full object-cover border-2 border-white/30 mb-3"
                  />
                  <h2 className="font-bold text-lg"></h2>
                  <p className="text-gray-400 text-sm text-center px-4">
                    “Your presence defines your Aura in the realm.”
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>}
     
    </>
  );
}

export default Page;
