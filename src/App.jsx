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
  Home as HomeIcon
} from 'lucide-react';

/**
 * MR. PLUMBER MAN NUTRITION - PRODUCTION SCHEMATIC
 * Fully Restored Edition with State-Based Routing.
 * Update: Popup logic modified to trigger 3 seconds after scrolling begins.
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
    .btn-glare-overlay {
      position: absolute;
      top: 0;
      height: 100%;
      width: 40px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
      transform: skewX(-25deg);
      animation: glare-sweep 4s infinite ease-in-out;
      pointer-events: none;
    }
    .animate-ticker {
      display: flex;
      width: fit-content;
      animation: ticker-scroll 90s linear infinite;
    }
    .ticker-pause:hover .animate-ticker {
      animation-play-state: paused;
    }
  `}} />
);

// --- SHARED DATA ---
const testimonials = [
  { name: "Jim T.", location: "Chicago, IL", text: "I was getting up 2-3 times a night to pee. Now it's usually once, sometimes none. Subtle but the sleep quality change is real.", product: "PRESSURE", rating: 4 },
  { name: "Rob M.", location: "Houston, TX", text: "Didn't expect a lot, but I'm definitely sleeping deeper. actually dreaming again which means the mineral levels are stabilizing. Worth it.", product: "PRIME TIME", rating: 5 },
  { name: "Mike D.", location: "Phoenix, AZ", text: "No crazy energy rush like caffeine, but I just feel more even-keeled during the day. Not as tired by 3pm shift changes.", product: "PRIME TIME", rating: 4 },
  { name: "Dave L.", location: "Austin, TX", text: "Pipes are clearer. Took about 10 days to really notice a difference in the flow rate, but it's back to factory specs now.", product: "PRESSURE", rating: 5 },
  { name: "Tom W.", location: "Jacksonville, FL", text: "Standard drugstore saw palmetto usually gives me heartburn. This standardized version is clean. Fewer trips to the john.", product: "PRESSURE", rating: 5 },
  { name: "Gary H.", location: "Denver, CO", text: "Gym torque is up slightly, but I mostly just feel less cranky in the mornings. Shipping was surprisingly fast.", product: "PRIME TIME", rating: 4 },
  { name: "Steve P.", location: "Nashville, TN", text: "Flow is steady, system is quiet at night. Good buy for any guy over 40.", product: "PRESSURE", rating: 5 },
  { name: "Mark S.", location: "Baltimore, MD", text: "Checked the labels and the forms are legit. No cheap oxide fillers. System feels properly maintained since starting the Combo kit.", product: "COMBO", rating: 5 },
  { name: "Paul R.", location: "Tucson, AZ", text: "Not sure if it's the sleep or the minerals but I have more focus on the job. Decent value for money.", product: "PRIME TIME", rating: 4 },
  { name: "Tony G.", location: "Atlanta, GA", text: "Total overhaul. Flow is clear and drive is back where it should be. Everything is running smoother.", product: "COMBO", rating: 5 },
  { name: "Larry B.", location: "Miami, FL", text: "Was a bit skeptical at first but the nightly bathroom interruptions have slowed down significantly. Can't argue with results.", product: "PRESSURE", rating: 4 },
  { name: "Kev J.", location: "Las Vegas, NV", text: "Engine is running smoother. It's just basic good maintenance for the body. I'll be sticking with the subscription.", product: "COMBO", rating: 5 }
];

// --- SHARED COMPONENTS ---

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

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-[#2a1b15]/60 border-2 border-[#c58158]/20 p-6 sm:p-8 flex flex-col hover:border-[#d4af37] transition-all duration-300 relative rounded-sm shadow-xl h-full overflow-hidden group">
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.2]" 
      style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    <div className="absolute top-4 right-4 opacity-10 relative z-10"><Quote size={32} className="text-[#c58158]" /></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} className={i < testimonial.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-[#c58158]/20"} />
        ))}
      </div>
      <p className="text-[#f4e4bc] text-sm sm:text-base font-bold italic leading-relaxed mb-8">"{testimonial.text}"</p>
      <div className="mt-auto border-t border-[#c58158]/10 pt-6">
        <p className="text-[#d4af37] font-black uppercase tracking-widest text-xs italic">{testimonial.name}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-[#c58158]/60 font-bold uppercase text-[9px] tracking-widest">{testimonial.location}</p>
          <span className="text-[8px] font-black bg-[#c58158]/10 px-2 py-0.5 border border-[#c58158]/20 text-[#c58158] rounded-full uppercase">{testimonial.product}</span>
        </div>
      </div>
    </div>
  </div>
);

const ChatBot = ({ messages, setMessages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const apiKey = ""; 

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const callGemini = async (userQuery) => {
    const systemPrompt = "You are the Lead Strategist for Mr. Plumber Man Nutrition. Professional tradesman tone. MAX 2 SENTENCES.";
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        }),
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "System clog. Check back later.";
    } catch (e) { return "Leak detected in connection."; }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setMessages(p => [...p, { role: 'user', text: msg }]);
    setInput('');
    setIsLoading(true);
    const aiRes = await callGemini(msg);
    setMessages(p => [...p, { role: 'assistant', text: aiRes }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] bg-[#1a0f0a] border-2 border-[#c58158]/50 rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-5 bg-[#2a1b15] border-b border-[#c58158]/20 flex justify-between items-center text-white font-black italic text-xs tracking-widest uppercase">
            <span>Flow Dispatch</span>
            <button onClick={() => setIsOpen(false)}><Minimize2 className="w-4 h-4" /></button>
          </div>
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 bg-[#1a0f0a] scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#c58158] text-[#1a0f0a] font-bold' : 'bg-[#2a1b15] text-[#f4e4bc] border border-[#c58158]/10 shadow-md'}`}>{m.text}</div>
              </div>
            ))}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#c58158] mx-auto my-4" />}
          </div>
          <div className="p-4 bg-[#2a1b15] border-t border-[#c58158]/20 flex space-x-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask the boss..." className="flex-grow bg-[#1a0f0a] border border-[#c58158]/30 rounded-full px-4 py-2 text-xs text-white outline-none" />
            <button onClick={handleSend} className="relative overflow-hidden p-2 bg-[#c58158] rounded-full text-[#1a0f0a] transition-transform hover:scale-110 active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <Send className="w-4 h-4 relative z-10" />
              <div className="btn-glare-overlay" />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-[#1a0f0a] border-2 border-[#c58158] rounded-full flex items-center justify-center shadow-2xl group relative transition-transform hover:scale-110">
          <div className="absolute inset-0 bg-[#c58158]/10 rounded-full animate-ping group-hover:animate-none" />
          <Wrench className="w-6 h-6 text-[#c58158]" />
        </button>
      )}
    </div>
  );
};

const DiscountPopup = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-[#1a0f0a] border-[4px] border-[#c58158] shadow-2xl rounded-sm p-1">
        <div className="bg-[#2a1b15] border border-[#c58158]/30 p-8 md:p-12 text-center relative overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#c58158] hover:text-[#d4af37] transition-colors p-2 z-10"><X /></button>
          <div className="relative z-10 space-y-6 flex flex-col items-center">
            {isSubmitted ? (
               <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center space-y-6 py-4">
                  <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-full flex items-center justify-center text-[#d4af37]"><CheckCircle2 size={32} /></div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">SYSTEM CLEAR</h2>
                  <p className="text-[#f4e4bc]/60 font-bold uppercase tracking-widest text-xs italic">Your parts discount has been unlocked.</p>
                  <div className="bg-[#1a0f0a] border-2 border-dashed border-[#c58158] p-6 rounded-md w-full text-center relative overflow-hidden">
                    <p className="text-4xl font-black text-white italic tracking-widest select-all uppercase">Plumber26</p>
                  </div>
                  <button onClick={onClose} className="relative overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-8 py-4 font-black uppercase tracking-widest text-xs shadow-[0_6px_0_#8c5a3d,inset_0_1px_1px_rgba(255,255,255,0.4)] hover:translate-y-[2px] transition-all italic">
                    <span className="relative z-10">Back to Depot</span>
                    <div className="btn-glare-overlay" />
                  </button>
               </div>
            ) : (
              <>
                <Ticket className="w-12 h-12 text-[#d4af37] rotate-12" />
                <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">WANT THE <span className="text-[#d4af37]">BEST DEALS?</span></h2>
                <p className="text-[#f4e4bc]/60 font-bold uppercase tracking-widest text-xs italic">Join the dispatch list and take <span className="text-white">15% OFF</span> your first haul.</p>
                <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4 w-full">
                  <input className="w-full bg-[#1a0f0a] border-2 border-[#c58158]/30 px-6 py-4 text-xs font-black tracking-widest text-white focus:outline-none italic focus:border-[#d4af37] transition-colors" placeholder="First Name" type="text" required />
                  <input className="w-full bg-[#1a0f0a] border-2 border-[#c58158]/30 px-6 py-4 text-xs font-black tracking-widest text-white focus:outline-none italic focus:border-[#d4af37] transition-colors" placeholder="Email Address" required type="email" />
                  <button type="submit" className="group relative w-full overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] py-5 font-black uppercase tracking-[0.3em] text-sm hover:brightness-110 shadow-[0_8px_0_#8c5a3d,inset_0_1px_2px_rgba(255,255,255,0.6)] active:translate-y-[8px] active:shadow-none transition-all italic">
                    <span className="relative z-10">Claim Discount</span>
                    <div className="btn-glare-overlay" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PAGES ---

const HomeView = ({ navigate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(null); 
  const depotRef = useRef(null);
  const reviewsRef = useRef(null);

  // TRIGGER POPUP 3 SECONDS AFTER SCROLLING STARTS
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
        }, 3000); // 3 seconds after scrolling detected
      }
    };

    window.addEventListener('scroll', handleFirstScroll);
    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  const handlePurchase = (productId) => {
    setIsPurchasing(productId);
    setTimeout(() => {
      setIsPurchasing(null);
      navigate('thank-you'); 
    }, 1500);
  };

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  // Ticker content repeated for infinite loop
  const tickerContent = (
    <div className="flex items-center gap-12 sm:gap-24 px-6 sm:px-12">
      <div className="flex items-center gap-3">
        <MapPin size={16} className="text-[#c58158]" />
        <span className="text-[#f4e4bc] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Recently purchased by customers across the U.S.</span>
      </div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3">
        <Shield size={16} className="text-[#d4af37]" />
        <span className="text-[#d4af37] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">System Flow Secured Nationwide</span>
      </div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3">
        <Wrench size={16} className="text-[#c58158]" />
        <span className="text-[#f4e4bc] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Become a pipe master.</span>
      </div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3">
        <Droplets size={16} className="text-[#d4af37]" />
        <span className="text-[#d4af37] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Minimize bathroom urgency.</span>
      </div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3">
        <Zap size={16} className="text-[#c58158]" />
        <span className="text-[#f4e4bc] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Increase system duration.</span>
      </div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
      <div className="flex items-center gap-3">
        <Activity size={16} className="text-[#d4af37]" />
        <span className="text-[#d4af37] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] italic whitespace-nowrap">Improve system function.</span>
      </div>
      <div className="w-1.5 h-1.5 bg-[#c58158]/40 rounded-full" />
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
            <button onClick={() => scrollTo(reviewsRef)} className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-[#f4e4bc] hover:text-[#d4af37] transition">Report</button>
            <button onClick={() => scrollTo(depotRef)} className="relative overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:brightness-110 transition italic group">
               <span className="relative z-10">Supply Depot</span>
               <div className="btn-glare-overlay" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-transparent to-[#1a0f0a] z-10" />
        <div className="max-w-7xl mx-auto relative z-20 w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <ScrollReveal>
              <div className="mb-6 lg:mb-10"><img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-16 sm:h-20 lg:h-32 w-auto object-contain mx-auto lg:mx-0" alt="Logo" /></div>
              <div className="inline-flex items-center space-x-3 px-6 py-2 mb-6 lg:mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37] border-y border-[#c58158]/30 italic mx-auto lg:mx-0"><span>INDUSTRIAL-GRADE VITALITY</span></div>
              <h1 className="text-[9.5vw] lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight mb-8 leading-[0.95] uppercase italic text-white drop-shadow-2xl">
                READY WHEN <br className="hidden lg:block" /> 
                <span className="text-[#d4af37] whitespace-nowrap">IT COUNTS.</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-[#f4e4bc]/80 leading-relaxed font-bold italic mb-10">We keep them pipes pipin' and them thangs thangin'.</p>
              
              <div className="w-full flex justify-center lg:justify-start">
                <button 
                  onClick={() => scrollTo(depotRef)} 
                  className="relative group overflow-hidden bg-gradient-to-b from-[#d4af37] via-[#c58158] to-[#8c5a3d] text-[#1a0f0a] px-10 sm:px-14 py-5 lg:py-6 font-black uppercase tracking-widest shadow-[0_10px_0_#3d291f,inset_0_1px_2px_rgba(255,255,255,0.6)] rounded-lg hover:translate-y-[2px] transition-all inline-flex items-center justify-center gap-4 italic text-base sm:text-lg min-w-[280px] sm:min-w-0"
                >
                  <span className="relative z-10 leading-none">TURN THE PRESSURE UP</span>
                  <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform shrink-0" />
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/20 blur-[1px] rounded-t-lg" />
                  <div className="btn-glare-overlay" />
                </button>
              </div>
            </ScrollReveal>
          </div>
          <div className="relative group lg:mt-0 flex justify-center lg:justify-end">
            <ScrollReveal>
              <div className="relative aspect-[4/5] w-full max-w-[500px] border-8 border-[#3d291f] shadow-2xl overflow-hidden bg-[#2a1b15]">
                <img src="https://images.travelprox.com/mrplumberman/symbol.png" alt="Symbol" className="w-full h-full object-cover group-hover:scale-105 transition duration-[3s] ease-out" />
                <div className="absolute inset-0 border-[2px] border-[#c58158]/20 m-4 pointer-events-none" />
                <div className="absolute bottom-5 right-5 bg-[#1a0f0a] border-2 border-[#c58158]/40 p-5 rounded-md shadow-2xl z-20 backdrop-blur-md">
                  <div className="flex flex-col gap-1 mb-2 text-[10px] font-black uppercase tracking-widest leading-tight"><span className="text-white italic">PRESSURE</span><span className="text-[#d4af37]">Prostate Support</span></div>
                  <div className="flex items-center justify-between gap-6 pt-1">
                    <span className="text-[#c58158] font-black text-xl leading-none">$39</span>
                    <button onClick={() => scrollTo(depotRef)} className="relative overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest italic shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:brightness-110">
                       <span className="relative z-10">Shop Now</span>
                       <div className="btn-glare-overlay" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Bar - TICKER SPEED CALIBRATED TO HALF SPEED */}
      <div className="w-full bg-[#140b08] border-y border-[#c58158]/30 py-4 relative overflow-hidden ticker-pause">
        <div className="animate-ticker">
          {tickerContent}
          {tickerContent}
          {tickerContent}
          {tickerContent}
        </div>
      </div>

      {/* Diagnostics */}
      <section className="px-6 py-24 bg-[#1a0f0a] border-b border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-16 space-y-4">
              <h2 className="text-[#c58158] font-black uppercase tracking-[0.6em] text-[10px] underline underline-offset-8">Industrial Diagnostics</h2>
              <h1 className="text-[9.5vw] lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none uppercase italic">SYSTEM <span className="text-[#d4af37]">TROUBLE SHOOTING</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "LEAK DETECTED", icon: <Droplets />, fix: "PRESSURE", action: "Clear the pipes with standardized Saw Palmetto." },
                { title: "LOW TORQUE", icon: <Zap />, fix: "PRIME TIME", action: "Restore torque with high-absorption Glycinate specs." },
                { title: "TOTAL OVERHAUL", icon: <Activity />, fix: "OVERHAUL COMBO", action: "Factory reset your entire system performance." }
              ].map((d, i) => (
                <div key={i} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 flex flex-col hover:border-[#d4af37] transition duration-500 rounded-sm shadow-2xl group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
                  <div className="flex items-center gap-5 mb-8 relative z-10">
                    <div className="w-14 h-14 bg-[#1a0f0a] border border-[#c58158]/40 rounded-lg flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">{d.icon}</div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tight text-white leading-tight">{d.title}</h3>
                  </div>
                  <div className="pt-8 border-t border-[#c58158]/10 relative z-10">
                    <p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-black mb-2">Recommended Part:</p>
                    <p className="text-3xl font-black text-white italic uppercase tracking-tight mb-4">{d.fix}</p>
                    <p className="text-xs font-bold text-[#f4e4bc]/50 italic leading-relaxed uppercase">{d.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Teardown */}
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
                <h4 className="text-xl lg:text-2xl font-black text-[#c58158] mb-12 flex items-center uppercase tracking-[0.2em] italic"><XCircle className="w-6 h-6 mr-3 text-red-900" /> NUGENIX TOTAL-T</h4>
                <div className="space-y-6">
                  {[{ l: "Price Comparison", v: "$79+ (Retail Bloat)" }, { l: "Magnesium Form", v: "Oxide (Gastro Filler)" }, { l: "Zinc Form", v: "Oxide (Low Absorption)" }, { l: "Tongkat Ali", v: "50mg Raw Root Powder" }, { l: "Saw Palmetto", v: "50mg Raw Berries" }, { l: "Extract Type", v: "Non-Standardized" }].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/10 pb-4"><p className="text-[10px] text-[#c58158]/60 uppercase font-black tracking-widest">{row.l}</p><p className="text-xs text-[#f4e4bc]/40 font-bold uppercase">{row.v}</p></div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1a0f0a] p-10 lg:p-16 border-[3px] border-[#c58158] shadow-[0_0_100px_rgba(197,129,88,0.15)] z-20">
                <h4 className="text-xl lg:text-2xl font-black text-white mb-12 flex items-center uppercase tracking-[0.2em] italic"><ShieldCheck className="w-6 h-6 mr-3 text-[#d4af37]" /> PRIME TIME</h4>
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

      {/* Field Report Section */}
      <section ref={reviewsRef} className="px-6 py-24 bg-[#140b08] border-y border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-16 space-y-4">
              <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-[10px] underline underline-offset-8">Verified Field Ops</h2>
              <h1 className="text-[9.5vw] lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none italic uppercase">THE <span className="text-[#d4af37]">FIELD REPORT</span></h1>
              <p className="text-[#f4e4bc]/50 font-bold uppercase tracking-widest text-sm sm:text-lg italic max-w-2xl mx-auto">Unedited status reports from the workshop floor.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
              {testimonials.slice(0, 4).map((t, idx) => <TestimonialCard key={idx} testimonial={t} />)}
            </div>

            <div className="py-20 border-y-2 border-[#c58158]/20 bg-[#2a1b15]/20 px-8 mb-16 relative overflow-hidden">
               <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
               <Quote className="text-[#d4af37] w-12 h-12 mx-auto mb-8 opacity-40 relative z-10" />
               <h2 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tight text-white leading-tight mb-8 relative z-10">"Take care of your body. It's the only place you have to live."</h2>
               <p className="text-[#c58158] font-black uppercase tracking-[0.4em] text-xs relative z-10">— Jim Rohn, Vitality Strategist</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
              {testimonials.slice(4, 8).map((t, idx) => <TestimonialCard key={idx} testimonial={t} />)}
            </div>

            <div className="py-20 border-y-2 border-[#c58158]/20 bg-[#2a1b15]/20 px-8 mb-16 relative overflow-hidden">
              <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
              <Quote className="text-[#d4af37] w-12 h-12 mx-auto mb-8 opacity-40 relative z-10" />
              <h2 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tight text-[#d4af37] leading-tight mb-8 relative z-10">"Clear pipes and high torque. Because a man's performance shouldn't have a 'Closed for Maintenance' sign."</h2>
              <p className="text-white font-black uppercase tracking-[0.4em] text-xs relative z-10">— The Plumber's Secret to Domestic Harmony</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {testimonials.slice(8, 12).map((t, idx) => <TestimonialCard key={idx} testimonial={t} />)}
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
             <h3 className="text-3xl sm:text-6xl lg:text-8xl font-black tracking-tight uppercase mb-12 leading-none italic text-white">THE SHOP <span className="text-[#d4af37]">GUARANTEE</span>.</h3>
             <p className="text-lg sm:text-3xl text-[#f4e4bc]/60 font-bold max-w-3xl mx-auto leading-relaxed italic uppercase tracking-widest mb-16">If you change your mind on a kit, we'll take it back. Full refund on unopened product within 30 days. No clogs in the process.</p>
             <button onClick={() => scrollTo(depotRef)} className="relative overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-14 py-6 font-black uppercase tracking-widest text-sm shadow-[0_10px_0_#3d291f,inset_0_1px_1px_rgba(255,255,255,0.4)] rounded-lg hover:translate-y-[2px] transition-all italic">
                <span className="relative z-10">Visit The Supply Depot</span>
                <div className="btn-glare-overlay" />
             </button>
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
                { id: 'p', name: "PRESSURE", sub: "Prostate Support", price: 39, img: "https://images.travelprox.com/mrplumberman/pressure.png", desc: "Clear the lines and restore factory-spec flow rate." },
                { id: 't', name: "PRIME TIME", sub: "T-Formula", price: 59, img: "https://images.travelprox.com/mrplumberman/primeheat.png", desc: "High-torque energy and maximum drive restoration." },
                { id: 'c', name: "THE OVERHAUL", sub: "Combo Pack", price: 97, img: "https://images.travelprox.com/mrplumberman/symbol.png", desc: "The ultimate blueprint. Secure both formulas.", tag: "Best Value" }
              ].map(p => (
                <div key={p.id} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 hover:border-[#d4af37] transition duration-500 flex flex-col items-center group relative rounded-sm shadow-2xl">
                  {p.tag && (<div className="absolute top-4 left-[-30px] bg-[#d4af37] text-[#1a0f0a] px-10 py-1 text-[8px] font-black uppercase tracking-widest -rotate-45 shadow-lg z-20">{p.tag}</div>)}
                  <div className="w-full aspect-square bg-[#1a0f0a] border border-[#c58158]/20 mb-8 flex items-center justify-center relative overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase mb-2 leading-none italic">{p.name}</h3>
                  <p className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4">{p.sub}</p>
                  <p className="text-sm text-[#f4e4bc]/50 font-bold uppercase tracking-widest mb-10 italic leading-relaxed text-center">{p.desc}</p>
                  <div className="mt-auto w-full space-y-6 pt-8 border-t border-[#c58158]/20">
                    <div className="text-center">
                      <p className="text-4xl font-black italic text-white mb-1">${p.price}</p>
                      <span className="text-[10px] text-[#c58158] font-black uppercase tracking-widest">Free Express Shipping</span>
                    </div>
                    <button onClick={() => handlePurchase(p.id)} disabled={isPurchasing === p.id} className="relative w-full overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] py-4 font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-[0_8px_0_#3d291f,inset_0_1px_1px_rgba(255,255,255,0.4)] active:translate-y-[8px] transition-all flex items-center justify-center gap-3">
                      <span className="relative z-10 flex items-center gap-3">
                        {isPurchasing === p.id ? <Loader2 size={16} className="animate-spin" /> : <Package size={16} />}
                        {isPurchasing === p.id ? 'Processing...' : 'Add To Kit'}
                      </span>
                      <div className="btn-glare-overlay" />
                    </button>
                    <button className="w-full border border-[#c58158]/40 bg-transparent text-[#d4af37] py-2 font-black uppercase tracking-[0.3em] text-[9px] hover:bg-[#c58158]/10 transition-all italic flex items-center justify-center gap-2">
                        <RefreshCcw size={12} /> Subscribe & Save 10%
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="bg-[#0f0a08] py-24 px-10 border-t border-[#c58158]/10 text-center">
        <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-12 w-auto mx-auto mb-10 opacity-40 grayscale" alt="Logo" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c58158]/30 leading-relaxed max-w-3xl mx-auto italic">
          * These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
        <p className="text-[9px] text-[#c58158]/20 tracking-widest">© 2024 MR. PLUMBER MAN NUTRITION. ALL SYSTEMS SECURED.</p>
      </footer>

      <DiscountPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
};

const ThankYouView = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover' }} />
      <div className="max-w-2xl w-full relative z-10 text-center space-y-10 animate-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-gradient-to-b from-[#d4af37] to-[#c58158] rounded-full mx-auto flex items-center justify-center text-[#1a0f0a] shadow-[0_0_50px_rgba(197,129,88,0.3),inset_0_2px_4px_rgba(255,255,255,0.6)]">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-4">
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
        <button 
          onClick={() => navigate('home')} 
          className="relative group overflow-hidden bg-gradient-to-b from-[#d4af37] to-[#c58158] text-[#1a0f0a] px-12 py-5 font-black uppercase tracking-widest shadow-[0_8px_0_#3d291f,inset_0_1px_2px_rgba(255,255,255,0.6)] rounded-lg hover:translate-y-[2px] transition-all flex items-center justify-center gap-3 italic mx-auto"
        >
          <span className="relative z-10 flex items-center gap-3"><HomeIcon size={20} /> RETURN TO DEPOT</span>
          <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/20 blur-[1px] rounded-t-lg" />
          <div className="btn-glare-overlay" />
        </button>
      </div>
    </div>
  );
};

// --- APP ENTRY ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: "Systems check. To get the right specs for your haul, tell me what's leaking." }]);

  const navigate = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#1a0f0a] text-[#f4e4bc] font-serif relative overflow-x-hidden min-h-screen selection:bg-[#d4af37] selection:text-[#1a0f0a]">
      <GlareStyles />
      {currentPage === 'thank-you' ? <ThankYouView navigate={navigate} /> : <HomeView navigate={navigate} />}
      <ChatBot messages={chatMessages} setMessages={setChatMessages} />
    </div>
  );
};

export default App;
