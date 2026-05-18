import React from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../Components/Navbar";
import { Shield, Zap, Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const philosophies = [
    {
      title: "Clarity",
      desc: "Zero clutter, zero borders. Only your focus, prioritized.",
      icon: Zap
    },
    {
      title: "Security",
      desc: "Hashed data layers guarding your lists with absolute integrity.",
      icon: Shield
    },
    {
      title: "Passion",
      desc: "Crafted for creators and builders demanding luxury workspaces.",
      icon: Heart
    }
  ];

  return (
    <MainLayout hideFooter>
      <div className="min-h-svh  bg-background text-foreground relative overflow-hidden flex flex-col items-center justify-center px-6 pt-32 pb-20 select-none">
        {/* Background glowing blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-12 md:gap-16 relative z-10 w-full">

          {/* Back Button */}
          <button
            onClick={() => window.history.state && window.history.state.idx > 0 ? navigate(-1) : navigate("/")}
            className="self-start flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all duration-300 group -mb-6 md:-mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          {/* Header */}
          <div className="flex flex-col items-center gap-3 md:gap-4 max-w-xl">
            <span className="inline-block py-1 px-3.5 rounded-full bg-foreground/[0.03] border border-border/40 text-[9px] md:text-[10px] font-black tracking-widest uppercase text-text-secondary">
              Our Identity
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight text-text-primary leading-none">
              About Us
            </h1>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-md mt-1 md:mt-2">
              We construct minimalist digital workspaces that filter out background noise, helping you maintain absolute focus on your true work priorities.
            </p>
          </div>

          {/* Philosophy list - Horizontal flat composition with circular icon outline and glows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-3xl relative">
            {philosophies.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-3 relative group"
                >
                  {/* Icon glow outline circle */}
                  <div className="w-12 h-12 rounded-full bg-foreground/[0.02] border border-border/30 flex items-center justify-center text-text-primary group-hover:bg-foreground/[0.05] group-hover:border-foreground/20 transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs md:text-sm font-black tracking-widest uppercase text-text-primary group-hover:text-foreground transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] md:text-xs text-text-secondary leading-relaxed max-w-[200px]">
                      {item.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered Contact Section (Matching premium home CTA buttons) */}
          <div className="flex flex-col items-center gap-3 w-full border-t border-border/20 pt-8 max-w-md">
            <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase text-text-secondary">
              Get In Touch
            </span>
            <a
              href="mailto:ravalkrutarth95@gmail.com"
              className="group relative flex items-center gap-3 px-6 py-2.5 rounded-xl bg-foreground text-background hover:scale-105 transition-transform duration-300 active:scale-95 shadow-md font-black uppercase tracking-widest text-[11px] md:text-xs overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                ravalkrutarth95@gmail.com
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default About;
