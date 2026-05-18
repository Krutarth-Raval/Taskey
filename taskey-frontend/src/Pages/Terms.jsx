import React from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Terms() {
  const navigate = useNavigate();
  return (
    <MainLayout hideFooter>
      <div className="min-h-svh bg-background text-foreground pt-32 pb-24 px-6 relative overflow-hidden flex flex-col items-center justify-center">
        {/* Background glowing blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-2xl mx-auto flex flex-col gap-10 relative z-10 select-none text-left w-full">

          {/* Back Button */}
          <button
            onClick={() => window.history.state && window.history.state.idx > 0 ? navigate(-1) : navigate("/")}
            className="self-start flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all duration-300 group -mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          {/* Document Header */}
          <div className="border-b-2 border-border pb-6 flex flex-col gap-2">
            <span className="text-[10px] font-black tracking-widest uppercase text-text-secondary">
              Legal Agreement
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tight text-text-primary">
              Terms & Conditions
            </h1>
            <span className="text-[11px] font-bold tracking-widest uppercase text-text-secondary/60">
              Last Updated: May 17, 2026
            </span>
          </div>

          {/* Legal Clauses */}
          <div className="flex flex-col gap-8">

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                1. Acceptance of Terms
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                By registering a secure profile, connecting an account, or interacting with the services provided on Taskey, you explicitly agree to be legally bound by these Terms & Conditions. If you disagree with any segment of this document, you must discontinue your use of the platform and delete your account immediately.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                2. Profile Security & Integrity
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                You hold absolute responsibility for maintaining the strict confidentiality of your credential entries, login passwords, and session tokens. You agree to assume full accountability for all task actions and configuration changes originating from your registered profile. Taskey maintains rigid authorization barriers separating standard User permissions and Admin panels.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                3. Acceptable Use & Database Protection
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                You are prohibited from bypassing, disabling, or attempting to breach any built-in system security controls, frontend routing protections, or backend databases. Any unauthorized server queries, API scanning, database injection, or systematic scraping of assets will lead to immediate account suspension and permanent deletion of credentials.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                4. Service Modifications & Server Stability
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Taskey reserves the right to modify site interfaces, adjust layout attributes, scale back standard quotas, or update core databases without prior notice to ensure overall service stability and uptime. Changes are implemented instantly and will be logged transparently within this agreement.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                5. Limitation of Liability
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Taskey is provided on an "as is" and "as available" basis. We hold no liability for minor disruptions, database sync latency, or task history retention failures beyond standard best practices. Your task management choices remain exclusively yours to govern.
              </p>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Terms;
