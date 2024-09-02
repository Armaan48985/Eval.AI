import { FlipWords } from "@/components/ui/flipcard";
import React from "react";
import { HoverBorderGradientDemo } from "./HoverButton";


export function FlipWordsDemo() {
  const words = ["Refactor Code", "Generate Testcases", " Review Code", "Analyse Complexity"];

  return (
    
    <div className="h-[40rem]  flex flex-col mt-20 ml-10 gap-10 justify-center items-center  px-4">
      <div className="text-6xl inline-block font-normal mx-auto  text-white dark:text-neutral-400">
        With EvalAI
         <br />
        You can <FlipWords words={words} />
      </div>

      <div className="">
        <HoverBorderGradientDemo/>
      </div>
    </div>
  );
}
