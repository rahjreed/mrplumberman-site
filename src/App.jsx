import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Loader2,
  Star, 
  ShieldCheck,
  Wrench,
  Droplets,
  Package,
  Ticket,
  X,
  Minimize2,
  Send,
  XCircle,
  Quote,
  Truck,
  RefreshCcw,
  MapPin,
  Shield,
  Activity,
  Home as HomeIcon,
  Lock,
  Mail,
  Focus,
  BatteryCharging,
  Trophy,
  User,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

/**
 * MR. PLUMBER MAN NUTRITION - PRODUCTION SCHEMATIC
 * Fully Integrated: Stripe Checkout, Multi-Page Routing, and Premium Industrial UI.
 * Update: Added FAQ Accordion section.
 */

// --- GLOBAL STYLES FOR ANIMATIONS ---
const GlareStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes glare-sweep {
      0% { left: -100%; opacity: 0; }
      20% { opacity: 0.5; }
      50% { left: 150%; opacity: 0; }
      100% { left: 150%; opacity: 0; }
    }
    @keyframes ticker-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes phrase-entry {
      0% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .btn-glare-overlay {
      position: absolute;
      top: 0;
      height: 100%;
      width: 60px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      transform: skewX(-25deg);
      animation: glare-sweep 4s infinite ease-in-out;
      pointer-events: none;
    }
    .animate-ticker {
      display: flex;
      width: fit-content;
      animation: ticker-scroll 180s linear infinite;
    }
    .ticker-pause:hover .animate-ticker {
      animation-play-state: paused;
    }
    .animate-phrase {
      animation: phrase-entry 0.8s ease-out forwards;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `}} />
);

// --- DATA ---
const heroPhrases = [
  "Built to show up strong.",
  "No hesitation. No failure. No excuses.",
  "Dependable under pressure. Every time."
];

const faqData = [
  {
    q: "Is this only for older men?",
    a: "This formula was designed for adult men navigating natural aging, energy changes, and nighttime comfort. Many men start noticing these shifts in their 30s and 40s, not just later in life."
  },
  {
    q: "How long until I notice a difference?",
    a: "Every man’s routine is different. Some people report noticing changes within days, while others experience gradual support over a few weeks. Consistency matters more than speed."
  },
  {
    q: "Is this safe to take daily?",
    a: "This blend was created for daily routine use. As with any supplement, consult your healthcare provider before starting, especially if you have a medical condition or take medication."
  },
  {
    q: "Can I take this with other supplements?",
    a: "Many men combine supplements as part of their routine. If you are taking medication or have health concerns, it’s always best to check with a healthcare professional before adding anything new."
  },
  {
    q: "Do I need this if I already feel fine?",
    a: "Many men use supplements proactively to support long-term routine health and energy, not just to react to a problem."
  },
  {
    q: "Is this embarrassing to buy?",
    a: "Not at all — and your privacy matters. Orders ship in discreet packaging with no sensitive product details displayed."
  },
  {
    q: "Was this created by a real person or a big corporation?",
    a: "This formula was created by the founder after years of personal frustration trying to find consistent support. It was built from lived experience, not a marketing committee."
  },
  {
    q: "Who is this designed for?",
    a: "This blend was designed for adult men who want to support energy, confidence, sleep routines, and overall vitality as they age."
  },
  {
    q: "What makes this different from other supplements?",
    a: "This formula was developed from firsthand experience and built around a carefully balanced blend designed for consistency. The goal wasn’t hype — it was creating something dependable enough for the founder to use every day."
  }
];

// --- COMPONENTS ---

const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>{children}</div>;
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {faqData.map((item, idx) => (
        <div 
          key={idx} 
          className={`border-2 transition-all duration-300 rounded-sm overflow-hidden ${
            openIndex === idx 
            ? "bg-[#2a1b15] border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.05)]" 
            : "bg-[#2a1b15]/40 border-[#c58158]/20 hover:border-[#c58158]/40"
          }`}
        >
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between p-6 text-left transition-colors"
          >
            <span className={`text-sm lg:text-base font-black uppercase tracking-widest italic ${openIndex === idx ? "text-[#d4af37]" : "text-white"}`}>
              {item.q}
            </span>
            <div className={`shrink-0 transition-transform duration-300 ${openIndex === idx ? "rotate-180 text-[#d4af37]" : "text-[#c58158]"}`}>
              <ChevronDown size={20} />
            </div>
          </button>
          <div 
            className={`transition-all duration-300 ease-in-out ${
              openIndex === idx ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-6 pt-2 border-t border-[#c58158]/10">
              <p className="text-[#f4e4bc]/80 text-sm lg:text-base font-bold italic leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DiscountPopup = ({ isOpen, onClose, onUnlock }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onUnlock(); 
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-[#1a0f0a]/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-[420px] bg-[#2a1b15] border-2 border-[#c58158] rounded-[40px] shadow-2xl overflow-hidden p-8 sm:p-12 text-center animate-in zoom-in-95 duration-500">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#c58158] hover:text-[#d4af37] transition-colors p-1 z-20">
          <X size={24} />
        </button>

        {isSubmitted ? (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-full flex items-center justify-center text-[#d4af37]">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight">SYSTEM CLEAR</h2>
            <p className="text-[#f4e4bc]/60 font-bold uppercase tracking-widest text-xs italic">Your parts discount is unlocked:</p>
            <div className="bg-[#1a0f0a] border-2 border-dashed border-[#c58158] p-6 rounded-2xl w-full text-center">
              <p className="text-4xl font-black text-white italic tracking-widest uppercase">Plumber20</p>
            </div>
            <button 
              onClick={onClose} 
              className="relative group overflow-hidden w-full bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:brightness-110 transition-all italic"
            >
              <span className="relative z-10">Back to Depot</span>
              <div className="btn-glare-overlay" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-10 w-auto mb-8 grayscale brightness-125" alt="Logo" />
            <div className="space-y-2 mb-8 text-center">
              <p className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs">For a Limited-Time Only</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-none uppercase italic">
                Enjoy 20% Off <br /> <span className="text-[#d4af37]">Your Purchase!</span>
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-4 mb-6">
              <div className="space-y-3">
                <input className="w-full bg-white border-2 border-[#c58158]/30 px-6 py-4 rounded-full text-sm font-bold text-[#1a0f0a] placeholder-[#1a0f0a]/40 focus:outline-none focus:border-[#d4af37]" placeholder="Enter your first name" type="text" required />
                <input className="w-full bg-white border-2 border-[#c58158]/30 px-6 py-4 rounded-full text-sm font-bold text-[#1a0f0a] placeholder-[#1a0f0a]/40 focus:outline-none focus:border-[#d4af37]" placeholder="Enter your email address" required type="email" />
              </div>
              <button type="submit" className="group relative w-full overflow-hidden bg-gradient-to-b from-[#1a0f0a] to-black text-white border border-[#c58158]/40 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:brightness-125 shadow-lg transition-all italic">
                <span className="relative z-10">SIGN UP FOR 20% OFF</span>
                <div className="btn-glare-overlay" />
              </button>
            </form>
            <button onClick={onClose} className="text-[#f4e4bc]/60 font-black uppercase tracking-widest text-[10px] sm:text-xs hover:text-[#d4af37] transition-colors mb-6">No, thanks</button>
            <p className="text-[9px] text-[#f4e4bc]/30 uppercase tracking-tighter leading-tight max-w-[280px]">
              *By entering your email, you agree to receive dispatch updates and marketing intel from Mr. Plumber Man. Opt-out anytime in your control panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const DiscountBadge = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('PLUMBER20').then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = "PLUMBER20";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {}
      document.body.removeChild(textArea);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="fixed bottom-6 right-6 z-[150] bg-[#1a0f0a] border-2 border-[#d4af37] rounded-full px-5 py-3 flex items-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all animate-in slide-in-from-bottom-10"
    >
      <Ticket className="w-4 h-4 text-[#d4af37]" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white italic">
        {copied ? "COPIED!" : "PLUMBER20 ACTIVE — 20% OFF"}
      </span>
    </button>
  );
};

// --- PAGES ---

const HomeView = ({ navigate, isPurchasing, handlePurchase, onUnlockDiscount }) => {
  const [showPopup, setShowPopup] = useState(false);
  const depotRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('mp_pop_v6');
    if (hasShown) return;

    let scrollTimer = null;
    const handleFirstScroll = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          setShowPopup(true);
          sessionStorage.setItem('mp_pop_v6', 't');
          window.removeEventListener('scroll', handleFirstScroll);
        }, 3000); 
      }
    };

    window.addEventListener('scroll', handleFirstScroll);
    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  const tickerContent = (
    <div className="flex items-center gap-12 sm:gap-24 px-6 sm:px-12">
      <div className="flex items-center gap-3"><MapPin size={16} className="text-[#c58158]" /><span className="text-[#f4e4bc] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Recently purchased by customers across the U.S.</span></div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3"><Shield size={16} className="text-[#d4af37]" /><span className="text-[#d4af37] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">System Flow Secured Nationwide</span></div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3"><Wrench size={16} className="text-[#c58158]" /><span className="text-[#f4e4bc] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Become a pipe master.</span></div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[80] p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-[#2a1b15]/95 backdrop-blur-md border border-[#c58158]/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-2xl">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Wrench size={18} className="text-[#c58158]" />
            <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-6 sm:h-7 w-auto object-contain" alt="Logo" />
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={() => scrollTo(benefitsRef)} className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-[#f4e4bc] hover:text-[#d4af37] transition">Specs</button>
            <button onClick={() => scrollTo(depotRef)} className="relative overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:brightness-110 transition italic group">
               <span className="relative z-10">Supply Depot</span>
               <div className="btn-glare-overlay" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center px-6 pt-20 lg:pt-36 pb-6 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-transparent to-[#1a0f0a] z-10" />
        
        <div className="max-w-7xl mx-auto relative z-20 w-full grid lg:grid-cols-2 gap-0 lg:gap-24 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start order-1">
            <ScrollReveal>
              <div className="mb-2 lg:mb-10 hidden lg:block">
                <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-10 lg:h-32 w-auto object-contain mx-auto lg:mx-0" alt="Logo" />
              </div>

              <div className="inline-flex items-center space-x-3 px-4 lg:px-6 py-1 lg:py-1.5 mb-2 lg:mb-6 text-[10px] font-black uppercase tracking-[0.45em] text-[#d4af37] border-y border-[#c58158]/30 italic mx-auto lg:mx-0">
                <span>INDUSTRIAL-GRADE VITALITY</span>
              </div>

              <h1 className="text-[10.5vw] lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight mb-1 lg:mb-6 leading-[0.85] uppercase italic text-white drop-shadow-2xl">
                <span className="whitespace-nowrap">READY WHEN</span> <br /> 
                <span className="text-[#d4af37] whitespace-nowrap">IT COUNTS.</span>
              </h1>

              <div className="min-h-[24px] lg:min-h-[80px] mb-6 lg:mb-10 flex items-center justify-center lg:justify-start overflow-hidden text-[4.2vw] lg:text-3xl text-white font-bold italic tracking-wide">
                <p className="animate-phrase whitespace-nowrap">Under Pressure. Every Time.</p>
              </div>

              <div className="w-full flex justify-center lg:justify-start">
                <button 
                  onClick={() => scrollTo(depotRef)} 
                  className="relative group overflow-hidden bg-gradient-to-b from-[#d4af37] via-[#c58158] to-[#8c5a3d] text-[#1a0f0a] px-8 py-4 lg:py-6 font-black uppercase tracking-[0.15em] shadow-[0_8px_0_#3d291f,inset_0_1px_2px_rgba(255,255,255,0.6)] rounded-lg hover:translate-y-[2px] transition-all inline-flex items-center justify-center gap-4 italic text-base sm:text-lg w-full max-w-[340px] lg:max-w-none"
                >
                  <span className="relative z-10 leading-none">TURN THE PRESSURE UP</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform shrink-0" />
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/25 blur-[1px] rounded-t-lg" />
                  <div className="btn-glare-overlay" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative group lg:mt-0 flex justify-center lg:justify-end order-2 pt-2 lg:pt-0">
            <ScrollReveal>
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[600px] xl:max-w-[700px] transition-transform duration-700 hover:scale-105">
                <div className="absolute inset-0 bg-[#d4af37]/10 blur-[80px] rounded-full scale-75 animate-pulse" />
                <div className="relative overflow-visible">
                  <img src="https://images.travelprox.com/mrplumberman/hero.png" alt="Full Lineup" className="w-full h-auto object-contain block relative z-10" />
                  <div className="absolute -bottom-2 lg:bottom-4 right-0 lg:right-4 bg-[#1a0f0a] border border-[#d4af37]/40 px-4 py-2 lg:px-6 lg:py-3 rounded-sm shadow-2xl z-30 backdrop-blur-md flex flex-col gap-1">
                    <p className="text-[#d4af37] font-black uppercase tracking-[0.2em] text-[10px] lg:text-xs italic">Plumber Lineup</p>
                    <div className="h-0.5 w-8 bg-[#c58158]/50" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="w-full bg-[#140b08] border-y border-[#c58158]/30 py-4 relative overflow-hidden ticker-pause"><div className="animate-ticker">{tickerContent}{tickerContent}{tickerContent}{tickerContent}</div></div>

      {/* Diagnostics */}
      <section className="px-6 py-24 bg-[#1a0f0a] border-b border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-16 space-y-4">
              <h2 className="text-[#c58158] font-black uppercase tracking-[0.6em] text-[10px] underline underline-offset-8">Industrial Diagnostics</h2>
              <h1 className="text-[9.5vw] lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none uppercase italic text-center">SYSTEM <span className="text-[#d4af37]">TROUBLE SHOOTING</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "LEAK DETECTED", icon: <Droplets />, fix: "PRESSURE", action: "Clear the pipes with standardized Saw Palmetto." },
                { title: "LOW TORQUE", icon: <Zap />, fix: "PRIME TIME", action: "Restore torque with high-absorption Glycinate specs." },
                { title: "TOTAL OVERHAUL", icon: <Activity />, fix: "OVERHAUL COMBO", action: "Factory reset your entire system performance." }
              ].map((d, i) => (
                <div key={i} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 flex flex-col hover:border-[#d4af37] transition duration-500 rounded-sm shadow-2xl group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
                  <div className="flex items-center gap-5 mb-8 relative z-10"><div className="w-14 h-14 bg-[#1a0f0a] border border-[#c58158]/40 rounded-lg flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">{d.icon}</div><h3 className="text-2xl font-black uppercase italic tracking-tight text-white leading-tight">{d.title}</h3></div>
                  <div className="pt-8 border-t border-[#c58158]/10 relative z-10"><p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-black mb-2">Recommended Part:</p><p className="text-3xl font-black text-white italic uppercase tracking-tight mb-4">{d.fix}</p><p className="text-xs font-bold text-[#f4e4bc]/50 italic leading-relaxed uppercase">{d.action}</p></div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Teardown Section */}
      <section className="px-8 py-24 bg-[#1a0f0a]">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-[#c58158] mb-6">Blueprint Analysis</h2>
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase leading-none italic text-white mb-8">SYSTEM <span className="text-[#d4af37]">TEARDOWN.</span></h1>
              <p className="text-lg lg:text-2xl text-[#f4e4bc]/50 font-bold max-w-3xl italic uppercase tracking-widest mx-auto">Engineering always wins over advertising.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div className="bg-[#2a1b15]/40 p-10 lg:p-16 border-2 border-[#c58158]/10 relative z-10 shadow-lg group grayscale opacity-80 hover:opacity-100 transition-all">
                <div className="absolute top-6 left-6 text-[9px] uppercase tracking-widest text-[#c58158]/60">Mass Market Formula</div>
                <h4 className="text-xl lg:text-2xl font-black text-[#c58158] mb-12 flex items-center uppercase italic tracking-[0.2em]"><XCircle className="w-6 h-6 mr-3 text-red-900" /> NUGENIX TOTAL-T</h4>
                <div className="space-y-6">
                  {[{ l: "Price Comparison", v: "$79+ (Retail Bloat)" }, { l: "Magnesium Form", v: "Oxide (Gastro Filler)" }, { l: "Zinc Form", v: "Oxide (Low Absorption)" }, { l: "Tongkat Ali", v: "50mg Raw Root Powder" }, { l: "Saw Palmetto", v: "50mg Raw Berries" }, { l: "Extract Type", v: "Non-Standardized" }].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/10 pb-4"><p className="text-[10px] text-[#c58158]/60 uppercase font-black tracking-widest">{row.l}</p><p className="text-xs text-[#f4e4bc]/40 font-bold uppercase">{row.v}</p></div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1a0f0a] p-10 lg:p-16 border-[3px] border-[#c58158] shadow-[0_0_100px_rgba(197,129,88,0.15)] z-20">
                <h4 className="text-xl lg:text-2xl font-black text-white mb-12 flex items-center uppercase italic tracking-[0.2em]"><ShieldCheck className="w-6 h-6 mr-3 text-[#d4af37]" /> PRIME TIME</h4>
                <div className="space-y-6">
                  {[{ l: "Price Comparison", v: "$59 (Direct Value)" }, { l: "Magnesium Form", v: "Glycinate (High Torque)" }, { l: "Zinc Form", v: "Picolinate (Bioavailable)" }, { l: "Tongkat Ali", v: "200mg Standardized" }, { l: "Saw Palmetto", v: "100mg Standardized" }, { l: "Extract Type", v: "Potency Guaranteed" }].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/20 pb-4"><p className="text-[10px] text-[#d4af37] uppercase font-black tracking-widest">{row.l}</p><p className="text-sm text-white font-black uppercase">{row.v}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Compliant Benefits Section */}
      <section ref={benefitsRef} className="px-6 py-24 bg-[#140b08] border-y border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-[10px] underline underline-offset-8">Blueprint Performance</h2>
              <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-white leading-none uppercase italic">BUILT TO SUPPORT THE THINGS <span className="text-[#d4af37]">MEN NOTICE FIRST</span></h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6 lg:space-y-12">
                <div className="bg-[#2a1b15]/30 border-l-4 border-[#d4af37] p-6 lg:p-10 shadow-xl rounded-sm">
                  <div className="flex items-center gap-6 mb-4 text-[#d4af37]">
                    <BatteryCharging size={32} strokeWidth={2.5} />
                    <h3 className="text-2xl lg:text-3xl font-black uppercase italic tracking-tight text-white leading-none">Sleep affects energy.</h3>
                  </div>
                  <div className="flex items-center gap-6 mb-4 text-[#c58158]">
                    <Zap size={32} strokeWidth={2.5} />
                    <h3 className="text-2xl lg:text-3xl font-black uppercase italic tracking-tight text-white leading-none">Energy affects confidence.</h3>
                  </div>
                  <div className="flex items-center gap-6 text-white">
                    <Trophy size={32} strokeWidth={2.5} />
                    <h3 className="text-2xl lg:text-3xl font-black uppercase italic tracking-tight text-[#d4af37] leading-none underline decoration-[#d4af37]/30 underline-offset-8">Confidence affects everything.</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[#f4e4bc] text-lg lg:text-xl font-bold italic leading-relaxed">
                    This formula was designed to support the everyday concerns men quietly deal with — nighttime interruptions, stamina, recovery, and overall vitality. When your routine feels steady, your day feels easier.
                  </p>
                  <p className="text-[#c58158] font-black uppercase tracking-[0.2em] text-xs italic">
                    No hype. No miracle promises. Just a blend created to support how men want to feel.
                  </p>
                </div>
              </div>

              <div className="bg-[#1a0f0a] border-2 border-[#c58158]/20 p-8 lg:p-12 relative rounded-sm shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
                <h4 className="text-xl lg:text-2xl font-black text-white mb-8 uppercase italic tracking-widest relative z-10 border-b border-[#c58158]/20 pb-4">Why Men Add This To Routine</h4>
                <p className="text-[#f4e4bc]/60 font-bold uppercase text-[10px] tracking-[0.3em] mb-8 relative z-10">Systems Status Report:</p>
                <ul className="space-y-6 relative z-10">
                  {['restless sleep', 'inconsistent energy', 'performance confidence', 'aging-related changes', 'daily stamina'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 group/item">
                      <div className="w-6 h-6 border border-[#d4af37]/40 rounded-sm flex items-center justify-center bg-[#d4af37]/5 group-hover/item:bg-[#d4af37]/20 transition-all">
                        <CheckCircle2 size={14} className="text-[#d4af37]" />
                      </div>
                      <span className="text-lg font-black uppercase tracking-widest text-[#f4e4bc] italic group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t border-[#c58158]/10 text-center relative z-10">
                  <p className="text-[#d4af37] font-black uppercase italic tracking-[0.15em] leading-relaxed">
                    Support your routine. Support your rest. <br /> Support how you show up every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Founder Review Section */}
      <section className="px-6 py-24 bg-[#1a0f0a] border-t border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#2a1b15]/40 border-2 border-[#d4af37]/20 p-8 lg:p-16 rounded-sm shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Quote size={120} className="text-[#d4af37]" />
               </div>
               
               <div className="relative z-10 space-y-8">
                 <div className="flex flex-col items-center lg:items-start space-y-2">
                    <h2 className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-xs italic">Founder Field Note</h2>
                    <h3 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter text-white">THE STORY BEHIND <br/><span className="text-[#c58158]">THE SPEC.</span></h3>
                 </div>

                 <div className="space-y-6 text-[#f4e4bc]/90 font-serif text-lg lg:text-xl leading-relaxed italic">
                    <p>I’m 42 years old, and I dealt with frequent nighttime bathroom trips for about 15 years. It started when I was 27 and slowly became part of my life — but it wasn’t harmless. Waking up 3 or 4 times a night wrecks your sleep, and bad sleep follows you into everything. My job felt harder. My energy was lower. Even my outlook during the day changed because I was constantly running tired.</p>
                    <p>I went looking for answers. I saw a urologist. I talked to my general doctor. Nobody could tell me why it was happening. That was frustrating — not having clarity and still living with the problem.</p>
                    <p>And it wasn’t just sleep. It started affecting my confidence and my sex life too. There were times I’d have to stop in the middle just to use the bathroom. That’s not something men like to admit, but it’s real — and it’s embarrassing when it happens.</p>
                    <p className="border-l-4 border-[#d4af37] pl-6 py-2 text-white font-bold bg-[#d4af37]/5">What made it more serious for me is my family history. Both my father and grandfather had prostate cancer, so ignoring it never felt like an option.</p>
                    <p>Years ago I tried a saw palmetto supplement and after about two weeks I noticed a big improvement. The nighttime trips almost stopped. But when I ran out and bought the same product again, it never worked the same. I tried brand after brand — droppers, gummies, pills — and nothing gave consistent results. It felt like I was gambling every time I tried something new, hoping this one would finally stick.</p>
                    <p>That frustration pushed me to partner with a lab and create my own formula. I wanted something I could trust because I was tired of chasing solutions.</p>
                    <p className="text-[#d4af37] font-bold">Within 3 days of taking my blend, my nighttime trips dropped to once — sometimes none. For the first time in years I could sleep through the night without anxiety about it. And when your sleep improves, everything improves. My energy during the day felt steadier, and I felt more like myself again.</p>
                    <p>That experience changed how I look at men’s health in general. I realized how many issues men quietly deal with — sleep, performance, confidence, sexual health — and how rarely we talk about them honestly. So I worked on creating complementary blends that support other areas men care about but don’t always feel comfortable discussing. My goal isn’t hype. It’s giving men options I wish I had years ago.</p>
                    <p>I built these products because I needed them myself. I use them daily, and I stand behind them because I lived the problem they’re designed to support.</p>
                 </div>

                 <div className="pt-10 border-t border-[#c58158]/20 flex flex-col items-center lg:items-start">
                    <p className="text-2xl font-black text-white italic tracking-widest">— Rahj, Founder</p>
                    <p className="text-[10px] text-[#c58158] uppercase font-black tracking-[0.3em] mt-1">Mr. Plumber Man Nutrition</p>
                 </div>
               </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ Section - NEW */}
      <section className="px-6 py-24 bg-[#140b08] border-y border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-[10px] underline underline-offset-8">Support Intel</h2>
              <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-white leading-none uppercase italic">FREQUENTLY ASKED <span className="text-[#d4af37]">QUESTIONS</span></h1>
            </div>
            
            <FAQAccordion />
            
            <div className="mt-16 text-center">
              <p className="text-[#f4e4bc]/40 font-bold uppercase tracking-widest text-[10px] italic">
                Have more technical questions? Reach out to <span className="text-white">hello@mrplumberman.com</span>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Shop Guarantee */}
      <section className="bg-[#1a0f0a] py-16 sm:py-32 relative overflow-hidden text-center px-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto relative z-10">
             <div className="w-20 h-20 bg-[#c58158]/10 border-2 border-[#c58158] rounded-full flex items-center justify-center mx-auto mb-10 text-[#c58158]">
               <Package size={40} className="animate-bounce" /> 
             </div>
             <h3 className="text-3xl sm:text-6xl lg:text-8xl font-black tracking-tight uppercase mb-12 leading-none italic text-white text-center">THE SHOP <span className="text-[#d4af37]">GUARANTEE</span>.</h3>
             <p className="text-lg sm:text-3xl text-[#f4e4bc]/60 font-bold max-w-3xl mx-auto leading-relaxed italic uppercase tracking-widest mb-16">If you change your mind on a kit, we'll take it back. Full refund on unopened product within 30 days. No clogs in the process.</p>
             <div className="flex justify-center">
              <button onClick={() => scrollTo(depotRef)} className="relative overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-14 py-6 font-black uppercase tracking-widest text-sm shadow-[0_10px_0_#3d291f,inset_0_1px_1px_rgba(255,255,255,0.4)] rounded-lg hover:translate-y-[2px] transition-all italic text-center">
                  <span className="relative z-10">Visit The Supply Depot</span>
                  <div className="btn-glare-overlay" />
              </button>
             </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Supply Depot */}
      <section ref={depotRef} className="px-6 py-32 bg-[#140b08]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-24 text-center space-y-6">
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none uppercase italic">THE <span className="text-[#d4af37]">SUPPLY</span> DEPOT</h1>
              <div className="flex items-center gap-3 justify-center text-[#d4af37] animate-pulse"><Truck size={24} /><span className="text-sm font-black uppercase tracking-[0.5em]">Free express shipping on all kits</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  id: 'p', name: "PRESSURE", sub: "Prostate Support", price: 39, 
                  img: "https://images.travelprox.com/mrplumberman/pressure.png", 
                  benefits: [
                    "Fewer nighttime disruptions, better mornings",
                    "Wake up feeling more rested",
                    "Built for long-term routine support"
                  ],
                  priceId: 'price_1SwvOSKFN6WMOhlF5xerUfID', subPriceId: 'price_1SwvhCKFN6WMOhlFqFQiSYH6'
                },
                { 
                  id: 't', name: "PRIME TIME", sub: "T-Formula", price: 59, 
                  img: "https://images.travelprox.com/mrplumberman/primeheat.png", 
                  benefits: [
                    "Support stamina and performance confidence",
                    "Feel steady energy throughout the day",
                    "Designed for real men with real schedules"
                  ],
                  priceId: 'price_1SwvR8KFN6WMOhlFXD9hxqXi', subPriceId: 'price_1SwvkOKFN6WMOhlFRkxiPaPq'
                },
                { 
                  id: 'c', name: "THE OVERHAUL", sub: "Combo Pack", price: 97, 
                  img: "https://images.travelprox.com/mrplumberman/symbol.png", 
                  benefits: [
                    "Complete energy and rest overhaul",
                    "Maximum performance confidence kit",
                    "Full long-term routine maintenance"
                  ],
                  tag: "Best Value",
                  priceId: 'price_1SwvX4KFN6WMOhlFXU8Bs0lt', subPriceId: 'price_1SwvmEKFN6WMOhlFzNkPcl3U'
                }
              ].map(p => (
                <div key={p.id} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 hover:border-[#d4af37] transition duration-500 flex flex-col items-center group relative rounded-sm shadow-2xl">
                  {p.tag && (<div className="absolute top-4 left-[-30px] bg-[#d4af37] text-[#1a0f0a] px-10 py-1 text-[8px] font-black uppercase tracking-widest -rotate-45 shadow-lg z-20">{p.tag}</div>)}
                  <div className="w-full aspect-square bg-[#1a0f0a] border border-[#c58158]/20 mb-8 flex items-center justify-center relative overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase mb-2 leading-none italic">{p.name}</h3>
                  <p className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-6">{p.sub}</p>
                  
                  <ul className="w-full space-y-3 mb-10 border-t border-[#c58158]/10 pt-6">
                    {p.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <CheckCircle2 size={12} className="text-[#d4af37] mt-0.5 shrink-0" />
                        <span className="text-[11px] text-[#f4e4bc] font-bold uppercase tracking-widest leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto w-full space-y-6 pt-8 border-t border-[#c58158]/20">
                    <div className="text-center">
                      <p className="text-4xl font-black italic text-white mb-1">${p.price}</p>
                      <span className="text-[10px] text-[#c58158] font-black uppercase tracking-widest">Free Express Shipping</span>
                    </div>
                    
                    <button onClick={() => handlePurchase(p.priceId, p.id, "payment")} disabled={isPurchasing === p.id} className="relative w-full overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] py-4 font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-[0_8px_0_#3d291f,inset_0_1px_1px_rgba(255,255,255,0.4)] active:translate-y-[8px] transition-all flex items-center justify-center gap-3">
                      <span className="relative z-10 flex items-center gap-3">
                        {isPurchasing === p.id ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
                        {isPurchasing === p.id ? 'Processing...' : 'Add To Kit'}
                      </span>
                      <div className="btn-glare-overlay" />
                    </button>

                    <button onClick={() => handlePurchase(p.subPriceId, p.id + '_sub', "subscription")} disabled={isPurchasing === p.id + '_sub'} className="relative w-full border border-[#c58158]/40 bg-transparent text-[#d4af37] py-2 font-black uppercase tracking-[0.3em] text-[9px] hover:bg-[#c58158]/10 transition-all italic flex items-center justify-center gap-2 overflow-hidden text-center">
                      <span className="relative z-10 flex items-center gap-2">{isPurchasing === p.id + '_sub' ? <Loader2 size={12} className="animate-spin" /> : <RefreshCcw size={12} />} Subscribe & Save 10%</span>
                      <div className="btn-glare-overlay opacity-30" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0a08] py-16 px-6 lg:px-10 border-t border-[#c58158]/10 text-center flex flex-col items-center">
        <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-10 w-auto mb-8 opacity-40 grayscale" alt="Logo" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-[#c58158]/60">
            <Lock size={14} className="text-[#d4af37]" />
            <span className="text-[10px] font-black uppercase tracking-widest italic">Secure Encrypted Checkout</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-[#c58158]/20"></div>
          <div className="flex items-center gap-2 text-[#c58158]/60">
            <Mail size={14} className="text-[#d4af37]" />
            <span className="text-[10px] font-black uppercase tracking-widest italic font-sans text-white/90">hello@mrplumberman.com</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-10 p-6 border border-[#c58158]/20 rounded-sm bg-[#1a0f0a]/50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#c58158]/80 leading-relaxed italic font-sans text-center">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a physician before use, especially if you have a medical condition or are taking medication.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
          <a href="/privacy" className="text-[11px] font-black text-[#c58158]/80 hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors italic">Privacy Policy</a>
          <a href="/terms" className="text-[11px] font-black text-[#c58158]/80 hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors italic">Terms of Service</a>
          <a href="/shipping" className="text-[11px] font-black text-[#c58158]/80 hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors italic">Shipping Info</a>
        </div>

        <p className="text-[9px] text-[#c58158]/20 tracking-widest uppercase mb-4 italic">© 2024 MR. PLUMBER MAN NUTRITION. ALL SYSTEMS SECURED.</p>
        
        <div className="mt-4">
          <a href="https://callistadigital.com" target="_blank" rel="noopener noreferrer" className="text-[8px] text-[#c58158]/15 hover:text-[#d4af37]/30 transition-colors uppercase tracking-[0.3em] font-black italic">
            Website Design by Callista Digital
          </a>
        </div>
      </footer>

      <DiscountPopup isOpen={showPopup} onClose={() => setShowPopup(false)} onUnlock={() => onUnlockDiscount()} />
    </>
  );
};

const ThankYouView = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center px-6 relative overflow-hidden text-center">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
      <div className="max-w-2xl w-full relative z-10 text-center space-y-10 animate-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-gradient-to-b from-[#d4af37] to-[#c58158] rounded-full mx-auto flex items-center justify-center text-[#1a0f0a] shadow-[0_0_50px_rgba(197,129,88,0.3),inset_0_2px_4px_rgba(255,255,255,0.6)]">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">ORDER <span className="text-[#d4af37]">RECEIVED</span></h1>
          <p className="text-xl text-[#f4e4bc]/60 font-bold uppercase tracking-widest italic">Pipes are clearing. Your haul is being dispatched.</p>
        </div>
        <div className="p-8 bg-[#2a1b15]/40 border-2 border-[#c58158]/20 rounded-lg">
          <p className="text-[10px] text-[#c58158] font-black uppercase tracking-[0.4em] mb-4">Tracking ID: PM-{(Math.random() * 100000).toFixed(0)}</p>
          <div className="flex items-center justify-center gap-3 text-[#f4e4bc] font-bold italic">
            <Truck className="text-[#d4af37]" />
            <span>Estimated Install: 3-5 Business Days</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('home')} 
            className="relative group overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-12 py-5 font-black uppercase tracking-widest shadow-[0_8px_0_#3d291f,inset_0_1px_2px_rgba(255,255,255,0.6)] rounded-lg hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 italic text-center"
          >
            <span className="relative z-10 flex items-center gap-3"><HomeIcon size={20} /> RETURN TO DEPOT</span>
            <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/20 blur-[1px] rounded-t-lg" />
            <div className="btn-glare-overlay" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP ENTRY ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPurchasing, setIsPurchasing] = useState(null);
  const [discountUnlocked, setDiscountUnlocked] = useState(false);

  // HANDLE STRIPE PRODUCTION PURCHASE
  const handlePurchase = async (priceId, productId, type) => {
    setIsPurchasing(productId);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode: type })
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setIsPurchasing(null);
      alert("Checkout link missing. Stripe session failed.");
    } catch (e) {
      setIsPurchasing(null);
      alert("Checkout error. Try again.");
    }
  };

  const navigate = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#1a0f0a] text-[#f4e4bc] font-serif relative overflow-x-hidden min-h-screen selection:bg-[#d4af37] selection:text-[#1a0f0a]">
      <GlareStyles />
      {currentPage === 'thank-you' ? (
        <ThankYouView navigate={navigate} />
      ) : (
        <HomeView 
          navigate={navigate} 
          isPurchasing={isPurchasing} 
          handlePurchase={handlePurchase} 
          onUnlockDiscount={() => setDiscountUnlocked(true)}
        />
      )}
      
      {discountUnlocked && <DiscountBadge />}
    </div>
  );
};

export default App;
