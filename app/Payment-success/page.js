"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const tuserName  = params.get("tuserName")
    const comments = params.get("comments")
    console.log(comments , "comments from fornt jend ")
    console.log(tuserName )
    if (!sessionId) {
      setError("No session_id found in URL");
      setLoading(false);
      return;
    }

    // Call your backend API to fetch Stripe session
    fetch(`/api/payment-session?session_id=${sessionId}&tuserName=${encodeURIComponent(tuserName)}&comments=${encodeURI(comments)}`)
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch payment session");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center w-screen h-[90vh] overflow-hidden bg-black/30">
          <div className="w-[250px] h-[250px] rounded-full border-8 border-t-transparent border-blue-500 animate-spin"></div>
        </div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-md h-[70vh] mx-auto mt-10 p-5 border rounded-lg shadow-lg text-center bg-white flex flex-col items-center pt-14 ">
      <div className = "rounded-[50%] bg-green-500/30 h-30 w-30 mb-5 flex justify-center pt-5 items-center text-white text-lg hover:scale-[1.02]"><div className = "rounded-[50%] bg-green-500 h-20 w-20 mb-5 flex justify-center items-center text-white text-lg"> <img src="/assets/tick.svg" alt="" className = 'w-10' /></div> </div>
      
      <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful🎉</h1>
      <div className = "border-b-1 border-gray-400 w-[100%] h-2 rounded-[30%]"></div>
      <p className="mb-2 pt-6 text-black font-bold font-mono">Thank you✨</p>
      <div className ="flex justify-between w-[100%]">
        <p className = "mb-2 text-gray-400 font-bold font-mono  text-sm pl-4">Email:-</p>
      <p className="mb-2 text-black font-bold font-mono  text-sm ">{session.customer_details?.email}</p></div>
      <div className = "border-b-1 border-gray-400 w-[100%] h-2 rounded-[30%]"></div>
      <span className = 'text-gray-500/80 font-bold text-[14px] pt-4  font-mono '>Amount Paid</span>
      <span className="mb-2 shadow-[0px_0px_7px_rgba(0,0,0,0.3)] flex justify-center items-center flex-col  text-black font-bold font-mono text-2xl p-4 rounded[10px] "><span>   {(session.amount_total / 100)} {session.currency.toUpperCase()} </span> 
      <span className = "text-[10px] font-bold text-gray-700 ">rs = {session.amount_total /100 *285}</span>
      </span>

      
    </div>
  );
}
