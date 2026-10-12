import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import {
  FaUser,
  FaFileAlt,
  FaBell,
  FaShieldAlt,
  FaSlidersH,
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaCamera,
  FaTrashAlt,
  FaBolt,
  FaGlobe,
  FaSun,
  FaMoon,
  FaDesktop,
  FaArrowRight,
  FaChevronRight,
  FaCheck,
  FaAt,
  FaLock,
  FaSave,
} from "react-icons/fa";

function Profile() {
  const { lang, setLang } = useLanguage();
  const isHindi = lang === "hi";
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Active navigation states
  const [activeNav, setActiveNav] = useState("profile");
  const [activeTab, setActiveTab] = useState("profile");

  // Profile data state
  const [fullName, setFullName] = useState(() => {
    return localStorage.getItem("userName") || "Nishant Kumar";
  });
  const [username, setUsername] = useState("@nishant_kumar");
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "nishant@example.com";
  });
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Dehradun, Uttarakhand");
  const [bio, setBio] = useState(
    "Building cleaner and better communities through technology. Reporting issues for a smarter and safer city."
  );
  const [avatar, setAvatar] = useState("/images/profile_avatar.jpg");
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Security password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordToast, setPasswordToast] = useState(false);

  // Notifications state
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState(true);

  // Recent reports data matching reference image
  const recentReports = [
    {
      id: 1,
      title: isHindi ? "एमजी रोड पर बड़ा गड्ढा" : "Large pothole on MG Road",
      location: "MG Road, Dehradun",
      status: isHindi ? "खुला है" : "Open",
      statusType: "open",
      date: "12 Sep 2024",
      image: "/images/pothole.jpg",
    },
    {
      id: 2,
      title: isHindi ? "स्ट्रीट लाइट काम नहीं कर रही" : "Street light not working",
      location: "Rajpur Road, Dehradun",
      status: isHindi ? "हल किया गया" : "Resolved",
      statusType: "resolved",
      date: "8 Sep 2024",
      image: "/images/street light.jpeg",
    },
    {
      id: 3,
      title: isHindi ? "कचरा एकत्र नहीं किया गया" : "Garbage not collected",
      location: "Indira Nagar, Dehradun",
      status: isHindi ? "प्रगति में" : "In Progress",
      statusType: "in-progress",
      date: "5 Sep 2024",
      image: "/images/garbage.jpeg",
    },
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar("/images/profile_avatar.jpg");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", fullName);
    localStorage.setItem("userEmail", email);
    setIsEditing(false);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert(isHindi ? "पासवर्ड मेल नहीं खाते!" : "Passwords do not match!");
      return;
    }
    setPasswordToast(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090e1a] text-gray-900 dark:text-slate-100 transition-colors duration-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast notifications */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 bg-[#1b5e20] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <FaCheckCircle className="text-xl text-green-300" />
          <span className="font-semibold text-sm">
            {isHindi ? "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!" : "Profile updated successfully!"}
          </span>
        </div>
      )}

      {passwordToast && (
        <div className="fixed bottom-6 right-6 bg-[#1b5e20] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <FaCheckCircle className="text-xl text-green-300" />
          <span className="font-semibold text-sm">
            {isHindi ? "पासवर्ड सफलतापूर्वक बदला गया!" : "Password updated successfully!"}
          </span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ──────────────────────────────────────────────────────────
              LEFT SIDEBAR (Col 1 to 3)
          ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Navigation Menu Card */}
            <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="space-y-1">
                {[
                  {
                    id: "profile",
                    label: isHindi ? "मेरी प्रोफ़ाइल" : "My Profile",
                    icon: <FaUser className="text-base" />,
                  },
                  {
                    id: "reports",
                    label: isHindi ? "मेरी रिपोर्ट" : "My Reports",
                    icon: <FaFileAlt className="text-base" />,
                  },
                  {
                    id: "notifications",
                    label: isHindi ? "सूचनाएं" : "Notifications",
                    icon: <FaBell className="text-base" />,
                  },
                  {
                    id: "security",
                    label: isHindi ? "सुरक्षा" : "Security",
                    icon: <FaShieldAlt className="text-base" />,
                  },
                  {
                    id: "preferences",
                    label: isHindi ? "प्राथमिकताएं" : "Preferences",
                    icon: <FaSlidersH className="text-base" />,
                  },
                  {
                    id: "help",
                    label: isHindi ? "सहायता एवं समर्थन" : "Help & Support",
                    icon: <FaQuestionCircle className="text-base" />,
                  },
                ].map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveNav(item.id);
                        if (item.id !== "help") setActiveTab(item.id);
                      }}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#e8f5e9] dark:bg-[#1b3826] text-[#1b5e20] dark:text-[#4ade80] shadow-sm font-bold"
                          : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <span className={`${isActive ? "text-[#1b5e20] dark:text-[#4ade80]" : "text-gray-400 dark:text-slate-400"}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Promo Card with City Graphic */}
            <div className="bg-gradient-to-br from-[#eaf6eb] to-[#d6edd8] dark:from-[#122b1f] dark:to-[#0c1f16] rounded-3xl p-6 border border-[#c8e6c9]/60 dark:border-green-900/40 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[260px]">
              {/* Background illustration */}
              <div className="absolute right-0 bottom-0 w-36 h-36 opacity-30 pointer-events-none">
                <img
                  src="/images/community_illustration.jpg"
                  alt="City Graphic"
                  className="w-full h-full object-contain rounded-br-3xl mix-blend-multiply dark:mix-blend-screen"
                />
              </div>

              <div className="relative z-10">
                <h4 className="font-extrabold text-gray-900 dark:text-white text-base leading-snug mb-1.5">
                  {isHindi
                    ? "स्वच्छ, सुरक्षित और सशक्त समुदाय के लिए"
                    : "Together for Cleaner, Safer Stronger Communities"}
                </h4>
                <p className="text-xs text-gray-600 dark:text-slate-300 font-medium">
                  {isHindi
                    ? "समस्या दर्ज करें और तुरंत समाधान पाएं।"
                    : "Report issues and get them resolved swiftly."}
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  onClick={() => navigate("/report")}
                  className="bg-[#1b5e20] hover:bg-[#144718] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <span>{isHindi ? "समस्या दर्ज करें" : "Report an Issue"}</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────
              CENTER COLUMN (Col 4 to 9 / Main Content)
          ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* HERO PROFILE & STATS CARD */}
            <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Left: Avatar + Details */}
                <div className="flex items-start sm:items-center gap-5">
                  {/* Avatar with camera badge */}
                  <div className="relative shrink-0">
                    <img
                      src={avatar}
                      alt={fullName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs shadow-md hover:bg-[#1b5e20] transition-colors"
                      title="Change Photo"
                    >
                      <FaCamera />
                    </button>
                  </div>

                  {/* Name + Username + Bio + Meta */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {fullName}
                      </h2>
                      <span className="w-5 h-5 rounded-full bg-[#1b5e20] text-white flex items-center justify-center text-[10px] shadow-sm">
                        <FaCheck />
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-slate-400 font-semibold mb-2">
                      {username}
                    </span>
                    <p className="text-xs text-gray-600 dark:text-slate-300 max-w-md leading-relaxed mb-3">
                      {bio}
                    </p>

                    {/* Metadata pills */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] text-gray-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-gray-400 dark:text-slate-500" />
                        <span>{location}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaEnvelope className="text-gray-400 dark:text-slate-500" />
                        <span>{email}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaPhoneAlt className="text-gray-400 dark:text-slate-500" />
                        <span>{phone}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-[#e8f5e9] dark:bg-[#1b3826] text-[#1b5e20] dark:text-[#4ade80] hover:bg-[#c8e6c9] dark:hover:bg-[#254f35] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#c8e6c9]/70 dark:border-green-800 transition-all shadow-sm self-start md:self-auto"
                >
                  <FaEdit />
                  <span>{isEditing ? (isHindi ? "संपादन बंद करें" : "Done Editing") : (isHindi ? "प्रोफ़ाइल संपादित करें" : "Edit Profile")}</span>
                </button>
              </div>

              {/* 2x2 Stats Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                {/* Total Reports */}
                <div className="bg-[#f0faf0] dark:bg-[#12281c] p-3.5 rounded-2xl flex items-center gap-3 border border-[#c8e6c9]/40 dark:border-green-900/30">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] dark:bg-[#1b3826] text-[#1b5e20] dark:text-[#4ade80] flex items-center justify-center text-base shrink-0 font-bold shadow-sm">
                    <FaFileAlt />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white block leading-tight">
                      12
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 font-semibold">
                      {isHindi ? "कुल रिपोर्ट" : "Total Reports"}
                    </span>
                  </div>
                </div>

                {/* Open Reports */}
                <div className="bg-[#f0f9ff] dark:bg-[#112438] p-3.5 rounded-2xl flex items-center gap-3 border border-[#bae6fd]/40 dark:border-blue-900/30">
                  <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] dark:bg-[#183652] text-[#0284c7] dark:text-[#38bdf8] flex items-center justify-center text-base shrink-0 font-bold shadow-sm">
                    <FaClock />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white block leading-tight">
                      5
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 font-semibold">
                      {isHindi ? "खुली रिपोर्ट" : "Open Reports"}
                    </span>
                  </div>
                </div>

                {/* Resolved Reports */}
                <div className="bg-[#fff7ed] dark:bg-[#2b1e15] p-3.5 rounded-2xl flex items-center gap-3 border border-[#fed7aa]/40 dark:border-orange-900/30">
                  <div className="w-10 h-10 rounded-xl bg-[#ffedd5] dark:bg-[#3d2719] text-[#ea580c] dark:text-[#fb923c] flex items-center justify-center text-base shrink-0 font-bold shadow-sm">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white block leading-tight">
                      6
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 font-semibold">
                      {isHindi ? "हल की गई" : "Resolved"}
                    </span>
                  </div>
                </div>

                {/* Pending */}
                <div className="bg-[#fff1f2] dark:bg-[#2b171c] p-3.5 rounded-2xl flex items-center gap-3 border border-[#fecdd3]/40 dark:border-red-900/30">
                  <div className="w-10 h-10 rounded-xl bg-[#ffe4e6] dark:bg-[#3d1a22] text-[#e11d48] dark:text-[#f43f5e] flex items-center justify-center text-base shrink-0 font-bold shadow-sm">
                    <FaExclamationCircle />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white block leading-tight">
                      1
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400 font-semibold">
                      {isHindi ? "लंबित" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* INNER NAVIGATION TABS */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto border-b border-gray-200 dark:border-slate-800 pb-1">
              {[
                { id: "profile", label: isHindi ? "प्रोफ़ाइल" : "Profile", icon: <FaUser /> },
                { id: "reports", label: isHindi ? "मेरी रिपोर्ट" : "My Reports", icon: <FaFileAlt /> },
                { id: "notifications", label: isHindi ? "सूचनाएं" : "Notifications", icon: <FaBell /> },
                { id: "security", label: isHindi ? "सुरक्षा" : "Security", icon: <FaShieldAlt /> },
                { id: "preferences", label: isHindi ? "प्राथमिकताएं" : "Preferences", icon: <FaSlidersH /> },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setActiveNav(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap relative ${
                      isActive
                        ? "text-[#1b5e20] dark:text-[#4ade80] font-bold"
                        : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1b5e20] dark:bg-[#4ade80] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: PROFILE (PERSONAL INFORMATION) */}
            {activeTab === "profile" && (
              <>
                {/* Personal Information Form Card */}
                <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 text-[#1b5e20] dark:text-[#4ade80]">
                      <FaUser className="text-base" />
                      <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg">
                        {isHindi ? "व्यक्तिगत जानकारी" : "Personal Information"}
                      </h3>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                          {isHindi ? "पूरा नाम" : "Full Name"}
                        </label>
                        <div className="relative flex items-center">
                          <FaUser className="absolute left-4 text-gray-400 text-xs" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-[#1b5e20] dark:focus:border-green-500 disabled:opacity-80 transition"
                            required
                          />
                        </div>
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                          {isHindi ? "उपयोगकर्ता नाम" : "Username"}
                        </label>
                        <div className="relative flex items-center">
                          <FaAt className="absolute left-4 text-gray-400 text-xs" />
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-[#1b5e20] dark:focus:border-green-500 disabled:opacity-80 transition"
                            required
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                          {isHindi ? "ईमेल पता" : "Email Address"}
                        </label>
                        <div className="relative flex items-center">
                          <FaEnvelope className="absolute left-4 text-gray-400 text-xs" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-[#1b5e20] dark:focus:border-green-500 disabled:opacity-80 transition"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                          {isHindi ? "फ़ोन नंबर" : "Phone Number"}
                        </label>
                        <div className="relative flex items-center">
                          <FaPhoneAlt className="absolute left-4 text-gray-400 text-xs" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-[#1b5e20] dark:focus:border-green-500 disabled:opacity-80 transition"
                          />
                        </div>
                      </div>

                      {/* Location / City */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                          {isHindi ? "स्थान / शहर" : "Location / City"}
                        </label>
                        <div className="relative flex items-center">
                          <FaMapMarkerAlt className="absolute left-4 text-gray-400 text-xs" />
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-[#1b5e20] dark:focus:border-green-500 disabled:opacity-80 transition"
                          />
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                          {isHindi ? "बायो / परिचय" : "Bio"}
                        </label>
                        <div className="relative flex items-center">
                          <FaFileAlt className="absolute left-4 text-gray-400 text-xs" />
                          <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-[#1b5e20] dark:focus:border-green-500 disabled:opacity-80 transition"
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-5 py-2.5 rounded-2xl border border-gray-200 dark:border-slate-700 text-xs font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                        >
                          {isHindi ? "रद्द करें" : "Cancel"}
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-2xl bg-[#1b5e20] hover:bg-[#144718] text-white text-xs font-bold flex items-center gap-2 shadow-md transition"
                        >
                          <FaSave />
                          <span>{isHindi ? "परिवर्तन सहेजें" : "Save Changes"}</span>
                        </button>
                      </div>
                    )}
                  </form>
                </div>

                {/* My Recent Reports Section */}
                <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 text-[#1b5e20] dark:text-[#4ade80]">
                      <FaFileAlt className="text-base" />
                      <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg">
                        {isHindi ? "मेरी हालिया रिपोर्ट" : "My Recent Reports"}
                      </h3>
                    </div>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="text-xs font-bold text-[#1b5e20] dark:text-[#4ade80] hover:underline flex items-center gap-1.5"
                    >
                      <span>{isHindi ? "सभी देखें" : "View All"}</span>
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>

                  {/* Reports List */}
                  <div className="space-y-3.5">
                    {recentReports.map((report) => (
                      <div
                        key={report.id}
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center justify-between p-3.5 bg-[#f8fafc] dark:bg-[#0c1424] hover:bg-gray-100 dark:hover:bg-slate-800/70 border border-gray-200/70 dark:border-slate-800 rounded-2xl cursor-pointer transition-all duration-200 group"
                      >
                        {/* Left: Thumbnail + Title + Location */}
                        <div className="flex items-center gap-3.5">
                          <img
                            src={report.image}
                            alt={report.title}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm border border-gray-200 dark:border-slate-700"
                          />
                          <div>
                            <h4 className="font-extrabold text-gray-900 dark:text-white text-sm group-hover:text-[#1b5e20] dark:group-hover:text-[#4ade80] transition-colors leading-snug">
                              {report.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-slate-400 mt-1">
                              <FaMapMarkerAlt className="text-[10px] text-gray-400" />
                              <span>{report.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Status Pill + Date + Chevron */}
                        <div className="flex items-center gap-3">
                          {report.statusType === "open" && (
                            <span className="bg-[#fee2e2] text-[#dc2626] dark:bg-red-950/60 dark:text-red-400 text-[11px] font-bold px-3 py-1 rounded-full border border-red-200 dark:border-red-800/40">
                              {report.status}
                            </span>
                          )}
                          {report.statusType === "resolved" && (
                            <span className="bg-[#dcfce7] text-[#15803d] dark:bg-green-950/60 dark:text-green-400 text-[11px] font-bold px-3 py-1 rounded-full border border-green-200 dark:border-green-800/40">
                              {report.status}
                            </span>
                          )}
                          {report.statusType === "in-progress" && (
                            <span className="bg-[#e0f2fe] text-[#0369a1] dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/40">
                              {report.status}
                            </span>
                          )}

                          <span className="hidden sm:inline text-xs text-gray-400 dark:text-slate-400 font-medium">
                            {report.date}
                          </span>

                          <FaChevronRight className="text-gray-300 dark:text-slate-600 text-xs group-hover:text-gray-600 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TAB CONTENT: MY REPORTS */}
            {activeTab === "reports" && (
              <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                    {isHindi ? "मेरी सभी रिपोर्ट" : "All My Reported Issues"}
                  </h3>
                  <button
                    onClick={() => navigate("/report")}
                    className="bg-[#1b5e20] text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm"
                  >
                    <span>+</span>
                    <span>{isHindi ? "नई रिपोर्ट दर्ज करें" : "New Report"}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200/70 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={report.image}
                          alt={report.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-200 dark:border-slate-700"
                        />
                        <div>
                          <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">
                            {report.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                            {report.location} • {report.date}
                          </p>
                        </div>
                      </div>
                      <span className="bg-[#e8f5e9] text-[#1b5e20] dark:bg-[#1b3826] dark:text-[#4ade80] text-xs font-bold px-3 py-1 rounded-full">
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm space-y-5">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg mb-2">
                  {isHindi ? "अधिसूचना प्राथमिकताएं" : "Notification Preferences"}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#f8fafc] dark:bg-[#0c1424] rounded-2xl border border-gray-200/70 dark:border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                        {isHindi ? "ईमेल सूचनाएं" : "Email Notifications"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                        {isHindi ? "रिपोर्ट की स्थिति के बारे में ईमेल प्राप्त करें" : "Receive email updates regarding your reported issues"}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotifs}
                      onChange={(e) => setEmailNotifs(e.target.checked)}
                      className="w-5 h-5 accent-[#1b5e20] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#f8fafc] dark:bg-[#0c1424] rounded-2xl border border-gray-200/70 dark:border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                        {isHindi ? "एसएमएस अपडेट" : "SMS Alerts"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                        {isHindi ? "तत्काल मोबाइल एसएमएस सूचनाएं" : "Instant mobile alerts on critical issue progress"}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsNotifs}
                      onChange={(e) => setSmsNotifs(e.target.checked)}
                      className="w-5 h-5 accent-[#1b5e20] rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#f8fafc] dark:bg-[#0c1424] rounded-2xl border border-gray-200/70 dark:border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                        {isHindi ? "रियल-टाइम स्थिति अपडेट" : "Real-Time Tracking Notifications"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                        {isHindi ? "जब अधिकारी कार्रवाई शुरू करें" : "When authorities inspect or start working on your report"}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={statusUpdates}
                      onChange={(e) => setStatusUpdates(e.target.checked)}
                      className="w-5 h-5 accent-[#1b5e20] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SECURITY */}
            {activeTab === "security" && (
              <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm space-y-5">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                  {isHindi ? "सुरक्षा एवं पासवर्ड" : "Security & Password"}
                </h3>

                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                      {isHindi ? "वर्तमान पासवर्ड" : "Current Password"}
                    </label>
                    <div className="relative flex items-center">
                      <FaLock className="absolute left-4 text-gray-400 text-xs" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold outline-none focus:border-[#1b5e20]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                      {isHindi ? "नया पासवर्ड" : "New Password"}
                    </label>
                    <div className="relative flex items-center">
                      <FaLock className="absolute left-4 text-gray-400 text-xs" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold outline-none focus:border-[#1b5e20]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                      {isHindi ? "नया पासवर्ड पुष्टि करें" : "Confirm New Password"}
                    </label>
                    <div className="relative flex items-center">
                      <FaLock className="absolute left-4 text-gray-400 text-xs" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold outline-none focus:border-[#1b5e20]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1b5e20] hover:bg-[#144718] text-white text-xs font-bold rounded-2xl shadow-md transition"
                  >
                    {isHindi ? "पासवर्ड अपडेट करें" : "Update Password"}
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT: PREFERENCES */}
            {activeTab === "preferences" && (
              <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                  {isHindi ? "खाता प्राथमिकताएं" : "Account Preferences"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {isHindi
                    ? "भाषा और थीम सेटिंग्स को दाएं पैनल से कस्टमाइज़ करें।"
                    : "Customize your language, display mode and portal behavior from the settings panel."}
                </p>
              </div>
            )}

          </div>

          {/* ──────────────────────────────────────────────────────────
              RIGHT SIDEBAR (Col 10 to 12)
          ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* 1. Profile Photo Card */}
            <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
              <div className="flex items-center gap-2 self-start text-[#1b5e20] dark:text-[#4ade80] mb-4">
                <FaCamera className="text-base" />
                <h3 className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base">
                  {isHindi ? "प्रोफ़ाइल फ़ोटो" : "Profile Photo"}
                </h3>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Avatar in circle */}
              <div className="relative my-2">
                <img
                  src={avatar}
                  alt={fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#e8f5e9] dark:border-green-950 shadow-md"
                />
              </div>

              {/* Photo Actions */}
              <div className="w-full space-y-2 mt-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-2xl border border-[#1b5e20]/40 dark:border-green-500/40 bg-[#f0faf0] dark:bg-[#1b3826] text-[#1b5e20] dark:text-[#4ade80] hover:bg-[#e8f5e9] text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <FaCamera />
                  <span>{isHindi ? "फ़ोटो बदलें" : "Change Photo"}</span>
                </button>

                <button
                  onClick={handleRemovePhoto}
                  className="w-full py-2.5 px-4 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <FaTrashAlt />
                  <span>{isHindi ? "फ़ोटो हटाएं" : "Remove Photo"}</span>
                </button>
              </div>

              <span className="text-[10px] text-gray-400 dark:text-slate-500 font-semibold mt-3">
                JPG, PNG (Max 5MB)
              </span>
            </div>

            {/* 2. Quick Actions Card */}
            <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-[#1b5e20] dark:text-[#4ade80] mb-4">
                <FaBolt className="text-base text-amber-500" />
                <h3 className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base">
                  {isHindi ? "त्वरित कार्रवाइयां" : "Quick Actions"}
                </h3>
              </div>

              <div className="space-y-3">
                {/* View My Reports */}
                <button
                  onClick={() => {
                    setActiveTab("reports");
                    setActiveNav("reports");
                  }}
                  className="w-full p-3 bg-[#f8fafc] dark:bg-[#0c1424] hover:bg-[#f0faf0] dark:hover:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center justify-between text-left transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs shrink-0">
                      <FaFileAlt />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-[#1b5e20] dark:group-hover:text-[#4ade80] transition-colors">
                        {isHindi ? "मेरी रिपोर्ट देखें" : "View My Reports"}
                      </h4>
                      <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-0.5">
                        {isHindi ? "दर्ज की गई समस्याओं की स्थिति" : "Check the status of your reported issues"}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-300 dark:text-slate-600 text-xs group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Notification Settings */}
                <button
                  onClick={() => {
                    setActiveTab("notifications");
                    setActiveNav("notifications");
                  }}
                  className="w-full p-3 bg-[#f8fafc] dark:bg-[#0c1424] hover:bg-[#f0faf0] dark:hover:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center justify-between text-left transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center text-xs shrink-0">
                      <FaBell />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-[#1b5e20] dark:group-hover:text-[#4ade80] transition-colors">
                        {isHindi ? "अधिसूचना सेटिंग्स" : "Notification Settings"}
                      </h4>
                      <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-0.5">
                        {isHindi ? "अपनी अलर्ट प्राथमिकताएं प्रबंधित करें" : "Manage your notification preferences"}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-300 dark:text-slate-600 text-xs group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Change Password */}
                <button
                  onClick={() => {
                    setActiveTab("security");
                    setActiveNav("security");
                  }}
                  className="w-full p-3 bg-[#f8fafc] dark:bg-[#0c1424] hover:bg-[#f0faf0] dark:hover:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center justify-between text-left transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs shrink-0">
                      <FaLock />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-[#1b5e20] dark:group-hover:text-[#4ade80] transition-colors">
                        {isHindi ? "पासवर्ड बदलें" : "Change Password"}
                      </h4>
                      <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-0.5">
                        {isHindi ? "अपने खाते को सुरक्षित रखें" : "Keep your account secure"}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-gray-300 dark:text-slate-600 text-xs group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* 3. Theme & Language Card */}
            <div className="bg-white dark:bg-[#131d2e] rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-[#1b5e20] dark:text-[#4ade80] mb-4">
                <FaSun className="text-base text-amber-500" />
                <h3 className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base">
                  {isHindi ? "थीम एवं भाषा" : "Theme & Language"}
                </h3>
              </div>

              {/* Theme Segmented Switcher */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-2">
                  {isHindi ? "थीम" : "Theme"}
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f1f5f9] dark:bg-[#0c1424] rounded-2xl border border-gray-200/60 dark:border-slate-800">
                  <button
                    onClick={() => {
                      if (isDark) toggleTheme();
                    }}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      !isDark
                        ? "bg-white text-[#1b5e20] shadow-sm border border-gray-200/80"
                        : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    <FaSun className="text-xs text-amber-500" />
                    <span>Light</span>
                  </button>

                  <button
                    onClick={() => {
                      if (!isDark) toggleTheme();
                    }}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isDark
                        ? "bg-[#1b3826] text-[#4ade80] shadow-sm border border-green-800/60"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    <FaMoon className="text-xs text-indigo-400" />
                    <span>Dark</span>
                  </button>

                  <button
                    onClick={() => {
                      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                      if (prefersDark !== isDark) toggleTheme();
                    }}
                    className="py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white transition-all"
                  >
                    <FaDesktop className="text-xs" />
                    <span>System</span>
                  </button>
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-2">
                  {isHindi ? "भाषा" : "Language"}
                </label>
                <div className="relative">
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full appearance-none pl-10 pr-10 py-2.5 bg-[#f8fafc] dark:bg-[#0c1424] border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-bold text-gray-800 dark:text-white outline-none cursor-pointer focus:border-[#1b5e20] transition"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                  </select>
                  <FaGlobe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                  <FaChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
