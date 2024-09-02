"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-hightlight";
import { motion } from "framer-motion";
import { HoverBorderGradientDemo } from "./HoverButton";
import Link from "next/link";


export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="relative text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        With insomnia, nothing&apos;s real. Everything is far away. Everything
        is a{" "}
        <Highlight className="text-black dark:text-white">
          copy, of a copy, of a copy.
        </Highlight>

      </motion.h1>
        <div className="mt-14 absolute bottom-[-5rem] left-[23rem]">
            <Link href='/dashboard'>
                <HoverBorderGradientDemo/>
            </Link>
        </div>
    </HeroHighlight>
  );
}
