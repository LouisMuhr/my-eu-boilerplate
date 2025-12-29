import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Complete Next.js 14 boilerplate",
  "Authentication system (Email + OAuth)",
  "Stripe payment integration",
  "Multi-language support (i18n)",
  "GDPR-compliant legal pages",
  "Cookie consent management",
  "Postgres + Prisma setup",
  "Email templates (Resend)",
  "Admin dashboard foundation",
  "Dark mode support",
  "TypeScript throughout",
  "Lifetime updates & bug fixes",
];

export function Pricing() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-gray-900 dot-grid relative overflow-hidden">
      <div className="container max-w-[1440px] px-8 md:px-16">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left side - Content */}
          <div className="flex-1">
            <h2 className="text-[48px] md:text-[64px] font-extrabold text-[#F5F5F0] leading-tight text-brutalist mb-6">
              One Price.<br/>
              <span className="text-[#00FF94]">Infinite Value.</span>
            </h2>
            <p className="text-xl text-[#F5F5F0]/70 mb-12 max-w-xl">
              Stop paying monthly subscriptions for boilerplates. 
              Pay once, own it forever. Build unlimited projects.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#00FF94] flex-shrink-0 mt-1" strokeWidth={3} />
                  <span className="text-[#F5F5F0] text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Pricing Card */}
          <div className="lg:w-[480px] w-full">
            <div className="bg-[#F5F5F0] border-4 border-black p-10 shadow-brutalist">
              <div className="mb-8">
                <div className="mono text-sm font-bold text-[#0A0A0A]/60 mb-2">ONE-TIME PAYMENT</div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[72px] font-extrabold text-[#0A0A0A] leading-none text-brutalist">
                    $199
                  </span>
                  <span className="text-2xl text-[#0A0A0A]/40 line-through">$499</span>
                </div>
                <div className="mono text-sm text-[#FF3366] font-bold">
                  ⚡ LAUNCH SPECIAL — SAVE $300
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b-2 border-black/10">
                  <span className="text-[#0A0A0A] font-medium">Full source code</span>
                  <span className="mono text-sm font-bold text-[#00FF94]">✓</span>
                </div>
                <div className="flex justify-between py-3 border-b-2 border-black/10">
                  <span className="text-[#0A0A0A] font-medium">Commercial license</span>
                  <span className="mono text-sm font-bold text-[#00FF94]">✓</span>
                </div>
                <div className="flex justify-between py-3 border-b-2 border-black/10">
                  <span className="text-[#0A0A0A] font-medium">Private GitHub repo</span>
                  <span className="mono text-sm font-bold text-[#00FF94]">✓</span>
                </div>
                <div className="flex justify-between py-3 border-b-2 border-black/10">
                  <span className="text-[#0A0A0A] font-medium">Lifetime updates</span>
                  <span className="mono text-sm font-bold text-[#00FF94]">✓</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#0A0A0A] font-medium">Priority support</span>
                  <span className="mono text-sm font-bold text-[#00FF94]">✓</span>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="w-full bg-[#00FF94] hover:bg-[#00FF94]/90 text-black font-bold text-xl py-8 border-4 border-black shadow-brutalist-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150 group"
              >
                Get Instant Access
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="mt-6 text-center mono text-xs text-[#0A0A0A]/60">
                Instant delivery • Secure checkout • 14-day refund
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="mt-6 bg-[#FF3366] border-4 border-black p-4 text-center shadow-brutalist-sm">
              <div className="mono text-sm font-bold text-black">
                🔥 47 developers bought in the last 24h
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
