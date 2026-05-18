import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleHomeClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    setTimeout(async () => {
      await logout();
    }, 100);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4 pointer-events-none select-none">
        <div className="w-full max-w-4xl flex items-center justify-between pointer-events-auto px-6 md:px-8 py-3.5 bg-background/30 backdrop-blur-xl border border-border/20 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-text-primary hover:opacity-75 transition-opacity"
          >
            Taskey
          </Link>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="text-[11px] md:text-xs font-black uppercase tracking-widest text-text-primary hover:opacity-70 transition-opacity px-4 py-2 border border-border/40 rounded-xl"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-[11px] md:text-xs font-black uppercase tracking-widest text-text-primary hover:opacity-70 transition-opacity cursor-pointer px-4 py-2 border border-border/40 rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Custom Premium Logout Reassurance Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300 pointer-events-auto">
          <div className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl flex flex-col gap-6 relative select-none animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary">
                  Log Out?
                </h3>
              </div>
            </div>

            {/* Reassurance Message */}
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed text-center">
              Are you sure you want to end your current session? You will need to sign back in to access your task dashboard.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-foreground text-background font-bold text-xs md:text-sm tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-3 rounded-xl bg-transparent border border-border/60 hover:bg-border/20 text-text-primary font-bold text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;