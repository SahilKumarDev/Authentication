"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const getUserData = async () => {
    try {
      const res = await axios.post("/api/users/profile");
      console.log(res.data.data.username);
      setData(res.data.data.username);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex justify-center items-center w-full  h-full ">
      <div className="py-4 px-8 border-[1px] bg-[#00c3e659] border-[#03fffb] rounded-xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-5 font-bold text-yellow-600 text-xl">
            Your Profile
          </h1>

          <div className="space-y-4">
            <h2 className="py-1 px-3 flex justify-center items-center text-xl w-full rounded bg-green-500">
              {data === "nothing" ? (
                "Click on get your details"
              ) : (
                <h4>Name: {data}</h4>
              )}
            </h2>

            <div className="flex gap-2 justify-center items-center ">
              <button
                onClick={getUserData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Get your details
              </button>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
