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
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="flex items-center justify-between w-full px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-5">
          {/* MOBILE MENU ICON & LOGO */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="md:hidden p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </button>

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2.5 group"
              onClick={() => setMenuOpen(false)}
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-sm sm:text-lg">FG</span>
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
                Fit<span className="text-emerald-500">Gear</span>
              </span>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white bg-emerald-500 shadow-md"
                      : "text-gray-700 hover:text-emerald-500 hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP: RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {/* Cart with Badge */}
            <div className="relative">
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                aria-label="Open cart"
              >
                <div className="relative">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] sm:text-xs font-bold text-white shadow-md">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline text-xs lg:text-sm font-semibold text-gray-800">
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
                    className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName}
                        className="h-7 w-7 sm:h-9 sm:w-9 rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <div className="h-7 w-7 sm:h-9 sm:w-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-xs sm:text-sm">
                          {getUserInitials()}
                        </span>
                      </div>
                    )}
                   
                    <ChevronDown
                      className={`hidden lg:block h-3 w-3 sm:h-4 sm:w-4 text-gray-500 transition-transform duration-200 ${
                        userDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-20 w-56 sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn">
                      {/* User Info Header */}
                      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {currentUser.photoURL ? (
                            <img
                              src={currentUser.photoURL}
                              alt={currentUser.displayName}
                              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-base sm:text-lg">
                                {getUserInitials()}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                              {currentUser.displayName}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-red-50 text-xs sm:text-sm font-medium text-red-600 transition-colors"
                        >
                          <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg font-semibold text-xs sm:text-sm"
                >
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden animate-fadeIn"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white w-[85%] sm:w-[80%] max-w-sm transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden shadow-2xl`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 bg-gradient-to-r from-emerald-500 to-emerald-600">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-emerald-500 font-bold text-base sm:text-lg">FG</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">Menu</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        {/* User Info Section (if logged in) */}
        {currentUser && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">
                    {getUserInitials()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                  {currentUser.displayName}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Links */}
        <div className="flex flex-col px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold mb-1 transition-all duration-200 ${
                  isActive
                    ? "text-white bg-emerald-500 shadow-md"
                    : "text-gray-700 hover:bg-gray-50 hover:text-emerald-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Auth & Cart Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-3 sm:p-4 bg-white">
          <div className="flex flex-col gap-2 sm:gap-3">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 font-semibold text-sm sm:text-base"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setAuthOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-200 font-semibold shadow-md text-sm sm:text-base"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                Login / Signup
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

      {/* Add some CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
};