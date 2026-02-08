import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { auth } from "../Auth/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthModal from "../Auth/AuthModel";
import CartDrawer from "./Cart";

export const Navbar = ({ cartItems = [], onCartOpen, onUpdateQuantity, onRemoveItem }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL,
        });
        console.log("User logged in:", user);
      } else {
        setCurrentUser(null);
        console.log("User logged out");
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserDropdownOpen(false);
      setMenuOpen(false);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = () => {
    setAuthOpen(true);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return currentUser?.email?.[0].toUpperCase() || 'U';
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-[0_0_30px_rgba(9,121,105,0.3)] border-b border-[#097969]/30"
            : "bg-black/80 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 md:py-5">
          {/* MOBILE MENU ICON & LOGO */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-white group-hover:text-[#097969] transition-colors" />
            </button>

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              onClick={() => setMenuOpen(false)}
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#097969] to-[#065951] rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Icon container */}
                <div className="relative h-full w-full bg-gradient-to-br from-[#097969] to-[#065951] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(9,121,105,0.6)] transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-white font-black text-lg sm:text-xl">FG</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                  Fit<span className="text-[#097969]">Gear</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Premium Fitness</span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-5 py-2.5 rounded-xl text-sm lg:text-base font-bold transition-all duration-300 group ${
                    isActive
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#097969] to-[#0a9178] rounded-xl shadow-lg shadow-[#097969]/50"></div>
                    )}
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Text */}
                    <span className="relative z-10">{link.label}</span>
                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full"></div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP: RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3">
            {/* Cart with Badge */}
            <div className="relative">
              <button
                onClick={() => setCartOpen(true)}
                className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#097969]/50 transition-all duration-300"
                aria-label="Open cart"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#097969]/20 to-[#0a9178]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 text-white group-hover:text-[#097969] transition-colors" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#097969] to-[#0a9178] text-[10px] font-black text-white shadow-lg shadow-[#097969]/50 animate-pulse">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline text-sm font-bold text-white relative">
                  Cart
                </span>
              </button>
            </div>

            {/* User/Auth Section */}
            <div className="relative" ref={dropdownRef}>
              {currentUser ? (
                <div className="flex items-center">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#097969]/50 transition-all duration-300"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#097969]/20 to-[#0a9178]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-[#097969] shadow-lg relative"
                      />
                    ) : (
                      <div className="h-9 w-9 bg-gradient-to-br from-[#097969] to-[#065951] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#097969]/30 relative">
                        <span className="text-white font-black text-sm">
                          {getUserInitials()}
                        </span>
                      </div>
                    )}
                    <span className="hidden lg:block text-sm font-bold text-white relative">{currentUser.displayName}</span>
                    <ChevronDown
                      className={`hidden lg:block h-4 w-4 text-gray-400 transition-transform duration-300 relative ${
                        userDropdownOpen ? "rotate-180 text-[#097969]" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-black to-[#0a1a17] rounded-2xl shadow-2xl shadow-[#097969]/20 border border-[#097969]/30 py-2 z-50 backdrop-blur-xl animate-fadeInDown overflow-hidden">
                      {/* Glow effect */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#097969] rounded-full blur-3xl opacity-20"></div>
                      
                      {/* User Info Header */}
                      <div className="relative px-4 py-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          {currentUser.photoURL ? (
                            <img
                              src={currentUser.photoURL}
                              alt={currentUser.displayName}
                              className="h-14 w-14 rounded-full object-cover ring-2 ring-[#097969] shadow-lg"
                            />
                          ) : (
                            <div className="h-14 w-14 bg-gradient-to-br from-[#097969] to-[#065951] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#097969]/50">
                              <span className="text-white font-black text-xl">
                                {getUserInitials()}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                              {currentUser.displayName}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Logout */}
                      <div className="relative p-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/20 text-sm font-bold text-red-400 hover:text-red-300 transition-all duration-300 group"
                        >
                          <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                            <LogOut className="h-4 w-4" />
                          </div>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#097969] to-[#0a9178] text-white hover:shadow-lg hover:shadow-[#097969]/50 transition-all duration-300 font-bold text-sm overflow-hidden transform hover:scale-105"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a9178] to-[#097969] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <User className="h-4 w-4 relative z-10" />
                  <span className="hidden xs:inline relative z-10">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 bg-gradient-to-br from-black via-[#0a1a17] to-black w-[85%] sm:w-[80%] max-w-sm transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-out md:hidden shadow-2xl shadow-[#097969]/30 border-r border-[#097969]/30`}
      >
        {/* Decorative glow effects */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#097969] rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#097969] rounded-full blur-[150px] opacity-20"></div>

        {/* Menu Header */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-[#097969] to-[#065951] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">FG</span>
            </div>
            <span className="text-xl font-black text-white">Menu</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-white group-hover:text-[#097969] transition-colors" />
          </button>
        </div>

        {/* User Info Section (if logged in) */}
        {currentUser && (
          <div className="relative px-6 py-4 bg-white/5 border-b border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#097969] shadow-lg"
                />
              ) : (
                <div className="h-12 w-12 bg-gradient-to-br from-[#097969] to-[#065951] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#097969]/50">
                  <span className="text-white font-black text-lg">
                    {getUserInitials()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {currentUser.displayName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Links */}
        <div className="relative flex flex-col px-4 py-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `relative px-5 py-4 rounded-xl text-base font-bold mb-2 transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`
              }
              style={{
                animation: `slideInLeft 0.4s ease-out ${index * 0.1}s both`
              }}
            >
              {({ isActive }) => (
                <>
                  {/* Active background */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#097969] to-[#0a9178] rounded-xl shadow-lg shadow-[#097969]/30"></div>
                  )}
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Border glow */}
                  <div className={`absolute inset-0 rounded-xl border ${isActive ? 'border-[#097969]/50' : 'border-transparent group-hover:border-[#097969]/30'} transition-all duration-300`}></div>
                  {/* Text */}
                  <span className="relative z-10">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Auth & Cart Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4 bg-black/50 backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 font-bold text-base group"
              >
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setAuthOpen(true);
                }}
                className="relative flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#097969] to-[#0a9178] text-white hover:shadow-lg hover:shadow-[#097969]/50 transition-all duration-300 font-bold text-base overflow-hidden group"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a9178] to-[#097969] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <User className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Login / Signup</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CART DRAWER */}
      <CartDrawer 
        open={cartOpen} 
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />

      {/* AUTH MODAL */}
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLoginSuccess={() => {
            setAuthOpen(false);
          }}
        />
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};