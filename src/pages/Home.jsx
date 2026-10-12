import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useLogin } from "../context/LoginContext";
import LoginModal from "./LoginModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRoad,
  FaTint,
  FaBolt,
  FaTrash,
  FaBuilding,
  FaSearch,
  FaArrowRight,
  FaArrowLeft,
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
  FaEllipsisH,
  FaTree,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaChartBar,
} from "react-icons/fa";

function Home() {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

      {/* 5. HOW IT WORKS SECTION — redesigned to match reference */}
      <section className="py-16 sm:py-20 bg-[#f4f8f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-white border border-[#c8e6c9] text-[#1b5e20] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm mb-4">
              {isHindi ? "सरल प्रक्रिया" : "Simple Process"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {isHindi ? "यह कैसे काम करता है?" : <>
                How It <span className="text-[#1b5e20]">Works?</span>
              </>}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-normal max-w-xl mx-auto">
              {isHindi
                ? "कुछ सरल चरणों में अपनी स्थानीय समस्या दर्ज करें और एक स्वच्छ, सुरक्षित और बेहतर शहर बनाने में मदद करें।"
                : "Report your local issue in just a few simple steps and help us build a cleaner, safer and better city."}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT — Numbered Step List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 hover:shadow-md hover:border-[#c8e6c9] transition-all duration-200 group cursor-pointer"
                >
                  {/* Step Number Circle */}
                  <div className="w-9 h-9 rounded-full border-2 border-[#c8e6c9] bg-[#f0faf0] text-[#1b5e20] font-extrabold text-sm flex items-center justify-center shrink-0">
                    {step.num}
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#eaf5ea] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-gray-900 text-base leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5 leading-snug">
                      {step.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <FaArrowRight className="text-gray-300 text-sm shrink-0 group-hover:text-[#1b5e20] group-hover:translate-x-1 transition-all" />

                  {/* Dotted line connector below (except last) */}
                </div>
              ))}
            </motion.div>

            {/* RIGHT — Phone Mockup with city backdrop */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative flex justify-center"
            >
              {/* City background image container */}
              <div className="relative w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[420px] sm:h-[480px]">
                <img
                  src="/images/hero_city_street.jpg"
                  alt="City Street"
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />

                {/* Floating phone screen inset */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[210px] bg-white rounded-[1.8rem] shadow-2xl border border-gray-200 overflow-hidden z-10">
                  {/* Phone top bar */}
                  <div className="bg-white pt-5 pb-3 px-4 flex flex-col items-center border-b border-gray-100">
                    <div className="w-8 h-8 rounded-xl bg-[#1b5e20] text-white flex items-center justify-center text-base mb-1 shadow">
                      <FaLandmark />
                    </div>
                    <span className="font-extrabold text-gray-900 text-xs">Civic Report</span>
                    <span className="text-[8px] text-gray-400 font-semibold">Report Today • Better Tomorrow</span>
                  </div>
                  {/* Phone menu items */}
                  <div className="bg-white px-3 py-3 space-y-2">
                    <button onClick={() => handleReportClick()} className="w-full flex items-center justify-between bg-gray-50 hover:bg-[#f0faf0] border border-gray-100 rounded-xl px-3 py-2 transition">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#e8f5e9] text-[#1b5e20] flex items-center justify-center text-[10px]"><FaFileAlt /></div>
                        <span className="text-[10px] font-bold text-gray-800">Report an Issue</span>
                      </div>
                      <FaChevronRight className="text-gray-400 text-[9px]" />
                    </button>
                    <button onClick={handleTrackClick} className="w-full flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-xl px-3 py-2 transition">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-[10px]"><FaSearch /></div>
                        <span className="text-[10px] font-bold text-gray-800">Track Status</span>
                      </div>
                      <FaChevronRight className="text-gray-400 text-[9px]" />
                    </button>
                    <button onClick={handleTrackClick} className="w-full flex items-center justify-between bg-gray-50 hover:bg-purple-50 border border-gray-100 rounded-xl px-3 py-2 transition">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#f3e5f5] text-[#9333ea] flex items-center justify-center text-[10px]"><FaMapMarkedAlt /></div>
                        <span className="text-[10px] font-bold text-gray-800">View Map</span>
                      </div>
                      <FaChevronRight className="text-gray-400 text-[9px]" />
                    </button>
                    <button onClick={handleTrackClick} className="w-full flex items-center justify-between bg-gray-50 hover:bg-orange-50 border border-gray-100 rounded-xl px-3 py-2 transition">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#fff3e0] text-[#ea580c] flex items-center justify-center text-[10px]"><FaFolder /></div>
                        <span className="text-[10px] font-bold text-gray-800">My Reports</span>
                      </div>
                      <FaChevronRight className="text-gray-400 text-[9px]" />
                    </button>
                  </div>
                </div>

                {/* Floating badge — top right */}
                <div className="absolute top-5 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gray-100 max-w-[170px] z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#e8f5e9] text-[#1b5e20] flex items-center justify-center text-sm shrink-0">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-[10px] leading-tight">Your Report Matters</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">Together we can make our cities better.</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge — bottom right */}
                <div className="absolute bottom-5 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gray-100 max-w-[160px] z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#e8f5e9] text-[#1b5e20] flex items-center justify-center text-sm shrink-0">
                      <FaUsers />
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-[10px] leading-tight">Be the Change</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">Report issues, improve your city.</p>
                    </div>
                  </div>
                </div>

                {/* Decorative slash marks */}
                <div className="absolute top-5 left-5 text-white/40 text-xl font-bold select-none">/ /</div>
                <div className="absolute bottom-28 left-5 text-white/40 text-xl font-bold select-none">/ /</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5b. COMMON ISSUES IN YOUR CITY */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#e8f5e9] border border-[#c8e6c9] text-[#1b5e20] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm mb-4">
              {isHindi ? "क्या रिपोर्ट करें?" : "What Can You Report?"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {isHindi ? (
                <>आपके शहर में <span className="text-[#1b5e20]">सामान्य समस्याएं</span></>
              ) : (
                <>Common Issues in <span className="text-[#1b5e20]">Your City</span></>
              )}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg font-normal max-w-xl mx-auto">
              {isHindi
                ? "नागरिक समस्याओं की एक विस्तृत श्रृंखला की रिपोर्ट करें और अपने स्थानीय प्राधिकरण को कार्रवाई करने में मदद करें।"
                : "Report a wide range of civic issues and help your local authority take action."}
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                id: "roads",
                title: isHindi ? "सड़कें" : "Roads",
                subtitle: isHindi ? "गड्ढे, क्षति" : "Potholes, Damage",
                icon: <FaRoad className="text-2xl text-[#1b5e20]" />,
                bg: "bg-[#eaf5ea]",
                border: "border-[#c8e6c9]",
              },
              {
                id: "water",
                title: isHindi ? "जल" : "Water",
                subtitle: isHindi ? "आपूर्ति, रिसाव" : "Supply, Leakage",
                icon: <FaTint className="text-2xl text-[#0284c7]" />,
                bg: "bg-[#e0f2fe]",
                border: "border-[#bae6fd]",
              },
              {
                id: "electricity",
                title: isHindi ? "बिजली" : "Electricity",
                subtitle: isHindi ? "कटौती, खंभे" : "Outage, Poles",
                icon: <FaBolt className="text-2xl text-[#ea580c]" />,
                bg: "bg-[#fff7ed]",
                border: "border-[#fed7aa]",
              },
              {
                id: "cleanliness",
                title: isHindi ? "स्वच्छता" : "Cleanliness",
                subtitle: isHindi ? "कचरा, सफाई" : "Garbage, Sanitation",
                icon: <FaTrash className="text-2xl text-[#dc2626]" />,
                bg: "bg-[#fff1f2]",
                border: "border-[#fecdd3]",
              },
              {
                id: "public",
                title: isHindi ? "सार्वजनिक स्थान" : "Public Places",
                subtitle: isHindi ? "पार्क, स्ट्रीट लाइट" : "Parks, Street Lights",
                icon: <FaTree className="text-2xl text-[#059669]" />,
                bg: "bg-[#ecfdf5]",
                border: "border-[#a7f3d0]",
              },
              {
                id: "other",
                title: isHindi ? "अन्य" : "Other",
                subtitle: isHindi ? "कोई भी नागरिक समस्या" : "Any Civic Issue",
                icon: <FaEllipsisH className="text-2xl text-gray-500" />,
                bg: "bg-gray-100",
                border: "border-gray-200",
              },
            ].map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => handleReportClick(cat.id === "public" || cat.id === "other" ? undefined : cat.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`flex flex-col items-center text-center p-5 rounded-2xl bg-white border ${cat.border} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group`}
              >
                <div className={`w-14 h-14 rounded-full ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  {cat.icon}
                </div>
                <span className="font-extrabold text-gray-900 text-sm">{cat.title}</span>
                <span className="text-[11px] text-gray-400 font-medium mt-0.5">{cat.subtitle}</span>
              </motion.button>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS — "Trusted by People in Your Community" */}
      <section className="py-16 sm:py-20 bg-[#f4f8f4] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-white border border-[#c8e6c9] text-[#1b5e20] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm mb-4">
              {isHindi ? "नागरिक क्या कहते हैं" : "What Citizens Say"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              {isHindi ? (
                <>आपके <span className="text-[#1b5e20]">समुदाय</span> के लोगों द्वारा विश्वसनीय</>
              ) : (
                <>Trusted by People in <span className="text-[#1b5e20]">Your Community</span></>
              )}
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">
              {isHindi
                ? "उन नागरिकों की वास्तविक प्रतिक्रिया जिन्होंने रिपोर्ट किया और बदलाव देखा।"
                : "Real feedback from citizens who have reported and seen change."}
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Prev button */}
            <button
              onClick={() => setActiveTestimonial((p) => (p === 0 ? 2 : p - 1))}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-[#1b5e20] hover:border-[#c8e6c9] transition-all"
            >
              <FaArrowLeft className="text-sm" />
            </button>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 overflow-hidden">
              {[
                {
                  name: "Aman Singh",
                  location: "Rajpur, Dehradun",
                  review: isHindi
                    ? "\"बहुत उपयोग में आसान। मैंने एक गड्ढे की रिपोर्ट की और कुछ दिनों में वह ठीक हो गई। शानदार पहल!\""
                    : "\"Very easy to use. I reported a pothole and it was resolved within a few days. Great initiative!\"",
                  rating: 5,
                  initial: "A",
                  color: "bg-[#e8f5e9] text-[#1b5e20]",
                },
                {
                  name: "Priya Sharma",
                  location: "Dalanwala, Dehradun",
                  review: isHindi
                    ? "\"अब स्थानीय समस्याओं की रिपोर्ट करना बहुत आसान हो गया है। ट्रैकिंग फीचर बहुत उपयोगी है।\""
                    : "\"Now it's much easier to report local problems. The tracking feature is very helpful.\"",
                  rating: 5,
                  initial: "P",
                  color: "bg-[#e0f2fe] text-[#0284c7]",
                },
                {
                  name: "Rohit Verma",
                  location: "Indira Nagar, Dehradun",
                  review: isHindi
                    ? "\"मैंने एक स्ट्रीट लाइट की समस्या रिपोर्ट की और वह ठीक हो गई। Civic Report सच में काम करता है!\""
                    : "\"I reported a street light issue and it was fixed quickly. Civic Report really works!\"",
                  rating: 5,
                  initial: "R",
                  color: "bg-[#f3e5f5] text-[#9333ea]",
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-200"
                >
                  {/* Reviewer header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${t.color} flex items-center justify-center text-lg font-extrabold shrink-0`}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <FaMapMarkerAlt className="text-[10px]" />
                        {t.location}
                      </p>
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <FaStar key={si} className="text-amber-400 text-sm" />
                    ))}
                  </div>
                  {/* Review text */}
                  <p className="text-gray-600 text-sm leading-relaxed italic">{t.review}</p>
                </motion.div>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => setActiveTestimonial((p) => (p === 2 ? 0 : p + 1))}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-[#1b5e20] hover:border-[#c8e6c9] transition-all"
            >
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. CTA — "Let's Build a Better Tomorrow" */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

          {/* LEFT — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#eaf5ea] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16"
          >
            <span className="inline-block bg-white border border-[#c8e6c9] text-[#1b5e20] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm mb-6 self-start">
              {isHindi ? "परिवर्तन बनें" : "Be the Change"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              {isHindi
                ? <>चलो एक <span className="text-[#1b5e20]">बेहतर कल</span> बनाएं</>
                : <>Let's Build a <span className="text-[#1b5e20]">Better Tomorrow</span></>}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              {isHindi
                ? "आपकी रिपोर्ट आपके शहर में वास्तविक बदलाव ला सकती है। स्थानीय समस्याओं की रिपोर्ट करें, प्रगति ट्रैक करें और स्वच्छ, सुरक्षित और अधिक रहने योग्य समुदाय बनाने में मदद करें।"
                : "Your report can make a real difference in your city. Report local issues, track progress, and help create cleaner, safer and more livable communities."}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleReportClick()}
                className="bg-[#1b5e20] hover:bg-[#144718] text-white px-7 py-3.5 rounded-full font-semibold text-base flex items-center gap-2 shadow-lg shadow-green-900/20 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <FaFileAlt className="text-sm" />
                <span>{isHindi ? "समस्या दर्ज करें" : "Report an Issue"}</span>
                <FaArrowRight className="text-sm" />
              </button>
              <button
                onClick={handleTrackClick}
                className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 px-7 py-3.5 rounded-full font-semibold text-base flex items-center gap-2 shadow-sm transition-all duration-200"
              >
                <FaChartBar className="text-sm text-gray-500" />
                <span>{isHindi ? "स्थिति ट्रैक करें" : "Track Status"}</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT — City photo with stats overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative min-h-[340px]"
          >
            <img
              src="/images/hero_city_street.jpg"
              alt="City"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />

            {/* Stats card overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 px-6 py-5">
              <div className="grid grid-cols-4 divide-x divide-gray-100">
                {[
                  { icon: <FaUsers className="text-xl text-[#1b5e20]" />, value: "10,000+", label: isHindi ? "सक्रिय नागरिक" : "Active Citizens", bg: "bg-[#e8f5e9]" },
                  { icon: <FaCheckCircle className="text-xl text-[#1b5e20]" />, value: "8,200+", label: isHindi ? "समस्याएं हल" : "Issues Resolved", bg: "bg-[#e8f5e9]" },
                  { icon: <FaLandmark className="text-xl text-[#1b5e20]" />, value: "25+", label: isHindi ? "नगर निगम क्षेत्र" : "Municipal Areas", bg: "bg-[#e8f5e9]" },
                  { icon: <FaStar className="text-xl text-amber-400" />, value: "4.5/5", label: isHindi ? "उपयोगकर्ता संतुष्टि" : "User Satisfaction", bg: "bg-amber-50" },
                ].map((s, i) => (
                  <div key={i} className={`flex flex-col items-center text-center px-2 ${i > 0 ? "pl-3" : ""}`}>
                    <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-2`}>
                      {s.icon}
                    </div>
                    <span className="font-extrabold text-gray-900 text-base leading-tight">{s.value}</span>
                    <span className="text-[10px] text-gray-500 font-medium mt-0.5 leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="about-section" className="bg-gray-900 text-gray-400 pt-12 pb-6 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">

            {/* Brand */}
            <div className="flex flex-col gap-3 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#1b5e20] text-white flex items-center justify-center text-base">
                  <FaLandmark />
                </div>
                <span className="text-white font-extrabold text-xl tracking-tight">Civic Report</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {isHindi
                  ? "स्थानीय समस्याओं को रिपोर्ट करने का सबसे सरल और प्रभावी तरीका।"
                  : "The simplest and most effective way to report local civic issues."}
              </p>
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              {[
                { label: isHindi ? "होम" : "Home", action: () => navigate("/") },
                { label: isHindi ? "हमारे बारे में" : "About", action: () => {} },
                { label: isHindi ? "समस्या दर्ज करें" : "Report an Issue", action: () => handleReportClick() },
                { label: isHindi ? "स्थिति ट्रैक करें" : "Track Status", action: () => handleTrackClick() },
                { label: isHindi ? "संपर्क" : "Contact", action: () => {} },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaTwitter />, label: "Twitter" },
                { icon: <FaLinkedinIn />, label: "LinkedIn" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaYoutube />, label: "YouTube" },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1b5e20] text-gray-400 hover:text-white flex items-center justify-center text-sm transition-all duration-200"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Divider + Copyright */}
          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">© 2024 Civic Report. All rights reserved.</p>
            <p className="text-xs text-gray-600 italic">Report Today • Better Tomorrow</p>
          </div>

        </div>
      </footer>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

export default Home;
