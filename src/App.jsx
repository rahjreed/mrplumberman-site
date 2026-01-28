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
  ChevronDown
} from 'lucide-react';

const apiKey = ""; // Environment handles this

// --- Discount Popup ---
const DiscountPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-[#1a0f0a] border-[4px] border-[#c58158] shadow-[0_0_100px_rgba(197,129,88,0.3)] overflow-hidden rounded-sm p-1">
        <div className="bg-[#2a1b15] border border-[#c58158]/30 p-8 md:p-12 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#c58158] hover:text-[#d4af37] transition-colors p-2 z-10"><X /></button>
          <div className="relative z-10 space-y-6">
            <div className="inline-block p-4 bg-[#c58158]/10 rounded-full"><Ticket className="w-12 h-12 text-[#d4af37] rotate-12" /></div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">WANT THE <span className="text-[#d4af37]">BEST DEALS?</span></h2>
            <p className="text-[#f4e4bc]/60 font-bold uppercase tracking-widest text-xs italic">Join the dispatch list and take <span className="text-white">15% OFF</span> your next haul.</p>
            <div className="space-y-4 pt-4">
              <input type="email" placeholder="ENTER DISPATCH EMAIL" className="w-full bg-[#1a0f0a] border-2 border-[#c58158]/30 px-6 py-4 text-xs font-black tracking-widest text-white focus:outline-none focus:border-[#d4af37] italic" />
              <button onClick={onClose} className="w-full bg-[#c58158] text-[#1a0f0a] py-5 font-black uppercase tracking-[0.3em] text-sm hover:bg-[#d4af37] shadow-[0_8px_0_#8c5a3d] active:translate-y-[8px] active:shadow-none italic">Claim Discount</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ChatBot Component ---
const ChatBot = ({ messages, setMessages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const callGemini = async (userQuery, retryCount = 0) => {
    const systemPrompt = `You are the Lead Strategist for Mr. Plumber Man Nutrition. Your tone is professional, elite tradesman, and focused. Use plumbing metaphors for biology (pipes, flow, torque, pressure). 
    
    Products: 
    - PRESSURE ($39): Prostate support, fixes nightly flow leaks.
    - PRIME TIME ($59): Testosterone formula, restores system torque and energy.
    
    YOUR MISSION: Drive the sale. Your primary goal is to get the user to buy. 
    STRATEGY: 
    - If they ask about symptoms, explain it like a plumbing issue and tell them which product fixes the leak. 
    - CRITICAL: Never tell users to email. Always instruct them to scroll down to the "Supply Depot" or click the "Order Supplies" button at the top to secure their kit.
    - Emphasize that professional maintenance can't wait. 
    - No markdown, no bolding, plain text only.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: systemPrompt }] } })
      });
      const data = await response.json();
      return (data.candidates?.[0]?.content?.parts?.[0]?.text || "System clog detected. Head to the Supply Depot to order.").replace(/[#*_|]/g, '');
    } catch (e) {
      if (retryCount < 2) return callGemini(userQuery, retryCount + 1);
      return "The connection is leaking. Head down to the Supply Depot to secure your order manually.";
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
        <div className="w-[320px] md:w-[380px] h-[500px] bg-[#1a0f0a] border-2 border-[#c58158]/50 rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-5 bg-[#2a1b15] border-b border-[#c58158]/20 flex justify-between items-center text-white font-black italic text-xs tracking-widest uppercase">
            <span>Flow Dispatch</span>
            <button onClick={() => setIsOpen(false)}><Minimize2 className="w-4 h-4" /></button>
          </div>
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#c58158] text-[#1a0f0a] font-bold' : 'bg-[#2a1b15] text-[#f4e4bc] border border-[#c58158]/10'}`}>{m.text}</div>
              </div>
            ))}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#c58158]" />}
          </div>
          <div className="p-4 bg-[#2a1b15] border-t border-[#c58158]/20 flex space-x-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="What's leaking? Ask here..." className="flex-grow bg-[#1a0f0a] border border-[#c58158]/30 rounded-full px-4 py-2 text-xs text-white outline-none" />
            <button onClick={handleSend} className="p-2 bg-[#c58158] rounded-full text-[#1a0f0a]"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-[#1a0f0a] border-2 border-[#c58158] rounded-full flex items-center justify-center shadow-2xl group relative">
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => ref.current && obs.unobserve(ref.current);
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{children}</div>;
};

// --- Main App ---
const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: "Systems check. Is your flow hitting factory specs? Tell me what's leaking and I'll find the right kit." }]);

  const teardownRef = useRef(null);
  const depotRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('mp_pop')) { setShowPopup(true); sessionStorage.setItem('mp_pop', 't'); }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const Header = () => (
    <nav className="fixed top-0 left-0 w-full z-[80] p-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center bg-[#2a1b15]/95 backdrop-blur-md border border-[#c58158]/30 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-[#c58158] rounded-lg flex items-center justify-center font-black text-[#1a0f0a] shadow-md"><Wrench size={18} /></div>
          <span className="text-[14px] font-black uppercase tracking-tight text-[#d4af37] italic">MR. PLUMBER MAN</span>
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={() => scrollTo(teardownRef)} className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-[#f4e4bc] hover:text-[#d4af37] transition">The Teardown</button>
          <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-[#d4af37] transition italic">Supply Depot</button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="bg-[#1a0f0a] text-[#f4e4bc] font-serif relative overflow-x-hidden">
      <Header />
      
      {/* Hero Section - Visual Heavy */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-transparent to-[#1a0f0a] z-10" />
        
        {/* Ornate Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />

        <div className="max-w-7xl mx-auto relative z-20 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center space-x-3 px-6 py-2 mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37] border-y border-[#c58158]/30 italic">
                <Award size={14} /><span>Industrial Grade Vitality</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase italic text-white drop-shadow-2xl">
                MASTER YOUR <br />
                <span className="text-[#d4af37]">VITAL</span> PLUMBING
              </h1>
              
              <p className="text-xl md:text-2xl text-[#f4e4bc]/70 mb-2 leading-relaxed max-w-xl font-bold italic">
                Fix your flow with formulas engineered for the <span className="text-white underline decoration-[#c58158] underline-offset-8">modern tradesman</span>. No leaks, no guesswork.
              </p>
              <p className="text-sm font-bold text-[#d4af37] uppercase tracking-widest mt-4">
                Two formulas. One mission: restore energy, performance, and prostate flow.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-6 mt-8 relative">
                 {/* CTA Focal Glow */}
                 <div className="absolute w-40 h-40 bg-[#d4af37]/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
                 
                 <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-12 py-5 font-black uppercase tracking-[0.2em] shadow-[0_10px_0_#8c5a3d] hover:translate-y-[2px] hover:shadow-[0_8px_0_#8c5a3d] active:translate-y-[8px] active:shadow-none transition-all flex items-center gap-3 italic">
                   Order Supplies <ArrowRight size={20} />
                 </button>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative group lg:mt-0 mt-12">
            <ScrollReveal>
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] mx-auto max-w-[500px] border-8 border-[#3d291f] shadow-2xl overflow-hidden bg-[#2a1b15]">
                <GenerateImage 
                  prompt="A professional vintage industrial poster illustration of a muscular Black man with dreadlocks, wearing a blue short-sleeve work shirt and dark overalls, holding a large silver wrench over his shoulder, warm copper and mahogany studio lighting, clean lines, high quality character art, brown background, no text" 
                  hero 
                />
                <div className="absolute inset-0 border-[2px] border-[#c58158]/20 m-4 pointer-events-none"></div>
                
                {/* Hero Product Glimpse Card */}
                <div className="absolute bottom-4 right-4 bg-[#1a0f0a] border-2 border-[#c58158]/40 p-4 rounded-md shadow-xl animate-in slide-in-from-right-10 duration-1000 delay-500">
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-white text-sm font-black uppercase italic">PRESSURE</span>
                    <span className="text-[#d4af37] text-[10px] uppercase tracking-widest">Prostate Support</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-[#c58158] font-black text-lg">$39</span>
                    <button 
                      onClick={() => scrollTo(depotRef)}
                      className="text-[9px] font-black uppercase tracking-widest bg-[#c58158] text-[#1a0f0a] px-3 py-1 rounded-sm hover:bg-[#d4af37] transition"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37] italic">"Fix Your Flow Like A Pro"</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#c58158]/10 blur-[100px] pointer-events-none -z-10" />
            </ScrollReveal>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 cursor-pointer z-30" onClick={() => scrollTo(teardownRef)}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Blueprint Teardown Section */}
      <section ref={teardownRef} className="px-6 py-24 md:py-40 bg-[#1a0f0a]">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[#c58158] font-black">Blueprint Analysis</h2>
              <h3 className="text-5xl md:text-9xl font-black tracking-tighter uppercase mb-8 leading-none italic text-white">SYSTEM <span className="text-[#d4af37]">TEARDOWN</span>.</h3>
              <p className="text-[#f4e4bc]/50 text-xl md:text-2xl font-bold max-w-3xl mx-auto leading-relaxed italic uppercase tracking-widest text-center">Nugenix built recognition. Mr. Plumber Man builds results. Engineering always wins over advertising.</p>
            </div>
            
            {/* Legitimacy Header */}
            <div className="grid grid-cols-4 w-full mb-4 px-10 text-[10px] uppercase tracking-widest text-[#c58158]/60 font-black hidden lg:grid">
              <span>Formula Type</span>
              <span>Mineral Form</span>
              <span>Herbal Standardization</span>
              <span>Dose Strength</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-1/2 h-full bg-[#c58158]/5 blur-[120px] rounded-full hidden lg:block pointer-events-none" />
              
              {/* Left Column: Nugenix (Incumbent) */}
              <div className="bg-[#2a1b15]/40 p-10 md:p-14 rounded-t-[20px] lg:rounded-tr-none lg:rounded-l-[20px] border-2 border-[#c58158]/10 relative z-10 shadow-lg group grayscale opacity-85 hover:opacity-100 transition-all duration-500">
                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-[#c58158]/60">Mass Market Formula</div>
                <h4 className="text-xl font-black text-[#c58158] mb-12 flex items-center uppercase tracking-[0.2em] italic opacity-50"><XCircle className="w-6 h-6 mr-3 text-red-900" /> NUGENIX TOTAL-T</h4>
                <div className="space-y-8">
                  {[
                    { l: "Price Comparison", v: "$79+ (Retail Bloat)" },
                    { l: "Magnesium Form", v: "Oxide (Gastro Filler)" },
                    { l: "Zinc Form", v: "Oxide (Low Absorption)" },
                    { l: "Tongkat Ali", v: "50mg Raw Root Powder" },
                    { l: "Saw Palmetto", v: "50mg Raw Berries" },
                    { l: "Extract Type", v: "Non-Standardized" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/10 pb-4">
                      <p className="text-[10px] text-[#c58158]/60 uppercase font-black tracking-widest italic">{row.l}</p>
                      <p className="text-sm text-[#f4e4bc]/40 font-bold uppercase">{row.v}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column: Mr. Plumber Man (The Upgrade) */}
              <div className="relative bg-[#1a0f0a] p-10 md:p-14 rounded-b-[20px] lg:rounded-bl-none lg:rounded-r-[20px] border-[3px] border-[#c58158] shadow-[0_0_100px_rgba(197,129,88,0.15)] z-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#c58158]/10 blur-[100px] pointer-events-none" />
                <h4 className="text-xl font-black text-white mb-12 flex items-center relative z-10 uppercase tracking-[0.2em] italic"><ShieldCheck className="w-6 h-6 mr-3 text-[#d4af37]" /> MR. PLUMBER MAN</h4>
                <div className="space-y-8 relative z-10">
                  {[
                    { l: "Price Comparison", v: "$59 (Direct Value)" },
                    { l: "Magnesium Form", v: "Glycinate (High Torque)" },
                    { l: "Zinc Form", v: "Picolinate (Bioavailable)" },
                    { l: "Tongkat Ali", v: "200mg Standardized" },
                    { l: "Saw Palmetto", v: "100mg Standardized" },
                    { l: "Extract Type", v: "Potency Guaranteed" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/20 pb-4">
                      <p className="text-[10px] text-[#d4af37] uppercase font-black tracking-widest italic">{row.l}</p>
                      <p className="text-sm text-white font-black uppercase">{row.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 mt-20">
               <div className="p-10 border-l-4 border-[#c58158] bg-[#2a1b15]/40 space-y-4 shadow-xl">
                  <FlaskConical className="text-[#c58158]" />
                  <h4 className="text-2xl font-black italic uppercase text-white tracking-tighter">Absorption Physics</h4>
                  <p className="text-sm text-[#f4e4bc]/50 leading-relaxed font-bold uppercase tracking-widest italic">Oxide minerals used by incumbents often absorb under 10%. Chelated forms like ours absorb 2-4x better. That’s not opinion—that’s gastrointestinal chemistry.</p>
               </div>
               <div className="p-10 border-l-4 border-[#d4af37] bg-[#2a1b15]/40 space-y-4 shadow-xl">
                  <Scale className="text-[#d4af37]" />
                  <h4 className="text-2xl font-black italic uppercase text-white tracking-tighter">Extraction Standards</h4>
                  <p className="text-sm text-[#f4e4bc]/50 leading-relaxed font-bold uppercase tracking-widest italic">Raw herbal powder is cheap and inconsistent. Mr. Plumber Man uses clinical-grade standardized extracts for guaranteed active compound levels in every dose.</p>
               </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Proof Strip */}
      <section className="bg-[#140b08] py-12 border-y border-[#c58158]/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center">
            <div className="flex flex-col items-center gap-3">
              <Star className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70 italic">Trusted by thousands</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#c58158]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70 italic">Bioavailable mineral forms</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FlaskConical className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70 italic">Standardized extracts</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Package className="w-5 h-5 text-[#c58158]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70 italic">Fast shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Bar */}
      <section className="bg-[#1a0f0a] py-24 px-6 border-b border-[#c58158]/10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter leading-none">
              STOP BUYING POWDERED FILLER. <br />
              <span className="text-[#c58158]">UPGRADE YOUR SYSTEM.</span>
            </h2>
            <button 
              onClick={() => scrollTo(depotRef)} 
              className="bg-[#c58158] text-[#1a0f0a] px-12 py-5 font-black uppercase tracking-[0.2em] shadow-[0_10px_0_#8c5a3d] hover:translate-y-[2px] hover:shadow-[0_8px_0_#8c5a3d] active:translate-y-[8px] active:shadow-none transition-all italic mx-auto"
            >
              Shop The Supply Depot
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* Supply Depot Section */}
      <section ref={depotRef} className="px-6 py-24 md:py-32 bg-[#140b08] border-b border-[#c58158]/10">
       <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20 space-y-4">
               <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-xs italic underline decoration-1">Supply Inventory</h2>
               <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white">THE <span className="text-[#d4af37]">SUPPLY</span> DEPOT</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
               {[
                 { id: 'p', name: "PRESSURE", sub: "Prostate Support", price: 39, img: "Vintage copper supplement bottle, prostate formula, high-end studio lighting", desc: "Clear the lines and restore factory-spec flow rate." },
                 { id: 't', name: "PRIME TIME", sub: "T-Formula", price: 59, img: "Industrial bronze supplement bottle, testosterone booster, premium label design", desc: "High-torque energy and maximum drive restoration." }
               ].map(p => (
                 <div key={p.id} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-10 hover:border-[#d4af37] transition duration-500 flex flex-col items-center text-center group rounded-sm shadow-2xl">
                    <div className="w-full aspect-square bg-[#1a0f0a] border border-[#c58158]/20 mb-10 overflow-hidden flex items-center justify-center relative shadow-inner">
                       <GenerateImage prompt={p.img} />
                    </div>
                    <h3 className="text-4xl font-black italic text-white uppercase mb-2 leading-none">{p.name}</h3>
                    <p className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-6 italic">{p.sub}</p>
                    <p className="text-[#f4e4bc]/50 font-bold uppercase tracking-widest text-sm mb-12 italic leading-relaxed">{p.desc}</p>
                    <div className="mt-auto w-full flex items-center justify-between pt-8 border-t border-[#c58158]/20">
                       <p className="text-4xl font-black italic text-white">${p.price}</p>
                       <button className="bg-[#c58158] text-[#1a0f0a] px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-[#d4af37] shadow-[0_6px_0_#8c5a3d] active:translate-y-[6px] active:shadow-none italic">Add To Kit</button>
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-20 p-12 bg-[#c58158]/10 border-2 border-dashed border-[#c58158]/40 text-center rounded-sm">
               <History className="mx-auto text-[#c58158] mb-6" size={40} />
               <h3 className="text-3xl font-black uppercase italic text-white mb-4">MONTHLY MAINTENANCE</h3>
               <p className="text-[#f4e4bc]/60 uppercase tracking-widest text-sm font-bold mb-10 italic">Refills delivered to your door every 30 days. Stay pressurized.</p>
               <div className="text-5xl font-black italic text-[#d4af37] mb-8">$49/mo</div>
               <button className="bg-[#d4af37] text-[#1a0f0a] px-12 py-5 font-black uppercase tracking-[0.2em] shadow-[0_10px_0_#8c5a3d] italic">Subscribe & Save</button>
            </div>
          </ScrollReveal>
       </div>
      </section>

      <footer className="bg-[#0f0a08] py-20 px-6">
         <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="flex flex-col items-center gap-4 opacity-40 grayscale hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-[#c58158] rounded-lg flex items-center justify-center font-black text-[#1a0f0a] shadow-md"><Wrench size={24} /></div>
              <span className="text-[14px] font-black uppercase tracking-[0.3em] text-[#d4af37] italic">MR. PLUMBER MAN</span>
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c58158]/30 leading-relaxed italic max-w-2xl mx-auto">
               * These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Comparison based on available label specifications. Nugenix Total-T is a registered trademark of its respective owner.
            </p>
         </div>
      </footer>

      <ChatBot messages={chatMessages} setMessages={setChatMessages} />
      <DiscountPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

const GenerateImage = ({ prompt, hero = false }) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ instances: { prompt }, parameters: { sampleCount: 1 } })
        });
        const data = await res.json();
        if (data.predictions?.[0]?.bytesBase64Encoded) setUrl(`data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchImg();
  }, [prompt]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full bg-[#1a0f0a] p-8">
      <Loader2 className="animate-spin text-[#c58158] mb-2" size={hero ? 40 : 24} />
      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#c58158]/40 italic">Assembling Schematic...</span>
    </div>
  );

  return url ? (
    <img 
      src={url} 
      alt="Brand Asset" 
      className={`w-full h-full ${hero ? 'object-cover' : 'object-contain mix-blend-screen'} group-hover:scale-105 transition duration-[2s] ease-out`} 
    />
  ) : (
    <div className="flex items-center justify-center h-full">
      <Package className="text-[#c58158]/20" size={hero ? 60 : 32} />
    </div>
  );
};

export default App;
