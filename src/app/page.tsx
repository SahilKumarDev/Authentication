"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

const page = () => {
  const words = [
    {
      text: "User",
    },
    {
      text: "Profile",
    },
    {
      text: "Creation",
    },
    {
      text: "Authentication",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Project.",
    },
  ];

  return (
    <div className="text-center  h-full ">
      <div>
        <h1 className="text-6xl mb-12 font-bolder tracking-wide">
          UserAuthentication
        </h1>

        <div className="flex flex-col items-center justify-center gap-10">
          <TypewriterEffect words={words} />

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Link
              href="/login"
              className="w-40 py-2 flex justify-center items-center rounded-xl bg-white text-black border border-black text-lg ease-in duration-300 font-bold hover:bg-slate-500 hover:bg-opacity-80 dark:border-white border-transparent"
            >
              Signup
            </Link>

            <Link
              href="/signup"
              className="w-40 py-2 flex justify-center items-center rounded-xl border ease-in duration-300 hover:bg-yellow-400  dark:border-white border-transparent text-white text-lg font-bold bg-transparent "
            >
              Join now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
