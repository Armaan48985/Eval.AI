"use client";
import { HoverBorderGradient } from "@/components/ui/hover-button";
import Link from "next/link";
import React from "react";


export function HoverBorderGradientDemo() {
  return (
    <div className="">
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="bg-gradient-to-r py-4 px-10 text-white   from-[#001f3f] to-[#0191d8]  text-xl  flex items-center space-x-2"
    >
      <Link href='/dashboard'>
        <span>Get Started</span>
      </Link>
    </HoverBorderGradient>
  </div>  
  );
}

