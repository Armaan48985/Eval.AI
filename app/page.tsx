import { BackgroundBeamsWithCollision } from "@/components/Landing";
import { HeroHighlightDemo } from "./HeroHighlight";
import { HoverBorderGradientDemo } from "./HoverButton";
import { FlipWordsDemo } from "./FlipCard";


export default function Home() {
  return (
<div
  className="w-full min-h-screen overflow-hidden"
  style={{
    background: 'radial-gradient(circle, #001f3f 1%, #000000 90%)', // Dark Blue to deeper Black gradient
  }}
>
  <div className="relative">
      <FlipWordsDemo />
  </div>
</div>
  );
}
