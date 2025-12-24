"use client";


const techStack = [
  {
    name: "Next.js 14",
    logo: "https://cdn.simpleicons.org/nextdotjs/000000",
    color: "#000000",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.simpleicons.org/typescript/3178C6",
    color: "#3178C6",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    color: "#06B6D4",
  },
  {
    name: "Stripe",
    logo: "https://cdn.simpleicons.org/stripe/008CDD",
    color: "#008CDD",
  },
  {
    name: "Prisma",
    logo: "https://cdn.simpleicons.org/prisma/2D3748",
    color: "#2D3748",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.simpleicons.org/postgresql/4169E1",
    color: "#4169E1",
  },
  {
    name: "Resend",
    logo: "https://cdn.simpleicons.org/maildotru/000000",
    color: "#000000",
  },
  {
    name: "Vercel",
    logo: "https://cdn.simpleicons.org/vercel/000000",
    color: "#000000",
  },
];

export function TechStack() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-gray-900 dot-grid relative overflow-hidden">
      <div className="container max-w-[1440px] px-8 md:px-16">
        <div className="text-center mb-20">
          <h2 className="text-[48px] md:text-[64px] font-extrabold text-[#F5F5F0] leading-tight text-brutalist mb-6">
            Built with the <span className="text-[#00FF94]">Best Stack</span>
          </h2>
          <p className="text-xl text-[#F5F5F0]/70 max-w-2xl mx-auto">
            Industry-standard technologies. No experimental frameworks. 
            Battle-tested and production-ready.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="bg-[#F5F5F0] border-4 border-black p-8 flex flex-col items-center justify-center gap-4 shadow-brutalist-sm hover:translate-y-[-4px] hover:shadow-brutalist transition-all duration-200 group cursor-pointer"
              style={{
                ['--tech-color' as string]: tech.color,
              }}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                style={{
                  filter: 'grayscale(100%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.boxShadow = `0 0 20px ${tech.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mono text-sm font-bold text-[#0A0A0A] text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="inline-block bg-[#F5F5F0] border-4 border-black px-8 py-4 shadow-brutalist-sm">
            <p className="mono text-sm font-bold text-[#0A0A0A]">
              + shadcn/ui • Framer Motion • React Hook Form • Zod • and more...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
