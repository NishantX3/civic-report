import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useLogin } from "../context/LoginContext";
import LoginModal from "./LoginModal";
import { motion } from "framer-motion";
import {
  FaRoad,
  FaTint,
  FaBolt,
  FaTrash,
  FaBuilding,
  FaSearch,
  FaArrowRight,
  FaLandmark,
  FaCheckCircle,
  FaUsers,
  FaStar,
  FaMapMarkerAlt,
  FaFileAlt,
  FaPaperPlane,
  FaComment,
  FaHeart,
  FaExclamationCircle,
  FaClock,
  FaMousePointer,
  FaChartLine,
  FaChevronRight,
  FaMapMarkedAlt,
  FaFolder,
} from "react-icons/fa";

function Home() {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleReportClick = (category = null) => {
    if (isLoggedIn) {
      if (category) {
        navigate(`/report?category=${category}`);
      } else {
        navigate("/report");
      }
    } else {
      setShowLogin(true);
    }
  };

  const handleTrackClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setShowLogin(true);
    }
  };

  const categories = [
    {
      id: "roads",
      title: isHindi ? "सड़कें" : "Roads",
      subtitle: isHindi ? "गड्ढे, क्षति" : "Potholes, Damage",
      icon: <FaRoad className="text-xl text-[#2e7d32]" />,
      bgColor: "bg-[#e8f5e9]",
    },
    {
      id: "water",
      title: isHindi ? "जल" : "Water",
      subtitle: isHindi ? "आपूर्ति, रिसाव" : "Supply, Leakage",
      icon: <FaTint className="text-xl text-[#0284c7]" />,
      bgColor: "bg-[#e0f2fe]",
    },
    {
      id: "electricity",
      title: isHindi ? "बिजली" : "Electricity",
      subtitle: isHindi ? "कटौती, खंभे" : "Outage, Poles",
      icon: <FaBolt className="text-xl text-[#ea580c]" />,
      bgColor: "bg-[#fff3e0]",
    },
    {
      id: "cleanliness",
      title: isHindi ? "स्वच्छता" : "Cleanliness",
      subtitle: isHindi ? "कचरा, सफाई" : "Garbage, Sanitation",
      icon: <FaTrash className="text-xl text-[#dc2626]" />,
      bgColor: "bg-[#ffebee]",
    },
    {
      id: "other",
      title: isHindi ? "अन्य" : "Other",
      subtitle: isHindi ? "सार्वजनिक सुविधाएं" : "Public Amenities",
      icon: <FaBuilding className="text-xl text-[#9333ea]" />,
      bgColor: "bg-[#f3e5f5]",
    },
  ];

  const recentIssues = [
    {
      id: 1,
      image: "/images/pothole.jpg",
      timeAgo: isHindi ? "2 घंटे पहले" : "2 hours ago",
      category: isHindi ? "सड़कें" : "Roads",
      categoryBg: "bg-[#e8f5e9]",
      categoryColor: "text-[#2e7d32]",
      categoryIcon: <FaRoad className="text-xs" />,
      title: isHindi ? "मुख्य मार्ग पर बड़ा गड्ढा" : "Large pothole on Main Road",
      location: "Rajpur Road, Dehradun",
      status: isHindi ? "लंबित" : "Pending",
      statusType: "pending",
      comments: 4,
      likes: 12,
    },
    {
      id: 2,
      image: "/images/street light.jpeg",
      timeAgo: isHindi ? "5 घंटे पहले" : "5 hours ago",
      category: isHindi ? "बिजली" : "Electricity",
      categoryBg: "bg-[#fff3e0]",
      categoryColor: "text-[#ea580c]",
      categoryIcon: <FaBolt className="text-xs" />,
      title: isHindi ? "स्ट्रीट लाइट काम नहीं कर रही" : "Street light not working",
      location: "Dalanwala, Dehradun",
      status: isHindi ? "प्रगति में" : "In Progress",
      statusType: "in-progress",
      comments: 3,
      likes: 8,
    },
    {
      id: 3,
      image: "/images/garbage.jpeg",
      timeAgo: isHindi ? "1 दिन पहले" : "1 day ago",
      category: isHindi ? "स्वच्छता" : "Cleanliness",
      categoryBg: "bg-[#ffebee]",
      categoryColor: "text-[#dc2626]",
      categoryIcon: <FaTrash className="text-xs" />,
      title: isHindi ? "कचरा एकत्र नहीं किया गया" : "Garbage not collected",
      location: "Indira Nagar, Dehradun",
      status: isHindi ? "लंबित" : "Pending",
      statusType: "pending",
      comments: 6,
      likes: 15,
    },
    {
      id: 4,
      image: "/images/water leak.jpeg",
      timeAgo: isHindi ? "2 दिन पहले" : "2 days ago",
      category: isHindi ? "जल" : "Water",
      categoryBg: "bg-[#e0f2fe]",
      categoryColor: "text-[#0284c7]",
      categoryIcon: <FaTint className="text-xs" />,
      title: isHindi ? "पार्क के पास पानी का रिसाव" : "Water leakage near park",
      location: "Premnagar, Dehradun",
      status: isHindi ? "हल किया गया" : "Resolved",
      statusType: "resolved",
      comments: 2,
      likes: 10,
    },
  ];

  const features = [
    {
      icon: <FaMousePointer className="text-xl text-[#1b5e20]" />,
      iconBg: "bg-[#e8f5e9]",
      title: isHindi ? "उपयोग में आसान" : "Easy to Use",
      desc: isHindi
        ? "फोटो और स्थान के साथ कुछ ही क्लिक में समस्याएं दर्ज करें।"
        : "Report issues in just a few clicks with photos and location.",
    },
    {
      icon: <FaBuilding className="text-xl text-[#0284c7]" />,
      iconBg: "bg-[#e0f2fe]",
      title: isHindi ? "अधिकारियों तक सीधा" : "Direct to Authorities",
      desc: isHindi
        ? "आपकी रिपोर्ट सीधे संबंधित विभाग तक पहुँचती है।"
        : "Your report reaches the concerned department directly.",
    },
    {
      icon: <FaChartLine className="text-xl text-[#ea580c]" />,
      iconBg: "bg-[#fff3e0]",
      title: isHindi ? "रियल-टाइम ट्रैकिंग" : "Real-Time Tracking",
      desc: isHindi
        ? "हर चरण में अपनी रिपोर्ट की स्थिति जानें।"
        : "Know the status of your report at every step.",
    },
    {
      icon: <FaUsers className="text-xl text-[#9333ea]" />,
      iconBg: "bg-[#f3e5f5]",
      title: isHindi ? "बेहतर समुदाय का निर्माण" : "Builds a Better Community",
      desc: isHindi
        ? "मिलकर हम अपने शहर को स्वच्छ और सुरक्षित बना सकते हैं।"
        : "Together we can make our city cleaner and safer.",
    },
  ];

  const steps = [
    {
      num: 1,
      icon: <FaFileAlt className="text-2xl text-[#1b5e20]" />,
      title: isHindi ? "रिपोर्ट करें" : "Report",
      desc: isHindi
        ? "फोटो और स्थान के साथ समस्या का विवरण दें"
        : "Describe the issue with photo and location",
    },
    {
      num: 2,
      icon: <FaPaperPlane className="text-2xl text-[#1b5e20]" />,
      title: isHindi ? "सबमिट करें" : "Submit",
      desc: isHindi
        ? "आपकी रिपोर्ट संबंधित प्राधिकरण को भेजी जाती है"
        : "Your report is sent to the concerned authority",
    },
    {
      num: 3,
      icon: <FaSearch className="text-2xl text-[#1b5e20]" />,
      title: isHindi ? "ट्रैक करें" : "Track",
      desc: isHindi
        ? "अपनी रिपोर्ट की वास्तविक स्थिति जांचें"
        : "Check real-time status of your report",
    },
    {
      num: 4,
      icon: <FaCheckCircle className="text-2xl text-[#1b5e20]" />,
      title: isHindi ? "समाधान पाएं" : "Get Resolved",
      desc: isHindi
        ? "अधिकारी कार्रवाई करते हैं और समस्या हल करते हैं"
        : "Authorities take action and resolve the issue",
    },
  ];

  const stats = [
    {
      icon: <FaUsers className="text-2xl text-[#1b5e20]" />,
      value: "10,000+",
      label: isHindi ? "दर्ज की गई समस्याएं" : "Issues Reported",
      bgColor: "bg-[#e8f5e9]",
    },
    {
      icon: <FaCheckCircle className="text-2xl text-[#1b5e20]" />,
      value: "8,200+",
      label: isHindi ? "हल की गई समस्याएं" : "Resolved Issues",
      bgColor: "bg-[#e8f5e9]",
    },
    {
      icon: <FaLandmark className="text-2xl text-[#1b5e20]" />,
      value: "25+",
      label: isHindi ? "नगर निगम क्षेत्र" : "Municipal Areas",
      bgColor: "bg-[#e8f5e9]",
    },
    {
      icon: <FaStar className="text-2xl text-amber-500" />,
      value: "4.5/5",
      label: isHindi ? "उपयोगकर्ता संतुष्टि" : "User Satisfaction",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#e8f5e9] text-[#1b5e20] border border-[#c8e6c9] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                <FaLandmark className="text-xs" />
                <span>
                  {isHindi
                    ? "स्थानीय समस्याओं को रिपोर्ट करने का स्मार्ट तरीका"
                    : "A Smarter Way to Report Local Issues"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.08] mb-6">
                {isHindi ? (
                  <>
                    स्वच्छ शहर, <br />
                    <span className="text-[#1b5e20]">सशक्त समुदाय</span>
                  </>
                ) : (
                  <>
                    Cleaner Cities, <br />
                    <span className="text-gray-900">Stronger Communities</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
                {isHindi
                  ? "सड़क, पानी, बिजली, स्वच्छता जैसी स्थानीय समस्याओं की रिपोर्ट फ़ोटो, स्थान और रियल-टाइम ट्रैकिंग के साथ करें। आइए मिलकर एक बेहतर कल बनाएं।"
                  : "Report local issues like roads, water, electricity, cleanliness and more — with photos, location and real-time tracking. Let's build a better tomorrow together."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => handleReportClick()}
                  className="bg-[#1b5e20] hover:bg-[#144718] text-white px-7 py-3.5 rounded-full font-semibold text-base flex items-center gap-2 shadow-lg shadow-green-900/15 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>{isHindi ? "समस्या दर्ज करें" : "Report an Issue"}</span>
                  <FaArrowRight className="text-sm" />
                </button>

                <button
                  onClick={handleTrackClick}
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 px-7 py-3.5 rounded-full font-semibold text-base flex items-center gap-2 shadow-sm transition-all duration-200"
                >
                  <FaSearch className="text-sm text-gray-500" />
                  <span>{isHindi ? "अपनी रिपोर्ट ट्रैक करें" : "Track Your Report"}</span>
                </button>
              </div>

              {/* Category selector row */}
              <div className="w-full pt-4 border-t border-gray-200/60">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleReportClick(cat.id)}
                      className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
                    >
                      <div
                        className={`w-12 h-12 rounded-full ${cat.bgColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                      >
                        {cat.icon}
                      </div>
                      <span className="font-bold text-gray-900 text-xs sm:text-sm">
                        {cat.title}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium truncate max-w-full">
                        {cat.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[360px] sm:h-[420px] lg:h-[460px] w-full">
                <img
                  src="/images/hero_city_street.jpg"
                  alt="Clean City Street"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-[260px] sm:max-w-[280px]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1b5e20] text-white flex items-center justify-center shrink-0 text-base shadow-sm">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-sm leading-snug">
                        {isHindi ? "आपका शहर, हमारी जिम्मेदारी" : "Your City, Our Responsibility"}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-semibold mt-1">
                        Report • Track • Get it Resolved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. RECENT ISSUES SECTION (SLIDE 2 TOP) */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-block bg-[#e8f5e9] text-[#1b5e20] text-xs font-bold px-3.5 py-1 rounded-full border border-[#c8e6c9] mb-2.5">
                {isHindi ? "आपके समुदाय से नवीनतम" : "Latest from Your Community"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {isHindi ? "हाल की समस्याएं" : "Recent Issues"}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                {isHindi
                  ? "अपने क्षेत्र में नागरिकों द्वारा रिपोर्ट की गई समस्याएं देखें।"
                  : "See the issues reported by citizens in your area."}
              </p>
            </div>

            <button
              onClick={handleTrackClick}
              className="text-[#1b5e20] hover:text-[#144718] font-bold text-sm flex items-center gap-2 transition group self-start md:self-auto"
            >
              <span>{isHindi ? "सभी देखें" : "View All"}</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentIssues.map((issue) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: issue.id * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                onClick={handleTrackClick}
              >
                {/* Image Container with Time Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                    {issue.timeAgo}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Pill */}
                    <div
                      className={`inline-flex items-center gap-1.5 ${issue.categoryBg} ${issue.categoryColor} text-xs font-bold px-2.5 py-1 rounded-full mb-2.5`}
                    >
                      {issue.categoryIcon}
                      <span>{issue.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-[#1b5e20] transition-colors">
                      {issue.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-4">
                      <FaMapMarkerAlt className="text-gray-400 shrink-0" />
                      <span className="truncate">{issue.location}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    {/* Status Badge */}
                    {issue.statusType === "pending" && (
                      <span className="bg-[#ffebee] text-[#dc2626] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <FaExclamationCircle className="text-xs" />
                        <span>{issue.status}</span>
                      </span>
                    )}
                    {issue.statusType === "in-progress" && (
                      <span className="bg-[#e0f2fe] text-[#0284c7] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <FaClock className="text-xs" />
                        <span>{issue.status}</span>
                      </span>
                    )}
                    {issue.statusType === "resolved" && (
                      <span className="bg-[#e8f5e9] text-[#1b5e20] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <FaCheckCircle className="text-xs" />
                        <span>{issue.status}</span>
                      </span>
                    )}

                    {/* Comments & Likes */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1 hover:text-gray-600">
                        <FaComment />
                        <span>{issue.comments}</span>
                      </span>
                      <span className="flex items-center gap-1 hover:text-red-500">
                        <FaHeart />
                        <span>{issue.likes}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE CIVIC REPORT? (SLIDE 2 BOTTOM - SMARTPHONE MOCKUP) */}
      <section className="py-16 sm:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Feature Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col items-start"
            >
              {/* Badge */}
              <div className="inline-block bg-[#e8f5e9] text-[#1b5e20] text-xs font-bold px-3.5 py-1 rounded-full border border-[#c8e6c9] mb-4">
                {isHindi ? "Civic Report क्यों चुनें?" : "Why Choose Civic Report?"}
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.12] mb-5">
                {isHindi ? (
                  <>
                    बेहतर समुदाय बनाने का <br />
                    <span className="text-[#1b5e20]">सरल तरीका</span>
                  </>
                ) : (
                  <>
                    A Simpler Way to <br />
                    Build Better Communities
                  </>
                )}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
                {isHindi
                  ? "Civic Report नागरिकों को स्थानीय समस्याओं को आसानी से दर्ज करने में मदद करता है और यह सुनिश्चित करता है कि सही अधिकारी कार्रवाई करें। साथ मिलकर हम अपने शहरों को स्वच्छ, सुरक्षित और अधिक रहने योग्य बना सकते हैं।"
                  : "Civic Report helps citizens report local issues easily and ensures the right authorities take action. Together, we can make our cities cleaner, safer and more livable."}
              </p>

              {/* 2x2 Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${feat.iconBg} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-base mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Smartphone Presentation Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative flex justify-center"
            >
              {/* Mint Green Organic Graphic Background */}
              <div className="bg-[#eaf5ea] rounded-[3rem] p-6 sm:p-10 w-full max-w-lg relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
                
                {/* Smartphone Container */}
                <div className="w-[260px] sm:w-[280px] bg-gray-900 rounded-[2.8rem] p-3 shadow-2xl border-4 border-gray-800 relative z-10">
                  {/* Phone Notch/Speaker */}
                  <div className="w-24 h-4 bg-gray-900 rounded-b-xl mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                    <div className="w-10 h-1 bg-gray-700 rounded-full"></div>
                  </div>

                  {/* Phone Screen */}
                  <div className="bg-white rounded-[2.2rem] pt-8 pb-6 px-4 flex flex-col items-center text-center overflow-hidden border border-gray-100 min-h-[420px]">
                    
                    {/* App Header Inside Phone */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#1b5e20] text-white flex items-center justify-center text-xl mb-1.5 shadow-md">
                        <FaLandmark />
                      </div>
                      <span className="font-extrabold text-gray-900 text-lg leading-tight">
                        Civic Report
                      </span>
                      <span className="text-[9px] text-gray-400 font-bold tracking-wider">
                        Report Today • Better Tomorrow
                      </span>
                    </div>

                    {/* App Menu List */}
                    <div className="w-full space-y-3">
                      <button
                        onClick={() => handleReportClick()}
                        className="w-full bg-white border border-gray-200 hover:border-[#1b5e20] p-3 rounded-xl flex items-center justify-between text-left shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#e8f5e9] text-[#1b5e20] flex items-center justify-center text-xs">
                            <FaFileAlt />
                          </div>
                          <span className="font-bold text-gray-800 text-xs">
                            Report an Issue
                          </span>
                        </div>
                        <FaChevronRight className="text-gray-400 text-xs" />
                      </button>

                      <button
                        onClick={handleTrackClick}
                        className="w-full bg-white border border-gray-200 hover:border-[#0284c7] p-3 rounded-xl flex items-center justify-between text-left shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-xs">
                            <FaSearch />
                          </div>
                          <span className="font-bold text-gray-800 text-xs">
                            Track Status
                          </span>
                        </div>
                        <FaChevronRight className="text-gray-400 text-xs" />
                      </button>

                      <button
                        onClick={handleTrackClick}
                        className="w-full bg-white border border-gray-200 hover:border-[#9333ea] p-3 rounded-xl flex items-center justify-between text-left shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#f3e5f5] text-[#9333ea] flex items-center justify-center text-xs">
                            <FaMapMarkedAlt />
                          </div>
                          <span className="font-bold text-gray-800 text-xs">
                            View Map
                          </span>
                        </div>
                        <FaChevronRight className="text-gray-400 text-xs" />
                      </button>

                      <button
                        onClick={handleTrackClick}
                        className="w-full bg-white border border-gray-200 hover:border-[#ea580c] p-3 rounded-xl flex items-center justify-between text-left shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#fff3e0] text-[#ea580c] flex items-center justify-center text-xs">
                            <FaFolder />
                          </div>
                          <span className="font-bold text-gray-800 text-xs">
                            My Reports
                          </span>
                        </div>
                        <FaChevronRight className="text-gray-400 text-xs" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Floating Card Badge 1 (Top Right of Phone) */}
                <div className="absolute top-6 right-2 sm:right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-gray-100 max-w-[210px] sm:max-w-[230px] z-20 animate-bounce-slow">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#1b5e20] flex items-center justify-center shrink-0 text-sm font-bold">
                      <FaUsers />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-xs leading-snug">
                        Your Report Creates Real Change
                      </h4>
                      <p className="text-[9px] text-gray-500 font-medium mt-0.5">
                        Report today for a cleaner, safer and better tomorrow.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Handwritten Style Badge 2 (Bottom Right) */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-md border border-green-200 z-20">
                  <span className="font-extrabold text-[#1b5e20] text-xs italic tracking-tight flex flex-col text-right leading-tight">
                    <span>Cleaner Cities</span>
                    <span>Happier Communities</span>
                  </span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. STATS BAR SECTION */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-100"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 ${
                  i > 0 ? "pt-4 lg:pt-0 lg:pl-6" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {isHindi ? "यह कैसे काम करता है?" : "How It Works?"}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-normal max-w-xl mx-auto">
              {isHindi
                ? "कुछ सरल चरणों में अपनी स्थानीय समस्या दर्ज करें"
                : "Report your local issue in just a few simple steps"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 relative flex flex-col items-start group"
              >
                {/* Arrow Connector */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-gray-300 text-lg">
                    <FaArrowRight />
                  </div>
                )}

                {/* Step Number Badge */}
                <div className="w-7 h-7 rounded-full bg-[#e8f5e9] text-[#1b5e20] text-xs font-bold flex items-center justify-center mb-4">
                  {step.num}
                </div>

                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-[#e8f5e9] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT US SECTION */}
      <section id="about-section" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#e8f5e9] text-[#1b5e20] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Civic Report Vision
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
              {isHindi ? "हमारे बारे में" : "About Us"}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              {isHindi
                ? "Civic Report का उद्देश्य नागरिकों को एक सरल, पारदर्शी और त्वरित मंच प्रदान करना है। हमारा लक्ष्य सड़क, जल, बिजली और स्वच्छता की समस्याओं को सीधे संबंधित अधिकारियों तक पहुँचाकर त्वरित समाधान सुनिश्चित करना है।"
                : "Civic Report aims to empower every citizen with a simple, transparent, and direct channel to local administration. Together with real-time AI classification and status updates, we make civic issue resolution fast, verifiable, and accountable."}
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1b5e20] text-white flex items-center justify-center text-sm font-bold">
              <FaLandmark />
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">
              Civic Report
            </span>
          </div>

          <p className="text-xs text-gray-500">
            © 2026 Civic Report • Report Today, Better Tomorrow.
          </p>
        </div>
      </footer>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

export default Home;
