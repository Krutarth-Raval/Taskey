import { Link } from "react-router-dom";

function Footer() {
  const handleHomeClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="  border-t-2 border-border/40 bg-background py-16 md:py-24 select-none">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-12 md:gap-16">

        {/* Top Section: Branding + Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6">

          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-text-primary hover:opacity-75 transition-opacity w-fit"
            >
              Taskey
            </Link>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-xs">
              A premium, minimalist task manager designed to help you organize work, track progress, and elevate daily focus.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://github.com/Krutarth-Raval"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border/40 rounded-lg text-text-secondary hover:text-foreground hover:bg-border/30 transition-all duration-300 flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.22.694.825.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com/_KrutarthRaval_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border/40 rounded-lg text-text-secondary hover:text-foreground hover:bg-border/30 transition-all duration-300 flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/raval-krutarth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border/40 rounded-lg text-text-secondary hover:text-foreground hover:bg-border/30 transition-all duration-300 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start gap-20">
            <div className="flex flex-col gap-4 md:pl-10">
              <h4 className="text-[14px] md:text-lg font-black tracking-widest uppercase text-text-secondary">
                Product
              </h4>
              <div className="flex flex-col gap-2.5">
                <Link
                  to="/"
                  onClick={handleHomeClick}
                  className="text-sm md:text-base text-text-secondary hover:text-foreground transition-colors w-fit font-semibold whitespace-nowrap"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="text-sm md:text-base text-text-secondary hover:text-foreground transition-colors w-fit font-semibold whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm md:text-base text-text-secondary hover:text-foreground transition-colors w-fit font-semibold whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Column 3: Legal & About */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] md:text-lg font-black tracking-widest uppercase text-text-secondary">
                Company
              </h4>
              <div className="flex flex-col gap-2.5 w-full">
                <Link
                  to="/about"
                  className="text-sm md:text-base text-text-secondary hover:text-foreground transition-colors w-fit font-semibold whitespace-nowrap"
                >
                  About Us
                </Link>
                <Link
                  to="/terms"
                  className="text-sm md:text-base text-text-secondary hover:text-foreground transition-colors w-fit font-semibold whitespace-nowrap"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/privacy"
                  className="text-sm md:text-base text-text-secondary hover:text-foreground transition-colors w-fit font-semibold whitespace-nowrap"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
          {/* Column 2: Quick Navigation */}


        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mx-auto sm:mx-0">
            &copy; 2026 TASKEY. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;