import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Privacy() {
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
              Data Security
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tight text-text-primary">
              Privacy Policy
            </h1>
            <span className="text-[11px] font-bold tracking-widest uppercase text-text-secondary/60">
              Last Updated: May 17, 2026
            </span>
          </div>

          {/* Privacy Clauses */}
          <div className="flex flex-col gap-8">

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                1. Information We Collect
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Taskey follows absolute data minimization. We only collect the minimal profile details necessary to operate your task dashboard safely: your registered username, a cryptographically secure hashed password, your operational access role (User or Admin), and the direct task items you establish in the system.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                2. Data Allocation & Usage
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Your credentials and profile variables are utilized strictly to validate session logins, preserve admin/user route boundaries, and correctly map task records to your account. We maintain a zero-tracking policy: we do not sell, rent, or lease your profile variables to third-party ad brokers or external marketing networks.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                3. Encryption & Storage Protocols
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Security is built into our core framework. Passwords are immediately salted and hashed in our backend before database insertion. We use standard secure transport protocols to guard communication channels, and manage reactive user-session tokens to protect your dashboard from session hijacking.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                4. Data Ownership & Deletion Rights
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                You retain absolute ownership and control over your profile variables. You can erase all databases and records mapped to your account at any time by navigating to your settings and clicking "Delete Account". This triggers a permanent, irreversible purge of your credentials and tasks from our server systems.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">
                5. Policy Revisions
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                This document is subject to minor adjustments as security frameworks progress. Revisions will be logged instantly on this page. We encourage standard checks to remain updated on how we fully preserve your database protection.
              </p>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Privacy;
