import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  History,
  Loader2,
  Star,
  ShieldCheck,
  Wrench,
  Droplets,
  Award,
  Package,
  Ticket,
  FlaskConical,
  Scale,
  X,
  Minimize2,
  Send,
  XCircle,
  Home,
  Network,
  ChevronDown,
  Quote,
  Truck,
  RefreshCcw,
  User,
  Mail,
  MapPin,
  Shield,
  Activity
} from 'lucide-react';

/**
 * MR. PLUMBER MAN NUTRITION - PRODUCTION SCHEMATIC
 * Update: Scaled down mobile headers to 9.5vw to prevent "IT COUNTS." overflow.
 * Integration: Plumber26 code logic + Stripe Checkout on PRESSURE + Full Testimonial Deck.
 */

// --- Testimonials Data (Full Deck of 12) ---
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

// --- ChatBot Component ---
const ChatBot = ({ messages, setMessages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const callGemini = async (userQuery) => {
    const systemPrompt = `You are the Lead Strategist for Mr. Plumber Man Nutrition. Professional tradesman tone. 10% refill discount. MAX 2 SENTENCES.`;
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery, systemPrompt }),
      });
      const data = await response.json();
      return (data?.text || "System clog. Visit the Supply Depot.").replace(/[#*_|]/g, "");
    } catch (e) {
      return "Connection leak detected. Visit the Supply Depot below.";
    }
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
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 bg-[#1a0f0a]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#c58158] text-[#1a0f0a] font-bold' : 'bg-[#2a1b15] text-[#f4e4bc] border border-[#c58158]/10 shadow-md text-left'}`}>{m.text}</div>
              </div>
            ))}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#c58158] m-4" />}
          </div>
          <div className="p-4 bg-[#2a1b15] border-t border-[#c58158]/20 flex space-x-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask the boss..." className="flex-grow bg-[#1a0f0a] border border-[#c58158]/30 rounded-full px-4 py-2 text-xs text-white outline-none" />
            <button onClick={handleSend} className="p-2 bg-[#c58158] rounded-full text-[#1a0f0a] transition-transform hover:scale-110"><Send className="w-4 h-4" /></button>
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

// --- Reusable Scroll Reveal ---
const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, []);
  return <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>{children}</div>;
};

// --- Discount Popup ---
const DiscountPopup = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-[#1a0f0a] border-[4px] border-[#c58158] shadow-2xl rounded-sm p-1">
        <div className="bg-[#2a1b15] border border-[#c58158]/30 p-8 md:p-12 text-center relative overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#c58158] hover:text-[#d4af37] transition-colors p-2 z-10"><X /></button>
          <div className="relative z-10 space-y-6 flex flex-col items-center">
            {isSubmitted ? (
               <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center space-y-6 py-4">
                  <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-full flex items-center justify-center text-[#d4af37]"><CheckCircle2 size={32} /></div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white text-center">SYSTEM CLEAR</h2>
                  <p className="text-[#f4e4bc]/60 font-bold uppercase tracking-widest text-xs italic text-center">Your parts discount has been unlocked.</p>
                  <div className="bg-[#1a0f0a] border-2 border-dashed border-[#c58158] p-6 rounded-md w-full text-center">
                    <p className="text-[10px] text-[#c58158] font-black uppercase tracking-[0.4em] mb-2 italic">Your Discount Code</p>
                    <p className="text-4xl font-black text-white italic tracking-widest select-all uppercase">Plumber26</p>
                  </div>
                  <button onClick={onClose} className="bg-[#c58158] text-[#1a0f0a] px-8 py-4 font-black uppercase tracking-widest text-xs shadow-[0_6px_0_#8c5a3d] hover:translate-y-[2px] transition-all italic">Back to Depot</button>
               </div>
            ) : (
              <>
                <Ticket className="w-12 h-12 text-[#d4af37] rotate-12" />
                <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white text-center">WANT THE <span className="text-[#d4af37]">BEST DEALS?</span></h2>
                <p className="text-[#f4e4bc]/60 font-bold uppercase tracking-widest text-xs italic text-center">Join the dispatch list and take <span className="text-white">15% OFF</span> your next haul.</p>
                <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-4 w-full text-left">
                  <input className="formkit-input w-full bg-[#1a0f0a] border-2 border-[#c58158]/30 px-6 py-4 text-xs font-black tracking-widest text-white focus:outline-none italic" placeholder="First Name" type="text" required />
                  <input className="formkit-input w-full bg-[#1a0f0a] border-2 border-[#c58158]/30 px-6 py-4 text-xs font-black tracking-widest text-white focus:outline-none italic" placeholder="Email Address" required type="email" />
                  <button type="submit" className="w-full bg-[#c58158] text-[#1a0f0a] py-5 font-black uppercase tracking-[0.3em] text-sm hover:bg-[#d4af37] shadow-[0_8px_0_#8c5a3d] active:translate-y-[8px] active:shadow-none italic transition-all">Claim Discount</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: "Systems check. To get the right specs for your haul, tell me what's leaking: Are you dealing with nightly urination trips or a drop in sexual performance torque?" }]);
  const [isPurchasing, setIsPurchasing] = useState(null); 
  
  const teardownRef = useRef(null);
  const depotRef = useRef(null);
  const diagnosticRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('mp_pop_v6')) { setShowPopup(true); sessionStorage.setItem('mp_pop_v6', 't'); }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePurchase = async (priceId, productId) => {
    setIsPurchasing(productId);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setIsPurchasing(null);
      }
    } catch (e) {
      setIsPurchasing(null);
    }
  };

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-[#1a0f0a] text-[#f4e4bc] font-serif relative overflow-x-hidden min-h-screen selection:bg-[#d4af37] selection:text-[#1a0f0a]">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-[80] p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center bg-[#2a1b15]/95 backdrop-blur-md border border-[#c58158]/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-2xl">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Wrench size={18} className="text-[#c58158]" />
            <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-6 sm:h-7 w-auto object-contain" alt="Mr. Plumber Man" />
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={() => scrollTo(reviewsRef)} className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-[#f4e4bc] hover:text-[#d4af37] transition">Report</button>
            <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-[#d4af37] transition italic">Supply Depot</button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-8 pt-24 pb-12 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, maskImage: 'linear-gradient(to right, transparent 5%, black 95%)', WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 95%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-transparent to-[#1a0f0a] z-10" />
        <div className="max-w-6xl mx-auto relative z-20 w-full grid lg:grid-cols-2 gap-12 items-center text-center">
          <div className="text-center lg:text-left">
            <ScrollReveal>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-6 sm:mb-10"><img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-16 sm:h-20 md:h-28 w-auto object-contain mx-auto" alt="Mr. Plumber Man Nutrition" /></div>
                <div className="inline-flex items-center space-x-3 px-6 py-2 mb-8 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-[#d4af37] border-y border-[#c58158]/30 italic"><span>INDUSTRIAL-GRADE VITALITY</span></div>
                
                {/* HEADLINE: Dynamic scale (9.5vw) to ensure "IT COUNTS." fits perfectly on mobile glass */}
                <h1 className="text-[9.5vw] sm:text-7xl md:text-9xl font-black tracking-tight mb-10 leading-[0.9] uppercase italic text-white drop-shadow-2xl text-center lg:text-left w-full break-words">
                  READY WHEN <br className="hidden md:block" /> <span className="text-[#d4af37] whitespace-nowrap">IT COUNTS.</span>
                </h1>
                
                <div className="space-y-6 max-w-2xl text-center lg:text-left">
                  <p className="text-xl sm:text-2xl md:text-3xl text-[#f4e4bc]/80 leading-relaxed font-bold italic">
                    We Keep them Pipes pipin' and them Thangs thangin'.
                  </p>
                  <div className="flex items-center gap-2 justify-center lg:justify-start text-[#d4af37]">
                    <Truck size={18} />
                    <p className="text-sm sm:text-base font-bold uppercase tracking-widest italic">All orders include free express shipping.</p>
                  </div>
                </div>
                
                <div className="mt-12 relative flex items-center justify-center lg:justify-start">
                  <div className="absolute w-48 h-48 bg-[#d4af37]/15 blur-3xl rounded-full -z-10 animate-pulse"></div>
                  <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-10 sm:px-16 py-5 sm:py-6 font-black uppercase tracking-widest sm:tracking-[0.2em] shadow-[0_10px_0_#8c5a3d] rounded-lg hover:translate-y-[2px] active:translate-y-[8px] transition-all flex items-center gap-3 italic text-center text-lg">
                    TURN THE PRESSURE UP <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative group lg:mt-0 mt-16 text-center">
            <ScrollReveal>
              <div className="relative aspect-[4/5] mx-auto max-w-[500px] border-8 border-[#3d291f] shadow-2xl overflow-hidden bg-[#2a1b15]">
                <img src="https://images.travelprox.com/mrplumberman/symbol.png" alt="Mr. Plumber Man Symbol" className="w-full h-full object-cover group-hover:scale-105 transition duration-[3s] ease-out" />
                <div className="absolute inset-0 border-[2px] border-[#c58158]/20 m-4 pointer-events-none" />
                <div className="absolute bottom-5 right-5 bg-[#1a0f0a] border-2 border-[#c58158]/40 p-4 sm:p-5 rounded-md shadow-2xl z-20 text-left">
                  <div className="flex flex-col gap-1 mb-2 text-xs sm:text-sm font-black uppercase tracking-widest leading-tight"><span className="text-white italic">PRESSURE</span><span className="text-[#d4af37]">Prostate Support</span></div>
                  <div className="flex items-center justify-between gap-6 pt-1"><span className="text-[#c58158] font-black text-xl leading-none">$39</span><button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest italic hover:bg-[#d4af37]">Shop Now</button></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="w-full bg-[#140b08] border-y border-[#c58158]/30 py-6 relative overflow-hidden text-center z-30 px-8">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }}></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 relative z-10 text-center">
          <div className="flex items-center gap-4 text-center"><MapPin size={18} className="text-[#c58158]" /><p className="text-[#f4e4bc] text-xs sm:text-sm font-black uppercase tracking-[0.2em] italic text-center">Recently purchased by customers across the U.S.</p></div>
          <div className="hidden md:block w-px h-8 bg-[#c58158]/20 text-center"></div>
          <div className="flex items-center gap-4 text-center"><Shield size={18} className="text-[#d4af37]" /><p className="text-[#d4af37] text-xs sm:text-sm font-black uppercase tracking-[0.2em] italic text-center text-center">System Flow Secured Nationwide</p></div>
        </div>
      </div>

      {/* SYSTEM TROUBLE SHOOTING - Matched scale with responsive fix */}
      <section ref={diagnosticRef} className="px-6 sm:px-8 py-16 sm:py-32 bg-[#1a0f0a] border-b border-[#c58158]/10 text-center">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="mb-16 space-y-4 text-center text-center">
               <h2 className="text-[#c58158] font-black uppercase tracking-[0.6em] text-[10px] sm:text-xs underline decoration-1 text-center">Industrial Diagnostics</h2>
               <h1 className="text-[9.5vw] sm:text-7xl md:text-9xl font-black tracking-tight text-white leading-[1.0] sm:leading-[0.95] uppercase italic break-words text-center">
                 SYSTEM <br className="sm:hidden" /> <span className="text-[#d4af37] whitespace-nowrap">TROUBLE SHOOTING</span>
               </h1>
               <p className="text-[#f4e4bc]/50 font-bold uppercase tracking-widest text-sm sm:text-lg italic max-w-2xl mx-auto text-center">Don't guess. Diagnose the leak and secure the pro-grade fix.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 text-center text-center">
              {[
                { title: "LEAK DETECTED", icon: <Droplets />, fix: "PRESSURE", action: "Clear the pipes with standardized Saw Palmetto." },
                { title: "LOW TORQUE", icon: <Zap />, fix: "PRIME TIME", action: "Restore torque with high-absorption Glycinate specs." },
                { title: "TOTAL OVERHAUL", icon: <Activity />, fix: "OVERHAUL COMBO", action: "Factory reset your entire system performance." }
              ].map((d, i) => (
                <div key={i} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-6 sm:p-10 flex flex-col hover:border-[#d4af37] transition duration-500 rounded-sm shadow-2xl group text-left">
                  <div className="flex items-center gap-4 sm:gap-5 mb-8 text-left text-left"><div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#1a0f0a] border border-[#c58158]/40 rounded-lg flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform shrink-0"> {d.icon}</div><h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight text-white leading-tight">{d.title}</h3></div>
                  <div className="space-y-6">
                    <div className="pt-8 border-t border-[#c58158]/10 text-left text-left text-left"><p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-black mb-3 text-left">Recommended Part:</p><p className="text-2xl sm:text-3xl font-black text-white italic uppercase tracking-tight mb-4 leading-none text-left">{d.fix}</p><p className="text-[10px] sm:text-xs font-bold text-[#f4e4bc]/50 italic leading-relaxed uppercase text-left">{d.action}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* THE FIELD REPORT - All 12 Reports + Scale matched */}
      <section ref={reviewsRef} className="px-6 sm:px-8 py-16 sm:py-32 bg-[#140b08] border-y border-[#c58158]/10 text-center text-center text-center">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto overflow-hidden text-center">
            <div className="mb-16 space-y-4 text-center">
               <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-xs underline decoration-1 text-center">Verified Field Ops</h2>
               <h1 className="text-[9.5vw] sm:text-7xl md:text-9xl font-black tracking-tight text-white leading-[1.0] sm:leading-[0.95] italic uppercase break-words text-center">THE <span className="text-[#d4af37] whitespace-nowrap">FIELD REPORT</span></h1>
               <p className="text-[#f4e4bc]/50 font-bold uppercase tracking-widest text-sm sm:text-lg italic max-w-2xl mx-auto text-center">Unedited status reports from the workshop floor.</p>
            </div>
            <div className="flex flex-col gap-12 sm:gap-16 text-center text-center">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left text-left">
                 {testimonials.slice(0, 4).map((t, idx) => ( <TestimonialCard key={idx} testimonial={t} /> ))}
               </div>

               <div className="py-16 border-y-2 border-[#c58158]/20 relative overflow-hidden bg-[#2a1b15]/20 px-4 sm:px-8 text-center text-center text-center">
                  <Quote className="text-[#d4af37] w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-8 opacity-40 text-center" />
                  <h2 className="text-2xl sm:text-5xl font-black uppercase italic tracking-tight text-white leading-[1.1] sm:leading-[0.95] mb-8 text-center text-center">"Take care of your body. It's the only place you have to live."</h2>
                  <p className="text-[#c58158] font-black uppercase tracking-[0.4em] text-xs sm:text-sm text-center text-center">— Jim Rohn, Vitality Strategist</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left text-left">
                 {testimonials.slice(4, 8).map((t, idx) => ( <TestimonialCard key={idx} testimonial={t} /> ))}
               </div>

               <div className="py-16 border-y-2 border-[#c58158]/20 relative overflow-hidden bg-[#2a1b15]/20 px-4 sm:px-8 text-center text-center text-center">
                  <Quote className="text-[#d4af37] w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-8 opacity-40 text-center" />
                  <h2 className="text-2xl sm:text-5xl font-black uppercase italic tracking-tight text-[#d4af37] leading-[1.1] sm:leading-[0.95] mb-8 text-center text-center text-center">"Clear pipes and high torque. Because a man's performance shouldn't have a 'Closed for Maintenance' sign."</h2>
                  <p className="text-white font-black uppercase tracking-[0.4em] text-xs sm:text-sm text-center text-center">— The Plumber's Secret to Domestic Harmony</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left text-left">
                 {testimonials.slice(8, 12).map((t, idx) => ( <TestimonialCard key={idx} testimonial={t} /> ))}
               </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Shop Guarantee */}
      <section className="bg-[#1a0f0a] py-16 sm:py-32 relative overflow-hidden text-center px-10 text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto relative z-10 text-center text-center text-center">
             <div className="w-20 sm:w-24 h-20 sm:h-24 bg-[#c58158]/10 border-2 border-[#c58158] rounded-full flex items-center justify-center mx-auto mb-10 sm:mb-12 text-[#c58158] text-center text-center"><Package size={40} /></div>
             <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[#c58158] mb-6 sm:mb-8 text-center">Standard Return Policy</h2>
             <h3 className="text-3xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase mb-10 sm:mb-12 leading-none italic text-white text-center text-center text-center">THE SHOP <span className="text-[#d4af37]">GUARANTEE</span>.</h3>
             <p className="text-lg sm:text-3xl text-[#f4e4bc]/60 font-bold max-w-3xl mx-auto leading-relaxed italic uppercase tracking-widest mb-12 sm:mb-16 text-center text-center text-center">If you change your mind on a kit, we'll take it back. We offer a full refund on any unopened and unused product within 30 days of purchase. No clogs in the process.</p>
             <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-10 sm:px-14 py-4 sm:py-6 font-black uppercase tracking-widest text-xs sm:text-sm shadow-[0_10px_0_#8c5a3d] rounded-lg hover:translate-y-[2px] active:translate-y-[8px] transition-all italic text-center mx-auto text-center text-center">Visit The Supply Depot</button>
          </div>
        </ScrollReveal>
      </section>

      {/* Blueprint Teardown */}
      <section ref={teardownRef} className="px-8 py-16 sm:py-32 bg-[#1a0f0a] text-center text-center text-center">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto text-center text-center text-center">
            <div className="mb-16 sm:mb-24 space-y-6 text-center text-center text-center text-center text-center text-center">
              <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[#c58158] text-center text-center text-center text-center">Blueprint Analysis</h2>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight uppercase mb-10 leading-[1.0] italic text-white text-center text-center break-words text-center text-center">SYSTEM <span className="text-[#d4af37]">TEARDOWN</span>.</h1>
              <p className="text-base sm:text-2xl text-[#f4e4bc]/50 font-bold max-w-3xl leading-relaxed italic uppercase tracking-widest mx-auto text-center text-center text-center">Engineering always wins over advertising.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch text-right text-right">
              <div className="bg-[#2a1b15]/40 p-8 sm:p-16 border-2 border-[#c58158]/10 relative z-10 shadow-lg group grayscale opacity-85 hover:opacity-100 transition-all duration-500 text-right text-right text-right text-right">
                <div className="absolute top-6 left-6 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#c58158]/60 text-left text-left text-left text-left">Mass Market Formula</div>
                <h4 className="text-lg sm:text-2xl font-black text-[#c58158] mb-10 sm:mb-12 flex items-center uppercase tracking-[0.2em] italic justify-end text-right text-right text-right text-right"><XCircle className="w-6 h-6 mr-3 text-red-900" /> NUGENIX TOTAL-T</h4>
                <div className="space-y-6 sm:space-y-8 italic text-right text-right text-right text-right">
                  {[{ l: "Price Comparison", v: "$79+ (Retail Bloat)" }, { l: "Magnesium Form", v: "Oxide (Gastro Filler)" }, { l: "Zinc Form", v: "Oxide (Low Absorption)" }, { l: "Tongkat Ali", v: "50mg Raw Root Powder" }, { l: "Saw Palmetto", v: "50mg Raw Berries" }, { l: "Extract Type", v: "Non-Standardized" }].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/10 pb-4 sm:pb-5 text-right text-right text-right text-right"><p className="text-[10px] sm:text-xs text-[#c58158]/60 uppercase font-black tracking-widest text-left text-left text-left text-left">{row.l}</p><p className="text-xs sm:text-base text-[#f4e4bc]/40 font-bold uppercase text-right text-right text-right text-right text-right">{row.v}</p></div>
                  ))}
                </div>
              </div>
              <div className="relative bg-[#1a0f0a] p-8 sm:p-16 border-[3px] border-[#c58158] shadow-[0_0_100px_rgba(197,129,88,0.15)] z-20 overflow-hidden text-right text-right text-right text-right text-right">
                <h4 className="text-lg sm:text-2xl font-black text-white mb-10 sm:mb-12 flex items-center relative z-10 uppercase tracking-[0.2em] italic justify-end text-right text-right text-right text-right text-right"><ShieldCheck className="w-6 h-6 mr-3 text-[#d4af37]" /> MR. PLUMBER MAN</h4>
                <div className="space-y-6 sm:space-y-8 relative z-10 italic text-right text-right text-right text-right text-right">
                  {[{ l: "Price Comparison", v: "$59 (Direct Value)" }, { l: "Magnesium Form", v: "Glycinate (High Torque)" }, { l: "Zinc Form", v: "Picolinate (Bioavailable)" }, { l: "Tongkat Ali", v: "200mg Standardized" }, { l: "Saw Palmetto", v: "100mg Standardized" }, { l: "Extract Type", v: "Potency Guaranteed" }].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/20 pb-4 sm:pb-5 text-right text-right text-right text-right text-right"><p className="text-[10px] sm:text-xs text-[#d4af37] uppercase font-black tracking-widest text-left text-left text-left text-left text-left">{row.l}</p><p className="text-sm text-white font-black uppercase text-right text-right text-right text-right text-right text-right text-right">{row.v}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Supply Depot */}
      <section ref={depotRef} className="px-6 py-16 sm:py-32 bg-[#140b08] text-center text-center text-center text-center text-center">
       <div className="max-w-7xl mx-auto italic text-center text-center text-center text-center text-center text-center">
          <ScrollReveal>
            <div className="mb-16 sm:mb-24 space-y-6 text-center text-center text-center text-center text-center text-center">
               <h2 className="text-[#c58158] font-black uppercase tracking-[0.6em] text-xs underline decoration-1 text-center text-center text-center">Supply Inventory</h2>
               <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-white leading-none text-center text-center text-center">THE <span className="text-[#d4af37]">SUPPLY</span> DEPOT</h1>
               <div className="flex items-center gap-3 justify-center text-[#d4af37] animate-pulse text-center text-center text-center text-center"><Truck size={20} sm:size={24} /><span className="text-xs sm:text-sm font-black uppercase tracking-[0.5em] text-center text-center text-center">All orders include free express shipping</span></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10 text-center text-center text-center text-center">
               {[
                 { id: 'p', name: "PRESSURE", sub: "Prostate Support", price: 39, priceId: "price_1SwvOSKFN6WMOhlF5xerUfID", imgOverride: "https://images.travelprox.com/mrplumberman/pressure.png", desc: "Clear the lines and restore factory-spec flow rate." },
                 { id: 't', name: "PRIME TIME", sub: "T-Formula", price: 59, imgOverride: "https://images.travelprox.com/mrplumberman/primeheat.png", desc: "High-torque energy and maximum drive restoration." },
                 { id: 'c', name: "THE OVERHAUL", sub: "Combo Pack", price: 97, imgOverride: "https://images.travelprox.com/mrplumberman/symbol.png", desc: "The ultimate blueprint. Secure both formulas for total system performance.", tag: "Best Value" }
               ].map(p => (
                 <div key={p.id} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 sm:p-10 hover:border-[#d4af37] transition duration-500 flex flex-col items-center group rounded-sm shadow-2xl relative overflow-hidden text-center text-center text-center text-center text-center">
                    {p.tag && (<div className="absolute top-4 left-[-30px] bg-[#d4af37] text-[#1a0f0a] px-10 py-1 text-[8px] font-black uppercase tracking-widest -rotate-45 shadow-lg text-center text-center text-center">{p.tag}</div>)}
                    <div className="w-full aspect-square bg-[#1a0f0a] border border-[#c58158]/20 mb-6 sm:mb-8 flex items-center justify-center relative shadow-inner overflow-hidden text-center text-center text-center text-center text-center"><img src={p.imgOverride} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 text-center text-center text-center" /></div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mb-2 text-center text-center leading-none text-center text-center">{p.name}</h3>
                    <p className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 text-center text-center text-center">{p.sub}</p>
                    <p className="text-xs sm:text-sm text-[#f4e4bc]/50 font-bold uppercase tracking-widest mb-8 sm:mb-10 italic leading-relaxed text-center text-center text-center">{p.desc}</p>
                    <div className="mt-auto w-full space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#c58158]/20 text-center text-center">
                       <div className="flex flex-col items-center gap-2 text-center text-center text-center text-center">
                          <p className="text-3xl sm:text-4xl font-black italic text-white text-center text-center text-center text-center">${p.price}</p>
                          <span className="text-[10px] text-[#c58158] font-black uppercase tracking-widest text-center text-center text-center text-center text-center">Free Express Shipping</span>
                       </div>
                       <div className="space-y-3 sm:space-y-4 text-center text-center text-center text-center text-center text-center">
                         <button 
                          onClick={() => p.priceId && handlePurchase(p.priceId, p.id)}
                          disabled={isPurchasing === p.id}
                          className="w-full bg-[#c58158] text-[#1a0f0a] py-3 sm:py-4 font-black uppercase tracking-widest text-xs hover:bg-[#d4af37] shadow-[0_8px_0_#8c5a3d] active:translate-y-[8px] transition-all text-center flex items-center justify-center gap-2 disabled:opacity-70 text-center text-center text-center"
                         >
                           {isPurchasing === p.id ? <Loader2 size={16} className="animate-spin" /> : null}
                           {isPurchasing === p.id ? 'Processing...' : 'Add To Kit'}
                         </button>
                         <button className="w-full border border-[#c58158]/40 bg-transparent text-[#d4af37] py-2 font-black uppercase tracking-[0.3em] text-[9px] hover:bg-[#c58158]/10 transition-all italic flex items-center justify-center gap-2 text-center text-center text-center text-center"><RefreshCcw size={12} sm:size={14} /> Subscribe & Save 10%</button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </ScrollReveal>
       </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0a08] py-16 sm:py-24 px-10 text-center italic border-t border-[#c58158]/10 text-center text-center text-center text-center text-center text-center text-center text-center">
         <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12 flex flex-col items-center text-center text-center text-center text-center text-center text-center text-center text-center">
            <div className="opacity-50 grayscale hover:opacity-100 transition-opacity mb-4 sm:mb-6 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-10 sm:h-12 w-auto text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center" alt="Mr. Plumber Man Logo" /></div>
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#c58158]/30 leading-relaxed max-w-2xl mx-auto italic text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
               * These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Comparison based on available label specifications. Nugenix Total-T is a registered trademark of its respective owner.
            </p>
         </div>
      </footer>

      {/* Floating UI */}
      <ChatBot messages={chatMessages} setMessages={setChatMessages} />
      <DiscountPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

// --- Testimonial Card Component ---
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-6 sm:p-8 flex flex-col hover:border-[#d4af37] transition duration-300 relative rounded-sm shadow-xl h-full text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
    <div className="absolute top-4 right-4 opacity-10 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left"><Quote size={32} sm:size={40} className="text-[#c58158]" /></div>
    <div className="flex gap-1 mb-6 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={12} sm:size={14} className="fill-[#d4af37] text-[#d4af37]" />)}
      {[...Array(5 - testimonial.rating)].map((_, i) => <Star key={i} size={12} sm:size={14} className="text-[#c58158]/20" />)}
    </div>
    <p className="text-[#f4e4bc] text-sm sm:text-base font-bold italic leading-relaxed mb-8 relative z-10 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">"{testimonial.text}"</p>
    <div className="mt-auto border-t border-[#c58158]/10 pt-6 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
      <p className="text-[#d4af37] font-black uppercase tracking-widest text-xs italic text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">{testimonial.name}</p>
      <div className="flex justify-between items-center mt-1 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
        <p className="text-[#c58158]/60 font-bold uppercase text-[8px] sm:text-[9px] tracking-widest text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">{testimonial.location}</p>
        <span className="text-[8px] font-black bg-[#c58158]/10 px-2 py-0.5 border border-[#c58158]/20 text-[#c58158] rounded-full text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">{testimonial.product}</span>
      </div>
    </div>
  </div>
);

export default App;
