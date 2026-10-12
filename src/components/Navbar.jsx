import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useLogin } from "../context/LoginContext";
import { useTheme } from "../context/ThemeContext";
import { FaLandmark, FaUser, FaGlobe, FaChevronDown, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { isLoggedIn, logout } = useLogin();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const langRef = useRef(null);

  // Helper to get stored user info
  const getLocalUser = () => {
    try {
      let name = localStorage.getItem("userName") || localStorage.getItem("name") || null;
      let email = localStorage.getItem("userEmail") || localStorage.getItem("email") || null;
      let phone = localStorage.getItem("userPhone") || localStorage.getItem("phone") || null;

      if (!name) {
        const userJson = localStorage.getItem("user");
        if (userJson) {
          try {
            const parsed = JSON.parse(userJson);
            name = parsed.name || parsed.fullName || parsed.username || name;
            email = parsed.email || email;
            phone = parsed.phone || phone;
          } catch (e) {}
        }
      }

      if (!name && !email) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const base64 = token.split(".")[1];
            const payload = JSON.parse(
              decodeURIComponent(
                atob(base64.replace(/-/g, "+").replace(/_/g, "/"))
                  .split("")
                  .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                  .join("")
              )
            );
            name = name || payload.name || payload.fullName || null;
            email = email || payload.email || payload.emailAddress || null;
          } catch (e) {}
        }
      }

      if (!name && email) {
        const uname = email.split("@")[0];
        name = uname.replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      }

      return { name, email, phone };
    } catch {
      return { name: null, email: null, phone: null };
    }
  };

  const localUser = getLocalUser();
  const userName = localUser?.name || null;
  const userEmail = localUser?.email || localUser?.phone || null;

  const scrollToAbout = () => {
    if (location.pathname === "/") {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const aboutSection = document.getElementById("about-section");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHindi = lang === "hi";

  const desktopMenuItems = [
    { name: isHindi ? "मुख्य पृष्ठ" : "Home", path: "/" },
    { name: isHindi ? "हमारे बारे में" : "About", action: scrollToAbout },
    {
      name: isHindi ? "समस्या दर्ज करें" : "Report an Issue",
      action: () => {
        if (isLoggedIn) navigate("/report");
        else onLoginClick();
      },
    },
    {
      name: isHindi ? "स्थिति ट्रैक करें" : "Track Status",
      action: () => {
        if (isLoggedIn) navigate("/dashboard");
        else onLoginClick();
      },
    },
    {
      name: isHindi ? "प्रोफ़ाइल" : "Profile",
      path: "/profile",
      action: () => {
        if (isLoggedIn) navigate("/profile");
        else onLoginClick();
      },
    },
  ];

  return (
    <nav className="bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-lg bg-[#1b5e20] text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              <FaLandmark />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight transition-colors">
                Civic Report
              </span>
              <span className="text-[11px] font-semibold text-gray-500 dark:text-slate-400 tracking-wider transition-colors">
                Report Today • Better Tomorrow
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 font-medium">
            {desktopMenuItems.map((item, idx) => {
              const isActive = item.path ? location.pathname === item.path : false;
              return item.path ? (
                <Link
                  key={idx}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                    isActive
                      ? "text-[#1b5e20] dark:text-[#4ade80]"
                      : "text-gray-700 dark:text-slate-300 hover:text-[#1b5e20] dark:hover:text-[#4ade80] hover:bg-gray-50 dark:hover:bg-slate-800/70"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#1b5e20] dark:bg-[#4ade80] rounded-full"></span>
                  )}
                </Link>
              ) : (
                <button
                  key={idx}
                  onClick={item.action}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-[#1b5e20] dark:hover:text-[#4ade80] hover:bg-gray-50 dark:hover:bg-slate-800/70 transition-all duration-200"
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Action Section */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? (isHindi ? "लाइट मोड सक्रिय करें" : "Switch to Light Mode") : (isHindi ? "डार्क मोड सक्रिय करें" : "Switch to Dark Mode")}
              className="p-2.5 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm flex items-center justify-center hover:scale-105 active:scale-95"
            >
              {isDark ? (
                <FaSun className="text-base text-amber-400 animate-spin-slow" />
              ) : (
                <FaMoon className="text-base text-slate-700 hover:text-indigo-600" />
              )}
            </button>

            {/* Language Dropdown Selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:bg-slate-800/50 rounded-full text-sm font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <FaGlobe className="text-gray-500 dark:text-slate-400 text-base" />
                <span>{isHindi ? "हिंदी" : "English"}</span>
                <FaChevronDown className="text-xs text-gray-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50 animate-fadeIn">
                  <button
                    onClick={() => {
                      if (setLang) setLang("en");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700/60 flex items-center justify-between ${
                      !isHindi ? "text-[#1b5e20] dark:text-[#4ade80] font-bold bg-green-50/50 dark:bg-green-900/20" : "text-gray-700 dark:text-slate-300"
                    }`}
                  >
                    English
                    {!isHindi && <span className="w-1.5 h-1.5 rounded-full bg-[#1b5e20] dark:bg-[#4ade80]"></span>}
                  </button>
                  <button
                    onClick={() => {
                      if (setLang) setLang("hi");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700/60 flex items-center justify-between ${
                      isHindi ? "text-[#1b5e20] dark:text-[#4ade80] font-bold bg-green-50/50 dark:bg-green-900/20" : "text-gray-700 dark:text-slate-300"
                    }`}
                  >
                    हिंदी (Hindi)
                    {isHindi && <span className="w-1.5 h-1.5 rounded-full bg-[#1b5e20] dark:bg-[#4ade80]"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Auth / Profile Section */}
            {isLoggedIn ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-[#1b5e20] hover:bg-[#144718] text-white px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-sm"
                >
                  <FaUserCircle className="text-lg" />
                  <span className="max-w-[100px] truncate">{userName || "Profile"}</span>
                  <FaChevronDown className="text-xs text-white/80" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 py-3 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-gray-900 dark:text-white font-bold truncate">{userName || "User"}</p>
                      <p className="text-gray-500 dark:text-slate-400 text-xs truncate">{userEmail || ""}</p>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-200 transition"
                    >
                      {isHindi ? "मेरी प्रोफ़ाइल" : "My Profile"}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-200 transition"
                    >
                      {isHindi ? "डैशबोर्ड" : "Dashboard"}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/report");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium text-gray-700 dark:text-slate-200 transition"
                    >
                      {isHindi ? "समस्या दर्ज करें" : "Report an Issue"}
                    </button>
                    <div className="border-t border-gray-100 dark:border-slate-700 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/40 text-sm font-semibold text-red-600 dark:text-red-400 transition"
                    >
                      {isHindi ? "लॉगआउट" : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-[#1b5e20] hover:bg-[#144718] text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <FaUser className="text-xs" />
                <span>{isHindi ? "साइन इन" : "Sign In"}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden p-2 text-2xl text-gray-700 dark:text-slate-200 hover:text-[#1b5e20] dark:hover:text-[#4ade80] transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {desktopMenuItems.map((item, idx) =>
            item.path ? (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 dark:text-slate-200 hover:text-[#1b5e20] dark:hover:text-[#4ade80] hover:bg-green-50 dark:hover:bg-slate-800"
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 dark:text-slate-200 hover:text-[#1b5e20] dark:hover:text-[#4ade80] hover:bg-green-50 dark:hover:bg-slate-800"
              >
                {item.name}
              </button>
            )
          )}
          {!isLoggedIn && (
            <button
              onClick={() => {
                setMenuOpen(false);
                onLoginClick();
              }}
              className="w-full mt-3 bg-[#1b5e20] text-white py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
            >
              <FaUser />
              <span>{isHindi ? "साइन इन" : "Sign In"}</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
