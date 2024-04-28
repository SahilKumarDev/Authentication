"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("login success", response.data);
      router.push("/profile");
    } catch (error: any) {
      // console.log("login failed");
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex justify-center items-center w-full  h-full ">
      <div className="py-4 px-8 border-[1px] bg-[#00c3e659] border-[#03fffb] rounded-xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-5 font-bold text-yellow-600 text-xl">
            {loading ? "Processing" : "Login"}
          </h1>
          {/* <hr /> */}

          <input
            className="border-[1px] bg-[#00c3e659] border-[#03fffb] text-sm py-2 px-3  rounded-sm mb-4 focus:outline-none focus:border-gray-600 text-white placeholder:text-black placeholder:text-sm"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />

          <input
            className="border-[1px] bg-[#00c3e659] border-[#03fffb] text-sm py-2 px-3  rounded-sm mb-4 focus:outline-none focus:border-gray-600 text-white placeholder:text-black placeholder:text-sm"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <button
            onClick={onLogin}
            className="py-1 px-3 border border-blue-300 rounded-lg bg-[#3de0fd4d] focus:outline-none focus:border-gray-600 hover:bg-[#53e4fee1] hover:text-black"
          >
            Login
          </button>

          <div className="flex gap-2 items-center justify-center mt-4">
            <span>Create your account</span>
            <Link
              className="text-sm text-blue-600 hover:text-blue-400"
              href="/signup"
            >
              Signup here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
