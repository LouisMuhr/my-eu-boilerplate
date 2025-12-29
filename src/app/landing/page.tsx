import Home from "@/components/Home";
import { Pricing } from "@/components/Pricing";
import { TechStack } from "@/components/Techstack";

export default function Page() {
    return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Home />
      <TechStack />
      <Pricing />
    </div>
  );
}
