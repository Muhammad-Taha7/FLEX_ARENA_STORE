import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Dumbbell
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-slate-900 to-black text-gray-300">
      {/* Main Footer */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="h-10 w-10 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Fit<span className="text-emerald-500">Gear</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 mb-4">
              Premium gym equipment for your fitness journey.
            </p>

            <div className="space-y-2">
              <a href="mailto:info@fitgear.com" className="flex items-center gap-2 text-sm hover:text-emerald-500">
                <Mail className="h-4 w-4" /> info@fitgear.com
              </a>
              <a href="tel:+923001234567" className="flex items-center gap-2 text-sm hover:text-emerald-500">
                <Phone className="h-4 w-4" /> +92 300 1234567
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" /> Faisalabad, Punjab
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-sm hover:text-emerald-500">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>

            <div className="flex gap-3 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social">
                <FaLinkedinIn />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social">
                <FaYoutube />
              </a>
            </div>

            <h4 className="text-sm font-semibold text-white mb-2">Newsletter</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm"
              />
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 py-4 text-center md:flex md:justify-between px-6 max-w-7xl mx-auto">
        <p className="text-sm">© {currentYear} FitGear. All rights reserved.</p>
        
      </div>

      {/* Tailwind shortcut */}
      <style>
        {`
          .social {
            padding: 10px;
            background: #1e293b;
            border-radius: 10px;
            color: #9ca3af;
            transition: 0.3s;
          }
          .social:hover {
            background: #10b981;
            color: white;
          }
        `}
      </style>
    </footer>
  );
};
