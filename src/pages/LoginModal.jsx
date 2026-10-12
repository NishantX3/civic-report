import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLogin } from "../context/LoginContext";
import API from "../api/api";

/* ─────────────────────────────────────────────────────────────
   All login-modal styles injected once, scoped with .lm- prefix
───────────────────────────────────────────────────────────── */
const LM_STYLES = `
  .lm-backdrop {
    position: fixed; inset: 0;
    display: flex; align-items: center; justify-content: center; padding: 1rem;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(12px) saturate(1.5);
    -webkit-backdrop-filter: blur(12px) saturate(1.5);
    z-index: 9999;
    animation: lm-bg-in 0.25s ease-out forwards;
  }
  @keyframes lm-bg-in { from{opacity:0} to{opacity:1} }

  .lm-perspective {
    perspective: 1200px;
    perspective-origin: 50% 40%;
    width: 600px;
    max-width: 90vw;
  }

  .lm-card {
    position: relative;
    width: 600px;
    max-width: 90vw;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 24px;
    padding: 36px 32px 32px;
    max-height: 90vh; overflow-y: auto; overflow-x: hidden;
    box-shadow:
      0 0 0 1px rgba(27,94,32,0.08),
      0 2px 4px rgba(0,0,0,0.04),
      0 8px 16px rgba(0,0,0,0.08),
      0 24px 48px rgba(0,0,0,0.14),
      0 48px 96px rgba(27,94,32,0.10),
      inset 0 1px 0 rgba(255,255,255,0.9);
    animation:
      lm-card-in 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards,
      lm-float 5s ease-in-out 0.45s infinite;
    transform-style: preserve-3d;
    will-change: transform;
  }
  @keyframes lm-card-in {
    0%   { opacity:0; transform: translateY(60px) rotateX(10deg) scale(0.93); }
    100% { opacity:1; transform: translateY(0px)  rotateX(0deg)  scale(1);    }
  }
  @keyframes lm-float {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-7px); }
  }

  .lm-accent-bar {
    position: absolute; top:0; left:0; right:0; height:4px;
    border-radius: 24px 24px 0 0;
    background: linear-gradient(90deg,#1b5e20 0%,#4caf50 55%,#81c784 100%);
  }

  .lm-logo-wrap { display:flex; justify-content:center; margin-bottom:20px; }
  .lm-logo-ring {
    width:52px; height:52px; border-radius:16px;
    background: linear-gradient(135deg,#1b5e20 0%,#2e7d32 100%);
    color:#fff; display:flex; align-items:center; justify-content:center;
    box-shadow: 0 4px 14px rgba(27,94,32,0.38), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  .lm-close {
    position:absolute; top:14px; right:14px;
    width:32px; height:32px; border-radius:50%; border:none;
    background:#f3f4f6; color:#6b7280; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition: background 0.2s, color 0.2s, transform 0.22s;
  }
  .lm-close:hover { background:#fee2e2; color:#dc2626; transform:rotate(90deg) scale(1.1); }

  .lm-header { text-align:center; margin-bottom:22px; }
  .lm-title  { font-size:1.5rem; font-weight:800; color:#111827; margin:0 0 4px; letter-spacing:-0.025em; }
  .lm-subtitle { font-size:0.8rem; color:#9ca3af; margin:0; font-weight:500; }

  .lm-toggle {
    display:flex; width: 100%; box-sizing: border-box; background:#f3f4f6; border-radius:12px;
    padding:4px; margin-bottom:20px; gap:4px;
  }
  .lm-toggle-btn {
    flex:1; padding:8px 10px; border:none; border-radius:9px;
    font-size:0.78rem; font-weight:600; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:5px;
    color:#6b7280; background:transparent;
    transition: all 0.22s ease;
  }
  .lm-toggle-active {
    background:#fff; color:#1b5e20;
    box-shadow: 0 1px 6px rgba(0,0,0,0.10), 0 0 0 1px rgba(27,94,32,0.08);
  }

  .lm-body { width: 100%; box-sizing: border-box; }
  .lm-form  { display:flex; flex-direction:column; gap:14px; width: 100%; box-sizing: border-box; }
  .lm-field { display:flex; flex-direction:column; gap:5px; width: 100%; box-sizing: border-box; }
  .lm-label { font-size:0.72rem; font-weight:700; color:#374151; letter-spacing:0.04em; text-transform:uppercase; }

  .lm-input {
    width:100%; padding:11px 14px;
    border:1.5px solid #e5e7eb; border-radius:11px;
    font-size:0.88rem; color:#111827; background:#fafafa;
    outline:none; box-sizing:border-box;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .lm-input:focus {
    border-color:#1b5e20; background:#fff;
    box-shadow: 0 0 0 3px rgba(27,94,32,0.10), 0 1px 4px rgba(27,94,32,0.08);
  }
  .lm-input::placeholder { color:#d1d5db; }
  .lm-input-otp { letter-spacing:0.25em; font-weight:700; font-size:1rem; text-align:center; }

  .lm-submit {
    width:100%; padding:12px 20px; margin-top:4px;
    background: linear-gradient(135deg,#1b5e20 0%,#2e7d32 100%);
    color:#fff; border:none; border-radius:12px;
    font-size:0.9rem; font-weight:700; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    letter-spacing:0.01em;
    box-shadow: 0 4px 14px rgba(27,94,32,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s;
  }
  .lm-submit:hover {
    background: linear-gradient(135deg,#144718 0%,#1b5e20 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(27,94,32,0.42), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .lm-submit:active { transform:translateY(0); box-shadow:0 2px 8px rgba(27,94,32,0.28); }

  .lm-switch { margin-top:18px; text-align:center; font-size:0.8rem; color:#9ca3af; cursor:default; }
  .lm-switch-link { color:#1b5e20; font-weight:700; cursor:pointer; text-decoration:underline; text-underline-offset:2px; transition:color 0.2s; }
  .lm-switch-link:hover { color:#144718; }

  .lm-success-overlay {
    position:absolute; inset:0; border-radius:24px;
    background:rgba(255,255,255,0.92); backdrop-filter:blur(4px);
    display:flex; align-items:center; justify-content:center;
    animation: lm-fade-in 0.35s ease-out forwards;
  }
  @keyframes lm-fade-in { from{opacity:0} to{opacity:1} }
  .lm-success-inner {
    display:flex; flex-direction:column; align-items:center; gap:14px;
    animation: lm-pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
  @keyframes lm-pop-in { 0%{transform:scale(0.7);opacity:0} 100%{transform:scale(1);opacity:1} }
  .lm-success-icon {
    width:60px; height:60px; border-radius:50%;
    background:linear-gradient(135deg,#1b5e20 0%,#4caf50 100%);
    color:#fff; display:flex; align-items:center; justify-content:center;
    box-shadow:0 6px 20px rgba(27,94,32,0.4);
  }
  .lm-success-text { font-size:1rem; font-weight:800; color:#1b5e20; letter-spacing:-0.01em; margin:0; }

  .lm-card::-webkit-scrollbar { width:4px; }
  .lm-card::-webkit-scrollbar-track { background:transparent; }
  .lm-card::-webkit-scrollbar-thumb { background:#e5e7eb; border-radius:4px; }

  /* Dark mode modal styles */
  html.dark .lm-card {
    background: #1e293b;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 8px 32px rgba(0,0,0,0.5),
      0 24px 64px rgba(0,0,0,0.7),
      inset 0 1px 0 rgba(255,255,255,0.05);
  }
  html.dark .lm-title { color: #f8fafc; }
  html.dark .lm-subtitle { color: #94a3b8; }
  html.dark .lm-close {
    background: #334155; color: #cbd5e1;
  }
  html.dark .lm-close:hover {
    background: #7f1d1d; color: #fca5a5;
  }
  html.dark .lm-toggle {
    background: #0f172a;
    border: 1px solid #334155;
  }
  html.dark .lm-toggle-btn {
    color: #94a3b8;
  }
  html.dark .lm-toggle-active {
    background: #1e293b;
    color: #4ade80;
    box-shadow: 0 1px 6px rgba(0,0,0,0.3), 0 0 0 1px rgba(74,222,128,0.2);
  }
  html.dark .lm-label {
    color: #cbd5e1;
  }
  html.dark .lm-input {
    background: #0f172a;
    border-color: #334155;
    color: #f8fafc;
  }
  html.dark .lm-input:focus {
    border-color: #4ade80;
    background: #0f172a;
    box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
  }
  html.dark .lm-input::placeholder {
    color: #64748b;
  }
  html.dark .lm-switch {
    color: #94a3b8;
  }
  html.dark .lm-switch-link {
    color: #4ade80;
  }
  html.dark .lm-switch-link:hover {
    color: #86efac;
  }
  html.dark .lm-success-overlay {
    background: rgba(15, 23, 42, 0.95);
  }
  html.dark .lm-success-text {
    color: #4ade80;
  }
  html.dark .lm-card::-webkit-scrollbar-thumb {
    background: #334155;
  }

  @media(max-width:480px){
    .lm-card { padding:28px 20px 24px; border-radius:20px; }
  }
`;

function LoginModal({ isOpen, onClose, lang }) {
  // --- all hooks MUST be declared unconditionally at top
  const { login } = useLogin();
  const [mode, setMode] = useState("email"); // email / phone
  const [isSignup, setIsSignup] = useState(false); // login / signup toggle

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prevent background scroll while modal open (restore on unmount)
    useEffect(() => {
    if (!isOpen) return;

    // --- prevent body scroll AND avoid layout shift by reserving scrollbar width ---
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight || "";

    // compute scrollbar width (difference between window innerWidth and doc clientWidth)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    // also prevent touchmove on background for mobile (optional, safe)
    const preventTouch = (e) => {
      // allow inside-modal scrolling, block outside
      if (!e.target.closest("[role='dialog']")) e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      // restore
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight;
      document.removeEventListener("touchmove", preventTouch, { passive: false });
    };
  }, [isOpen]);


  // keep original behavior: if not open, render nothing (after hooks)
  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        login();
        resetFields();
      }, 1200);
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSignupEmail = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", { name, email, password });
      alert("Signup successful, now login!");
      setIsSignup(false);
      resetFields();
    } catch (error) {
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSignupPhone = async (e) => {
    e.preventDefault();
    if (otp !== generatedOtp) {
      alert("Incorrect OTP");
      return;
    }
    try {
      await API.post("/users/register", { name, phone, password });
      alert("Signup successful, now login!");
      setIsSignup(false);
      resetFields();
    } catch (error) {
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  const sendOtp = () => {
    if (phone.length !== 10) {
      alert(lang === "hi" ? "सही फ़ोन नंबर दर्ज करें" : "Enter valid phone number");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    alert(lang === "hi" ? `आपका OTP: ${code}` : `Your OTP: ${code}`);
  };

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setGeneratedOtp("");
  };

  const modalContent = (
    <div className="lm-backdrop" onClick={onClose}>
      {/* inject styles once */}
      <style>{LM_STYLES}</style>

      {/* 3D perspective wrapper */}
      <div className="lm-perspective">
        <div
          className="lm-card"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Top accent bar */}
          <div className="lm-accent-bar" />

          {/* Logo mark */}
          <div className="lm-logo-wrap">
            <div className="lm-logo-ring">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 22l9-9 9 9M5 9l7-7 7 7"/><path d="M9 22V12h6v10"/>
              </svg>
            </div>
          </div>

          {/* Close */}
          <button className="lm-close" onClick={onClose} aria-label="Close login modal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Header */}
          <div className="lm-header">
            <h2 className="lm-title">
              {isSignup
                ? lang === "hi" ? "खाता बनाएं" : "Create Account"
                : lang === "hi" ? "स्वागत है" : "Welcome Back"}
            </h2>
            <p className="lm-subtitle">
              {isSignup
                ? lang === "hi" ? "Civic Report से जुड़ें" : "Join Civic Report today"
                : lang === "hi" ? "अपने अकाउंट में लॉगिन करें" : "Sign in to your account"}
            </p>
          </div>

          {/* Email/Phone Toggle */}
          <div className="lm-toggle">
            <button className={`lm-toggle-btn ${mode === "email" ? "lm-toggle-active" : ""}`} onClick={() => setMode("email")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              {lang === "hi" ? "ईमेल" : "Email"}
            </button>
            <button className={`lm-toggle-btn ${mode === "phone" ? "lm-toggle-active" : ""}`} onClick={() => setMode("phone")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
              </svg>
              {lang === "hi" ? "फ़ोन" : "Phone"}
            </button>
          </div>

          {/* ── LOGIN / SIGNUP UI — functionality unchanged ── */}
          <div className="lm-body">
            {!isSignup ? (
              <>
                {mode === "email" ? (
                  <form onSubmit={handleLogin} className="lm-form">
                    <div className="lm-field">
                      <label className="lm-label">{lang === "hi" ? "ईमेल पता" : "Email Address"}</label>
                      <input type="email" placeholder={lang === "hi" ? "आपका ईमेल" : "you@example.com"}
                        value={email} onChange={(e) => setEmail(e.target.value)} className="lm-input" required />
                    </div>
                    <div className="lm-field">
                      <label className="lm-label">{lang === "hi" ? "पासवर्ड" : "Password"}</label>
                      <input type="password" placeholder="••••••••"
                        value={password} onChange={(e) => setPassword(e.target.value)} className="lm-input" required />
                    </div>
                    <button type="submit" className="lm-submit">
                      <span>{lang === "hi" ? "लॉगिन करें" : "Sign In"}</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </form>
                ) : (
                  <div className="lm-form">
                    {!otpSent ? (
                      <>
                        <div className="lm-field">
                          <label className="lm-label">{lang === "hi" ? "फ़ोन नंबर" : "Phone Number"}</label>
                          <input type="tel" placeholder={lang === "hi" ? "10 अंकों का नंबर" : "10-digit number"}
                            value={phone} onChange={(e) => setPhone(e.target.value)} className="lm-input" pattern="[0-9]{10}" required />
                        </div>
                        <button type="button" onClick={sendOtp} className="lm-submit">
                          <span>{lang === "hi" ? "OTP भेजें" : "Send OTP"}</span>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="lm-field">
                          <label className="lm-label">{lang === "hi" ? "OTP कोड" : "OTP Code"}</label>
                          <input type="text" placeholder={lang === "hi" ? "6 अंकों का OTP" : "Enter 6-digit OTP"}
                            value={otp} onChange={(e) => setOtp(e.target.value)} className="lm-input lm-input-otp" />
                        </div>
                        <button type="button" onClick={() => setSuccess(true)} className="lm-submit">
                          <span>{lang === "hi" ? "सत्यापित करें" : "Verify & Login"}</span>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </button>
                      </>
                    )}
                  </div>
                )}
                <p onClick={() => setIsSignup(true)} className="lm-switch">
                  {lang === "hi" ? "नए उपयोगकर्ता? " : "New here? "}
                  <span className="lm-switch-link">{lang === "hi" ? "साइन अप करें" : "Create account"}</span>
                </p>
              </>
            ) : (
              <>
                {mode === "email" ? (
                  <form onSubmit={handleSignupEmail} className="lm-form">
                    <div className="lm-field">
                      <label className="lm-label">{lang === "hi" ? "पूरा नाम" : "Full Name"}</label>
                      <input type="text" placeholder={lang === "hi" ? "आपका नाम" : "Your name"}
                        value={name} onChange={(e) => setName(e.target.value)} className="lm-input" required />
                    </div>
                    <div className="lm-field">
                      <label className="lm-label">{lang === "hi" ? "ईमेल पता" : "Email Address"}</label>
                      <input type="email" placeholder={lang === "hi" ? "आपका ईमेल" : "you@example.com"}
                        value={email} onChange={(e) => setEmail(e.target.value)} className="lm-input" required />
                    </div>
                    <div className="lm-field">
                      <label className="lm-label">{lang === "hi" ? "पासवर्ड" : "Password"}</label>
                      <input type="password" placeholder="••••••••"
                        value={password} onChange={(e) => setPassword(e.target.value)} className="lm-input" required />
                    </div>
                    <button type="submit" className="lm-submit">
                      <span>{lang === "hi" ? "खाता बनाएं" : "Create Account"}</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignupPhone} className="lm-form">
                    <div className="lm-field">
                      <label className="lm-label">{lang === "hi" ? "पूरा नाम" : "Full Name"}</label>
                      <input type="text" placeholder={lang === "hi" ? "आपका नाम" : "Your name"}
                        value={name} onChange={(e) => setName(e.target.value)} className="lm-input" required />
                    </div>
                    <div className="lm-field">
                      <label className="lm-label">{lang === "hi" ? "फ़ोन नंबर" : "Phone Number"}</label>
                      <input type="tel" placeholder={lang === "hi" ? "10 अंकों का नंबर" : "10-digit number"}
                        value={phone} onChange={(e) => setPhone(e.target.value)} className="lm-input" pattern="[0-9]{10}" required />
                    </div>
                    {!otpSent ? (
                      <button type="button" onClick={sendOtp} className="lm-submit">
                        <span>{lang === "hi" ? "OTP भेजें" : "Send OTP"}</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                      </button>
                    ) : (
                      <>
                        <div className="lm-field">
                          <label className="lm-label">{lang === "hi" ? "OTP कोड" : "OTP Code"}</label>
                          <input type="text" placeholder={lang === "hi" ? "6 अंकों का OTP" : "Enter 6-digit OTP"}
                            value={otp} onChange={(e) => setOtp(e.target.value)} className="lm-input lm-input-otp" />
                        </div>
                        <div className="lm-field">
                          <label className="lm-label">{lang === "hi" ? "पासवर्ड" : "Password"}</label>
                          <input type="password" placeholder="••••••••"
                            value={password} onChange={(e) => setPassword(e.target.value)} className="lm-input" required />
                        </div>
                        <button type="submit" className="lm-submit">
                          <span>{lang === "hi" ? "साइन अप करें" : "Sign Up"}</span>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </button>
                      </>
                    )}
                  </form>
                )}
                <p onClick={() => setIsSignup(false)} className="lm-switch">
                  {lang === "hi" ? "पहले से खाता है? " : "Already have an account? "}
                  <span className="lm-switch-link">{lang === "hi" ? "लॉगिन करें" : "Sign in"}</span>
                </p>
              </>
            )}
          </div>

          {/* Success overlay */}
          {success && (
            <div className="lm-success-overlay">
              <div className="lm-success-inner">
                <div className="lm-success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p className="lm-success-text">
                  {lang === "hi" ? "सफलतापूर्वक लॉगिन हुआ!" : "Successfully signed in!"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default LoginModal;
