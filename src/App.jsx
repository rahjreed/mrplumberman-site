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
  BatteryCharging, 
  Trophy, 
  ChevronDown,
  MailCheck,
  ClipboardCheck,
  Clock,
  Settings,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  Eye
} from 'lucide-react';

/**
 * MR. PLUMBER MAN NUTRITION - PRODUCTION SCHEMATIC
 * Fully Integrated: Stripe Checkout, URL Routing, and Premium Industrial UI.
 * Update: Expanded Product Imagery with primetime2 and pressure2 visuals.
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
    @keyframes soft-pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
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
    .animate-soft-pulse {
      animation: soft-pulse 3s infinite ease-in-out;
    }
    .animate-spin-slow {
      animation: spin 6s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `}} />
);

// --- DATA ---
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
  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitted(true); onUnlock(); };
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-[#1a0f0a]/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-[420px] bg-[#2a1b15] border-2 border-[#c58158] rounded-[40px] shadow-2xl overflow-hidden p-8 sm:p-12 text-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#c58158] hover:text-[#d4af37] transition-colors p-1 z-20">
          <X size={24} />
        </button>
        {isSubmitted ? (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-full flex items-center justify-center text-[#d4af37]">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight">SYSTEM CLEAR</h2>
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
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-none uppercase italic mb-8">
              Enjoy 20% Off <br /> <span className="text-[#d4af37]">Your Purchase!</span>
            </h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4 mb-6">
              <input className="w-full bg-white border-2 border-[#c58158]/30 px-6 py-4 rounded-full text-sm font-bold text-[#1a0f0a] placeholder-[#1a0f0a]/40 focus:outline-none" placeholder="First Name" type="text" required />
              <input className="w-full bg-white border-2 border-[#c58158]/30 px-6 py-4 rounded-full text-sm font-bold text-[#1a0f0a] placeholder-[#1a0f0a]/40 focus:outline-none" placeholder="Email Address" required type="email" />
              <button type="submit" className="group relative w-full overflow-hidden bg-gradient-to-b from-[#1a0f0a] to-black text-white border border-[#c58158]/40 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:brightness-125 shadow-lg transition-all italic">
                <span className="relative z-10">SIGN UP FOR 20% OFF</span>
                <div className="btn-glare-overlay" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const DiscountBadge = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const code = "PLUMBER20";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = code; document.body.appendChild(textArea); textArea.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (err) {}
      document.body.removeChild(textArea);
    }
  };
  return (
    <button 
      onClick={handleCopy}
      className="fixed bottom-6 right-6 z-[150] bg-[#1a0f0a] border-2 border-[#d4af37] rounded-full px-5 py-3 flex items-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95 transition-all animate-in slide-in-from-bottom-10"
    >
      <Ticket className="w-4 h-4 text-[#d4af37]" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white italic">{copied ? "COPIED!" : "PLUMBER20 ACTIVE — 20% OFF"}</span>
    </button>
  );
};

// --- LIGHTBOX COMPONENT ---
const LightboxModal = ({ isOpen, images, initialIdx, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(initialIdx);

  useEffect(() => {
    setActiveIdx(initialIdx);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, initialIdx]);

  if (!isOpen) return null;

  const handlePrev = (e) => { e.stopPropagation(); setActiveIdx((prev) => (prev - 1 + images.length) % images.length); };
  const handleNext = (e) => { e.stopPropagation(); setActiveIdx((prev) => (prev + 1) % images.length); };

  return (
    <div className="fixed inset-0 z-[500] bg-[#1a0f0a]/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300" onClick={onClose}>
      <button onClick={onClose} className="absolute top-8 right-8 text-[#f4e4bc]/40 hover:text-[#d4af37] transition-colors p-2 z-[510]">
        <X size={40} strokeWidth={1.5} />
      </button>

      <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center gap-8" onClick={e => e.stopPropagation()}>
         <div className="relative w-full h-[70vh] flex items-center justify-center">
            {images.map((img, i) => (
              <img 
                key={i}
                src={img}
                alt="Specification View"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-out ${activeIdx === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
              />
            ))}

            {images.length > 1 && (
              <>
                <button onClick={handlePrev} className="absolute left-0 lg:left-[-60px] top-1/2 -translate-y-1/2 text-[#d4af37] p-4 hover:scale-110 transition-transform bg-[#1a0f0a]/40 rounded-full border border-[#c58158]/20">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={handleNext} className="absolute right-0 lg:right-[-60px] top-1/2 -translate-y-1/2 text-[#d4af37] p-4 hover:scale-110 transition-transform bg-[#1a0f0a]/40 rounded-full border border-[#c58158]/20">
                  <ChevronRight size={32} />
                </button>
              </>
            )}
         </div>

         <div className="text-center space-y-4">
            <p className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-xs italic">
               System Technical Documentation
            </p>
            <div className="flex gap-3 justify-center">
              {images.map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIdx === i ? 'bg-[#d4af37] w-8' : 'bg-white/10'}`}
                />
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, isPurchasing, handlePurchase, onOpenLightbox }) => {
  return (
    <div className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 hover:border-[#d4af37] transition duration-500 flex flex-col items-center group relative rounded-sm shadow-2xl">
      {product.tag && (
        <div className="absolute top-4 left-[-30px] bg-[#d4af37] text-[#1a0f0a] px-10 py-1 text-[8px] font-black uppercase -rotate-45 z-20">
          {product.tag}
        </div>
      )}
      
      <div 
        onClick={() => onOpenLightbox(product.images, 0)}
        className="w-full aspect-square bg-[#1a0f0a] border border-[#c58158]/20 mb-8 flex items-center justify-center relative overflow-hidden cursor-pointer group/img"
      >
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-700 group-hover/img:scale-110"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
           <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#1a0f0a] flex items-center justify-center shadow-2xl">
              <Minimize2 size={24} className="rotate-45" />
           </div>
           <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">Inspect Field Intel</p>
        </div>

        <div className="absolute bottom-4 right-4 text-[#c58158] opacity-60">
           <ZoomIn size={18} />
        </div>
      </div>

      <h3 className="text-3xl font-black text-white uppercase mb-2 italic">{product.name}</h3>
      <p className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-6">{product.sub}</p>
      
      <ul className="w-full space-y-3 mb-10 border-t border-[#c58158]/10 pt-6">
        {product.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 size={12} className="text-[#d4af37] mt-0.5 shrink-0" />
            <span className="text-[11px] text-[#f4e4bc] font-bold uppercase tracking-widest leading-snug">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto w-full space-y-6 pt-8 border-t border-[#c58158]/20">
        <div className="text-center">
          <p className="text-4xl font-black italic text-white mb-1">${product.price}</p>
          <span className="text-[10px] text-[#c58158] font-black uppercase tracking-widest">Free Express Shipping</span>
        </div>
        
        <button 
          onClick={() => handlePurchase(product.priceId, product.id, "payment")} 
          disabled={isPurchasing === product.id} 
          className="relative w-full overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] py-4 font-black uppercase text-xs hover:brightness-110 shadow-[0_8px_0_#3d291f] active:translate-y-[8px] transition-all flex items-center justify-center gap-3"
        >
          <span className="relative z-10 flex items-center gap-3">
            {isPurchasing === product.id ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
            {isPurchasing === product.id ? 'Processing...' : 'Add To Kit'}
          </span>
          <div className="btn-glare-overlay" />
        </button>

        <button 
          onClick={() => handlePurchase(product.subPriceId, product.id + '_sub', "subscription")} 
          disabled={isPurchasing === product.id + '_sub'} 
          className="relative w-full border border-[#c58158]/40 bg-transparent text-[#d4af37] py-2 font-black uppercase text-[9px] hover:bg-[#c58158]/10 italic flex items-center justify-center gap-2 overflow-hidden text-center transition-all"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isPurchasing === product.id + '_sub' ? <Loader2 size={12} className="animate-spin" /> : <RefreshCcw size={12} />} 
            Subscribe & Save 10%
          </span>
        </button>
      </div>
    </div>
  );
};

const HomeView = ({ products, isPurchasing, handlePurchase, onUnlockDiscount }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });
  const depotRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('mp_pop_v6');
    if (hasShown) return;
    const handleFirstScroll = () => { 
        setTimeout(() => { 
            setShowPopup(true); 
            sessionStorage.setItem('mp_pop_v6', 't'); 
        }, 3000); 
        window.removeEventListener('scroll', handleFirstScroll); 
    };
    window.addEventListener('scroll', handleFirstScroll);
    return () => window.removeEventListener('scroll', handleFirstScroll);
  }, []);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  const tickerContent = (
    <div className="flex items-center gap-12 sm:gap-24 px-6 sm:px-12">
      <div className="flex items-center gap-3"><MapPin size={16} className="text-[#c58158]" /><span className="text-[#f4e4bc] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Recently purchased across the U.S.</span></div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3"><Shield size={16} className="text-[#d4af37]" /><span className="text-[#d4af37] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">System Flow Secured Nationwide</span></div>
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

      <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center px-6 pt-20 lg:pt-36 pb-6 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-transparent to-[#1a0f0a] z-10" />
        <div className="max-w-7xl mx-auto relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start lg:col-span-7 z-30">
            <ScrollReveal>
              <div className="mb-2 lg:mb-10 hidden lg:block">
                <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-10 lg:h-32 w-auto object-contain mx-auto lg:mx-0" alt="Logo" />
              </div>
              <div className="inline-flex items-center space-x-3 px-4 lg:px-6 py-1 lg:py-1.5 mb-2 lg:mb-6 text-[10px] font-black uppercase tracking-[0.45em] text-[#d4af37] border-y border-[#c58158]/30 italic mx-auto lg:mx-0">
                <span>INDUSTRIAL-GRADE VITALITY</span>
              </div>
              <h1 className="text-[10.5vw] lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight mb-1 lg:mb-6 leading-[0.85] uppercase italic text-white drop-shadow-2xl">
                <span className="whitespace-nowrap">READY WHEN</span> <br /> 
                <span className="text-[#d4af37] whitespace-nowrap">IT COUNTS.</span>
              </h1>
              <div className="min-h-[24px] lg:min-h-[80px] mb-6 lg:mb-10 flex items-center justify-center lg:justify-start overflow-hidden text-[4.2vw] lg:text-2xl xl:text-3xl text-white font-bold italic tracking-wide">
                <p className="animate-phrase whitespace-nowrap">Under Pressure. Every Time.</p>
              </div>
              <div className="w-full flex justify-center lg:justify-start">
                <button onClick={() => scrollTo(depotRef)} className="relative group overflow-hidden bg-gradient-to-b from-[#d4af37] via-[#c58158] to-[#8c5a3d] text-[#1a0f0a] px-8 py-4 lg:py-6 font-black uppercase tracking-[0.15em] shadow-[0_8px_0_#3d291f,inset_0_1px_2px_rgba(255,255,255,0.6)] rounded-lg hover:translate-y-[2px] transition-all inline-flex items-center justify-center gap-4 italic text-base sm:text-lg w-full max-w-[340px] lg:max-w-none">
                  <span className="relative z-10 leading-none">TURN THE PRESSURE UP</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform shrink-0" />
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/25 blur-[1px] rounded-t-lg" />
                  <div className="btn-glare-overlay" />
                </button>
              </div>
            </ScrollReveal>
          </div>
          <div className="relative group lg:mt-0 flex justify-center lg:justify-end lg:col-span-6 pt-2 lg:pt-0 z-10">
            <ScrollReveal>
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-full transition-transform duration-700 hover:scale-105">
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

      <div className="w-full bg-[#140b08] border-y border-[#c58158]/30 py-4 relative overflow-hidden ticker-pause">
        <div className="animate-ticker">{tickerContent}{tickerContent}{tickerContent}{tickerContent}</div>
      </div>

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
                  <div className="flex items-center gap-5 mb-8 relative z-10"><div className="w-14 h-14 bg-[#1a0f0a] border border-[#c58158]/40 rounded-lg flex items-center justify-center text-[#d4af37] transition-transform">{d.icon}</div><h3 className="text-2xl font-black uppercase italic tracking-tight text-white leading-tight">{d.title}</h3></div>
                  <div className="pt-8 border-t border-[#c58158]/10 relative z-10"><p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-black mb-2">Recommended Part:</p><p className="text-3xl font-black text-white italic uppercase tracking-tight mb-4">{d.fix}</p><p className="text-xs font-bold text-[#f4e4bc]/50 italic leading-relaxed uppercase">{d.action}</p></div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Teardown Section */}
      <section className="px-8 py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
        <ScrollReveal>
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-[#c58158] mb-6">Blueprint Analysis</h2>
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase leading-none text-[#1a0f0a] mb-8">SYSTEM <span className="text-[#c58158]">TEARDOWN.</span></h1>
              <p className="text-lg lg:text-2xl text-[#1a0f0a]/40 font-bold max-w-3xl italic uppercase tracking-widest mx-auto">Engineering always wins over advertising.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div className="bg-white p-10 lg:p-16 border border-[#1a0f0a]/10 rounded-sm shadow-md flex flex-col justify-between transition-all duration-300">
                <div>
                   <div className="inline-flex items-center gap-2 mb-12 text-red-800">
                      <XCircle size={20} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Mass Market Specification</span>
                   </div>
                   <h4 className="text-xl lg:text-2xl font-black text-[#1a0f0a] mb-12 flex items-center uppercase italic tracking-[0.2em]">NUGENIX TOTAL-T</h4>
                   <div className="space-y-6">
                    {[{ l: "Price Comparison", v: "$79+ (Retail Bloat)" }, { l: "Magnesium Form", v: "Oxide (Gastro Filler)" }, { l: "Zinc Form", v: "Oxide (Low Absorption)" }, { l: "Tongkat Ali", v: "Root Powder (Raw)" }, { l: "Potency", v: "Non-Standardized" }].map((row, i) => (
                      <div key={i} className="flex justify-between border-b border-[#1a0f0a]/5 pb-4"><p className="text-[10px] text-[#1a0f0a]/50 uppercase font-black">{row.l}</p><p className="text-xs text-[#1a0f0a]/80 font-bold uppercase">{row.v}</p></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#fdfaf5] p-10 lg:p-16 border-[4px] border-[#c58158] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative rounded-sm group overflow-hidden">
                <div className="absolute top-0 right-0 px-6 py-2 bg-[#c58158] text-[#1a0f0a] text-[10px] font-black uppercase tracking-[0.3em] italic">Authorized Selection</div>
                <h4 className="text-xl lg:text-2xl font-black text-[#1a0f0a] mb-12 flex items-center uppercase italic tracking-[0.2em]"><ShieldCheck className="w-8 h-8 mr-4 text-[#c58158]" /> PRIME TIME</h4>
                <div className="space-y-6">
                  {[{ l: "Price Comparison", v: "$59 (Direct Value)" }, { l: "Magnesium Form", v: "Glycinate (High Torque)" }, { l: "Zinc Form", v: "Picolinate (Bioavailable)" }, { l: "Tongkat Ali", v: "200mg Standardized" }, { l: "Potency", v: "Potency Guaranteed" }].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/20 pb-4"><p className="text-[10px] text-[#c58158] uppercase font-black tracking-widest">{row.l}</p><p className="text-sm text-[#1a0f0a] font-black uppercase">{row.v}</p></div>
                  ))}
                </div>
                <div className="mt-16 pt-10 border-t border-[#c58158]/20">
                   <div className="flex items-center gap-4 text-[#c58158]">
                      <Settings className="animate-spin-slow w-5 h-5 opacity-40" />
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] italic">Blueprint Superiority Verified</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Blueprint Performance */}
      <section ref={benefitsRef} className="px-6 py-32 bg-[#f9f7f2] border-y border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-[10px] underline underline-offset-8">Maintenance Protocol</h2>
              <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-[#1a0f0a] leading-none uppercase italic">BUILT TO SUPPORT THE THINGS <span className="text-[#c58158]">MEN NOTICE FIRST</span></h1>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6 lg:space-y-12">
                <div className="bg-[#1a0f0a] border-l-8 border-[#d4af37] p-10 lg:p-14 shadow-2xl rounded-sm">
                  <div className="flex items-center gap-6 mb-8 text-[#d4af37]"><BatteryCharging size={32} strokeWidth={2.5} /><h3 className="text-2xl lg:text-3xl font-black uppercase italic text-white leading-none">Sleep affects energy.</h3></div>
                  <div className="flex items-center gap-6 mb-8 text-[#c58158]"><Zap size={32} strokeWidth={2.5} /><h3 className="text-2xl lg:text-3xl font-black uppercase italic text-white leading-none">Energy affects confidence.</h3></div>
                  <div className="flex items-center gap-6 text-[#d4af37]"><Trophy size={32} strokeWidth={2.5} /><h3 className="text-2xl lg:text-3xl font-black uppercase italic text-white leading-none underline decoration-[#d4af37]/30 underline-offset-8">Confidence affects everything.</h3></div>
                </div>
                <div className="space-y-6 px-4">
                  <p className="text-[#1a0f0a] text-lg lg:text-xl font-bold italic leading-relaxed">This formula was designed to support the everyday concerns men quietly deal with — nighttime interruptions, stamina, recovery, and overall vitality. When your routine feels steady, your day feels easier.</p>
                  <p className="text-[#c58158] font-black uppercase tracking-[0.3em] text-xs italic">No hype. No miracle promises. Just a blend created to support how men want to feel.</p>
                </div>
              </div>
              <div className="bg-white border border-[#c58158]/20 p-10 lg:p-20 relative rounded-sm shadow-xl overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
                <h4 className="text-xl lg:text-2xl font-black text-[#1a0f0a] mb-12 uppercase italic tracking-widest relative z-10 border-b border-[#c58158]/10 pb-4">Why Men Add This To Routine</h4>
                <ul className="space-y-10 relative z-10">
                  {['restless sleep', 'inconsistent energy', 'performance confidence', 'aging-related changes', 'daily stamina'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-6 group/item">
                      <div className="w-10 h-10 border-2 border-[#c58158]/40 rounded-full flex items-center justify-center bg-[#c58158]/5 group-hover/item:bg-[#1a0f0a] group-hover/item:border-[#1a0f0a] transition-all">
                        <CheckCircle2 size={20} className="text-[#c58158] group-hover/item:text-white" />
                      </div>
                      <span className="text-xl font-black uppercase tracking-widest text-[#1a0f0a]/60 italic group-hover/item:text-[#1a0f0a] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
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
               <Quote size={120} className="absolute top-0 right-0 p-8 opacity-5 text-[#d4af37]" />
               <div className="relative z-10 space-y-8 text-left">
                 <div className="flex flex-col items-center lg:items-start space-y-2">
                    <h2 className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-xs italic">Founder Field Note</h2>
                    <h3 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter text-white">THE STORY BEHIND <br/><span className="text-[#c58158]">THE SPEC.</span></h3>
                 </div>
                 <div className="space-y-6 text-[#f4e4bc]/90 font-serif text-lg lg:text-xl leading-relaxed italic text-left">
                    <p>I’m 42 years old, and I dealt with frequent nighttime bathroom trips for about 15 years. It started when I was 27 and slowly became part of my life — but it wasn’t harmless. Waking up 3 or 4 times a night wrecks your sleep, and bad sleep follows you into everything. My job felt harder. My energy was lower. Even my outlook during the day changed because I was constantly running tired.</p>
                    <p>I went looking for answers. I saw a urologist. I talked to my general doctor. Nobody could tell me why it was happening. That was frustrating — not having clarity and still living with the problem.</p>
                    <p>And it wasn’t just sleep. It started affecting my confidence and my sex life too. There were times I’d have to stop in the middle just to use the bathroom. That’s not something men like to admit, but it’s real — and it’s embarrassing when it happens.</p>
                    <p className="border-l-4 border-[#d4af37] pl-6 py-2 text-white font-bold bg-[#d4af37]/5">What made it more serious for me is my family history. Both my father and grandfather had prostate cancer, so ignoring it never felt like an option.</p>
                    <p>That frustration pushed me to partner with a lab and create my own formula. I wanted something I could trust because I was tired of chasing solutions.</p>
                    <p className="text-[#d4af37] font-bold">Within 3 days of taking my blend, my nighttime trips dropped to once — sometimes none. For the first time in years I could sleep through the night without anxiety about it. And when your sleep improves, everything improves.</p>
                    <p>I built these products because I needed them myself. I use them daily, and I stand behind them because I lived the problem they’re designed to support.</p>
                 </div>
                 <div className="pt-10 border-t border-[#c58158]/20 flex flex-col items-center lg:items-start"><p className="text-2xl font-black text-white italic tracking-widest">— Rahj, Founder</p></div>
               </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Supply Depot */}
      <section ref={depotRef} className="px-6 py-32 bg-[#140b08]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-24 text-center space-y-6">
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-none uppercase italic">THE <span className="text-[#d4af37]">SUPPLY</span> DEPOT</h1>
              <div className="flex items-center gap-3 justify-center text-[#d4af37] animate-pulse"><Truck size={24} /><span className="text-sm font-black uppercase tracking-[0.5em]">Free express shipping on all kits</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {products.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  isPurchasing={isPurchasing} 
                  handlePurchase={handlePurchase} 
                  onOpenLightbox={(imgs, idx) => setLightbox({ open: true, images: imgs, index: idx })}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-[#140b08] border-y border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-[10px] underline underline-offset-8">Support Intel</h2>
              <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-white leading-none uppercase italic">FREQUENTLY ASKED <span className="text-[#d4af37]">QUESTIONS</span></h1>
            </div>
            <FAQAccordion />
            <div className="mt-16 text-center">
              <p className="text-[#f4e4bc]/40 font-bold uppercase tracking-widest text-[10px] italic">Technical questions? Reach out to <span className="text-white">hello@mrplumberman.com</span></p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="bg-[#0f0a08] py-16 px-6 lg:px-10 border-t border-[#c58158]/10 text-center flex flex-col items-center">
        <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-10 w-auto mb-8 opacity-40 grayscale" alt="Logo" />
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 text-[10px] font-black uppercase tracking-widest italic text-[#c58158]/60">
          <div className="flex items-center gap-2"><Lock size={14} className="text-[#d4af37]" /><span>Secure Encrypted Checkout</span></div>
          <div className="flex items-center gap-2 text-white/90 font-sans"><Mail size={14} className="text-[#d4af37]" /><span>hello@mrplumberman.com</span></div>
        </div>
        <div className="max-w-3xl mb-10 p-6 border border-[#c58158]/20 bg-[#1a0f0a]/50">
          <p className="text-[10px] font-bold text-[#c58158]/80 leading-relaxed italic font-sans text-center">These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a physician before use, especially if you have a medical condition or are taking medication.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-[11px] font-black uppercase tracking-[0.2em] italic text-[#c58158]/80">
          <a href="/privacy" className="hover:text-[#d4af37]">Privacy Policy</a>
          <a href="/terms" className="hover:text-[#d4af37]">Terms of Service</a>
          <a href="/shipping" className="hover:text-[#d4af37]">Shipping Info</a>
        </div>
        <p className="text-[9px] text-[#c58158]/20 tracking-widest uppercase mb-4 italic">© 2024 MR. PLUMBER MAN NUTRITION. ALL SYSTEMS SECURED.</p>
      </footer>

      <DiscountPopup isOpen={showPopup} onClose={() => setShowPopup(false)} onUnlock={() => onUnlockDiscount()} />
      
      <LightboxModal 
        isOpen={lightbox.open} 
        images={lightbox.images} 
        initialIdx={lightbox.index} 
        onClose={() => setLightbox({ ...lightbox, open: false })} 
      />
    </>
  );
};

const ThankYouView = ({ onNavigate }) => {
  const [orderDetails] = useState({
    product: "The Overhaul Pack",
    qty: 1,
    total: 97.00,
    email: "customer@dispatch.com", 
    orderRef: "MPM-" + Math.random().toString(36).substring(7).toUpperCase()
  });

  return (
    <div className="min-h-screen bg-[#1a0f0a] flex flex-col items-center justify-start px-6 pt-24 pb-12 text-center relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.1]" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
      <div className="max-w-2xl w-full relative z-10 mb-12">
        <div className="w-20 h-20 bg-gradient-to-b from-[#d4af37] to-[#c58158] rounded-full mx-auto flex items-center justify-center text-[#1a0f0a] shadow-[0_0_50px_rgba(197,129,88,0.3)] mb-8"><CheckCircle2 size={40} /></div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase italic leading-none mb-4">ORDER <span className="text-[#d4af37]">RECEIVED</span></h1>
        <p className="text-lg text-[#f4e4bc]/60 font-bold uppercase tracking-widest italic">Pipes are clearing. Your haul is being dispatched.</p>
      </div>
      <div className="w-full max-w-[500px] relative z-20 space-y-6">
        <div className="bg-[#2a1b15]/40 border border-[#c58158]/10 p-6 rounded-sm">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#c58158]/10 -translate-y-1/2 z-0" />
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#1a0f0a] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-soft-pulse"><CheckCircle2 size={16} strokeWidth={3} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#d4af37]">Received</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1a0f0a] border-2 border-[#c58158]/20 text-[#c58158]/30 flex items-center justify-center"><RefreshCcw size={14} className="animate-spin-slow" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#f4e4bc]/30">Processing</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1a0f0a] border-2 border-[#c58158]/20 text-[#c58158]/30 flex items-center justify-center"><Truck size={14} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#f4e4bc]/30">Shipped</span>
            </div>
          </div>
        </div>
        <div className="bg-[#2a1b15]/60 border border-[#c58158]/20 shadow-2xl rounded-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#c58158]/10 bg-[#1a0f0a]/40 text-center lg:text-left"><h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c58158]">Shipment Summary</h2></div>
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-end border-b border-[#c58158]/10 pb-4">
               <div className="text-left"><p className="text-[10px] font-black text-[#c58158] uppercase tracking-widest mb-1">Item</p><p className="text-lg font-black text-white italic uppercase">{orderDetails.product}</p></div>
               <div className="text-right"><p className="text-[10px] font-black text-[#c58158] uppercase tracking-widest mb-1">Qty</p><p className="text-lg font-black text-white italic">{orderDetails.qty}</p></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#f4e4bc]/60"><span>Confirmation sent to</span><span className="text-[#f4e4bc] font-black">{orderDetails.email}</span></div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#f4e4bc]/60"><span>Order Reference</span><span className="text-[#f4e4bc] font-black tracking-widest">{orderDetails.orderRef}</span></div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#f4e4bc]/60"><span>Receipt Status</span><span className="text-[#d4af37] font-black flex items-center gap-1"><MailCheck size={12} /> Emailed</span></div>
            </div>
            <div className="pt-6 border-t border-[#c58158]/10 flex justify-between items-center">
              <p className="text-[11px] font-black text-[#d4af37] uppercase tracking-[0.3em] italic">Total Secured</p>
              <p className="text-3xl font-black text-white italic leading-none">${orderDetails.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 text-left">
          <div className="flex items-center gap-4 bg-[#1a0f0a] border border-[#c58158]/10 p-4 rounded-sm"><Clock size={16} className="text-[#c58158]" /><div className="flex flex-col"><p className="text-[9px] font-black uppercase tracking-widest text-white italic">Processing: 0–1 business day</p><p className="text-[9px] text-[#f4e4bc]/40 font-bold uppercase">Our warehouse is pulling your kit now.</p></div></div>
          <div className="flex items-center gap-4 bg-[#1a0f0a] border border-[#c58158]/10 p-4 rounded-sm"><MapPin size={16} className="text-[#c58158]" /><div className="flex flex-col"><p className="text-[9px] font-black uppercase tracking-widest text-white italic">Shipping: 2–5 business days</p><p className="text-[9px] text-[#f4e4bc]/40 font-bold uppercase">Dispatching via priority transport.</p></div></div>
          <div className="flex items-center gap-4 bg-[#1a0f0a] border border-[#c58158]/10 p-4 rounded-sm"><ClipboardCheck size={16} className="text-[#d4af37]" /><p className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] italic">Tracking emailed automatically</p></div>
        </div>
        <div className="py-8 space-y-2"><p className="text-[10px] font-black text-[#c58158] uppercase tracking-[0.4em] italic">Need Support?</p><p className="text-lg font-black text-white italic lowercase">hello@mrplumberman.com</p><p className="text-[9px] text-[#f4e4bc]/30 font-bold uppercase">“Support replies within 24 hours”</p></div>
        <button onClick={() => onNavigate('/')} className="relative group overflow-hidden w-full bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-12 py-5 font-black uppercase rounded-sm shadow-[0_8px_0_#3d291f,inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3 italic transition-all active:translate-y-1 active:shadow-none"><HomeIcon size={18} /><span className="relative z-10">RETURN TO DEPOT</span><div className="btn-glare-overlay" /></button>
      </div>
    </div>
  );
};

// --- APP ENTRY ---

const App = () => {
  const [isPurchasing, setIsPurchasing] = useState(null);
  const [discountUnlocked, setDiscountUnlocked] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const products = [
    { 
      id: 'p', 
      name: "PRESSURE", 
      sub: "Prostate Support", 
      price: 39, 
      images: [
        "https://images.travelprox.com/mrplumberman/pressure.png",
        "https://images.travelprox.com/mrplumberman/pressure2.png",
        "https://images.travelprox.com/mrplumberman/pressurefacts.png",
        "https://images.travelprox.com/mrplumberman/pressurepromo.png"
      ],
      benefits: ["Fewer nighttime disruptions, better mornings", "Wake up feeling more rested", "Built for long-term routine support"],
      priceId: 'price_1SwvOSKFN6WMOhlF5xerUfID', 
      subPriceId: 'price_1SwvhCKFN6WMOhlFqFQiSYH6'
    },
    { 
      id: 't', 
      name: "PRIME TIME", 
      sub: "T-Formula", 
      price: 59, 
      images: [
        "https://images.travelprox.com/mrplumberman/primeheat.png",
        "https://images.travelprox.com/mrplumberman/primetime2.png",
        "https://images.travelprox.com/mrplumberman/primefacts.png",
        "https://images.travelprox.com/mrplumberman/primepromo.png"
      ],
      benefits: ["Support stamina and performance confidence", "Feel steady energy throughout the day", "Designed for real men with real schedules"],
      priceId: 'price_1SwvR8KFN6WMOhlFXD9hxqXi', 
      subPriceId: 'price_1SwvkOKFN6WMOhlFRkxiPaPq'
    },
    { 
      id: 'c', 
      name: "THE OVERHAUL", 
      sub: "Combo Pack", 
      price: 97, 
      images: [
        "https://images.travelprox.com/mrplumberman/symbol.png",
        "https://images.travelprox.com/mrplumberman/primefacts.png",
        "https://images.travelprox.com/mrplumberman/pressurefacts.png",
        "https://images.travelprox.com/mrplumberman/primepromo.png",
        "https://images.travelprox.com/mrplumberman/pressurepromo.png",
        "https://images.travelprox.com/mrplumberman/primetime2.png",
        "https://images.travelprox.com/mrplumberman/pressure2.png"
      ],
      benefits: ["Complete energy and rest overhaul", "Maximum performance confidence kit", "Full long-term routine maintenance"],
      tag: "Best Value", 
      priceId: 'price_1SwvX4KFN6WMOhlFXU8Bs0lt', 
      subPriceId: 'price_1SwvmEKFN6WMOhlFzNkPcl3U'
    }
  ];

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const handlePurchase = async (priceId, productId, mode) => {
    setIsPurchasing(productId);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode: mode })
      });
      const data = await res.json();
      if (data?.url) { window.location.href = data.url; return; }
      setIsPurchasing(null);
    } catch (e) { setIsPurchasing(null); }
  };

  return (
    <div className="bg-[#1a0f0a] text-[#f4e4bc] font-serif relative overflow-x-hidden min-h-screen selection:bg-[#d4af37] selection:text-[#1a0f0a]">
      <GlareStyles />
      {currentPath.startsWith('/thank-you') ? (
        <ThankYouView onNavigate={navigateTo} />
      ) : (
        <HomeView 
          products={products}
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
